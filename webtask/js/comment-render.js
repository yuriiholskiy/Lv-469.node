const commentStore = 'comments';
let commentsDB = null;
let state = {
  nickname: '',
  content: '',
  comments: getFromStorage('comments') || []
};
const form = document.querySelector('.form');
const content = form['comment-content'];
const nickname = form['nickname'];
const commentsCardRow = document.querySelector('.comment-wrap');

window.addEventListener('load', renderAsyncComments);

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!content.checkValidity()) return;
  setState({
    nickname: nickname.value,
    content: content.value
  });
  const newComment = {
    content: state.content,
    author: state.nickname,
    date: new Date().toLocaleString()
  };

  const newState = {
    nickname: '',
    content: '',
    comments: [...state.comments, newComment]
  };

  setState(newState);

  if (isOnline()) {
    await api.addComment(newComment);
    render(commentsCardRow, state.comments, getCommentHtml);
  } else {
    if (useLocalStorage) {
      setToStorage('comments', state.comments);
    } else {
      commentsDB = new IndexedDB({
        DBName: 'comments',
        DBVersion: 1,
        store: commentStore,
        onUpgrageNeeded: (event) => {
          const db = event.target.result;
          let data = db.createObjectStore(commentStore, {
            autoIncrement: true
          });
        },
        onSuccess: (event) => {
          const db = event.target.result;
          commentsDB.addOneDocument(newComment);
          commentsDB.getAndDisplayData((data) => {
            setState({
              comments: data
            });
          });
        },
        onError: (event) => {
          console.log('error opening database ' + event.target.errorCode);
        }
      });
    }
  }
  showSnackbar('Comment added. 🧨🧨✨✨');
  form.reset();
});

window.addEventListener('online', async () => {
  showSnackbar('You online now. 🟢🟢🟢', 3000);

  const lastAddedComment = state.comments[state.comments.length - 1];
  await api.addComment(lastAddedComment);
  renderAsyncComments();

  useLocalStorage ? removeFromStorage('comments') : commentsDB.clearDB();
});
