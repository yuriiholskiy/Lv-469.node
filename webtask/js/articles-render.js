const newsCardRow = document.querySelector('.news-cards');
const newsFromStorage = getFromStorage('news') || [];
function renderArticle(data) {
  newsCardRow.innerHTML = '';
  data.forEach(({title, content, imageSrc}) => {
    newsCardRow.innerHTML += getArticleHtml(title, content, imageSrc);
  });
}
function getArticleHtml(title, content, imageSrc) {
  return `<article class="col col-3 col-md-6 col-sm-11 mt-1">
    <figure class="card anim-trY-slow">
      <img src=${imageSrc} alt="Table tennis last news">
      <figcaption class="card-caption text-center mt-1">
        <h3 class="card-title mt-1">${title}</h3>
        <p class="card-content">
          ${content}
        </p>
      </figcaption>
    </figure>
  </article>`;
}

window.addEventListener('online', () => {
  console.log('online');
  const newsDB = new IndexedDB({
    DBName: 'news',
    DBVersion: 1,
    store: 'news',
    onSuccess: (event) => {
      const db = event.target.result;
      newsDB.getAndDisplayData((data) => {
        renderArticle(data);
      });
    },
  });
  if(useLocalStorage) {
    removeFromStorage('news');
  } else {
    newsDB.clearDB();
  }
});