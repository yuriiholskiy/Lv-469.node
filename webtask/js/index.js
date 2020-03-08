const newsStore = 'news';
let newsDB = null;
let state = {
  title: '',
  content: '',
  imageSrc: '',
  news: getFromStorage('news') || []
};
const newsCardRow = document.querySelector('.news-cards');
const newsFromStorage = getFromStorage('news') || [];
function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}
if (window.location.pathname === '/news.html') {
  window.addEventListener('load', async () => {
    if (!state.news.length) {
      render(newsCardRow, [], getLoaderHtml);
    }
    window.setTimeout(async () => {
      const { data } = await api.getNews();
      const { error, articles: news } = data;
      if (!error && isOnline()) {
        render(newsCardRow, news, getArticleHtml);
      } else {
        render(newsCardRow, [], 'Some server error happens');
      }
    }, 500);
  });
}

const chooseImage = document.querySelector('.image-file');
const imagePreview = document.querySelector('.image-preview');
const form = document.querySelector('.form');
let title;
let content;
if (form) {
  title = form['news-title'];
  content = form['news-content'];
  chooseImage.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) {
      imagePreview.setAttribute('src', '');
    }
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      if (!event.target.result) return;
      setState({
        imageSrc: event.target.result
      });
      imagePreview.setAttribute('src', state.imageSrc);
    };
    fileReader.readAsDataURL(file);
  });
}

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!title.checkValidity() || !content.checkValidity()) return;
    setState({
      title: title.value,
      content: content.value
    });
    const newArticle = {
      title: state.title,
      content: state.content,
      imageSrc: state.imageSrc
    };
    const newState = {
      title: '',
      content: '',
      news: [...state.news, newArticle]
    };
    setState(newState);
    if (isOnline()) {
      await api.addNew(newArticle);
      window.setTimeout(() => {
        window.location.assign('news.html');
      }, 500);
    } else {
      if (useLocalStorage) {
        setToStorage('news', state.news);
      } else {
        newsDB = new IndexedDB({
          DBName: 'news',
          DBVersion: 1,
          store: newsStore,
          onUpgrageNeeded: (event) => {
            const db = event.target.result;
            let data = db.createObjectStore(newsStore, { autoIncrement: true });
          },
          onSuccess: (event) => {
            const db = event.target.result;
            newsDB.addOneDocument(newNew);
          },
          onError: (event) => {
            console.log('error opening database ' + event.target.errorCode);
          }
        });
      }
    }
    snackbar.setText('Article added. 🧨🧨✨✨');
    snackbar.show();
    snackbar.hide(2500);
    form.reset();
    imagePreview.setAttribute('src', 'https://dummyimage.com/640x360/fff/aaa');
  });
}

window.addEventListener('online', () => {
  if (!localStorage) {
    newsDB = new IndexedDB({
      DBName: 'news',
      DBVersion: 1,
      store: 'news',
      onSuccess: () => {
        newsDB.getAndDisplayData((data) => {
          setState({
            news: data
          });
        });
      }
    });
  }
  render(newsCardRow, state.news, getArticleHtml);

  useLocalStorage ? removeFromStorage('news') : newsDB.clearDB();
});
