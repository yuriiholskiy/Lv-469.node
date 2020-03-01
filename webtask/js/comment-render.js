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

window.addEventListener('load', async () => {
  if(!state.comments.length) {
    render(commentsCardRow, [], getLoaderHtml);
  }
  window.setTimeout(async () => {
    const { data } = await api.getComments();
    const { error, comments } = data;
    if(!error && isOnline()) {
      setState({
        comments
      });
      render(commentsCardRow, comments, getCommentHtml);
    } else {
      render(commentsCardRow, [], 'Some server error happens');
    }
  }, 500);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if(!content.checkValidity()) return;
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

  if(isOnline()) {
    await api.addComment(newComment);
    render(commentsCardRow, state.comments, getCommentHtml);
  } else {
    if(useLocalStorage) {
      setToStorage('comments', state.comments);
    } else {
      commentsDB = new IndexedDB({
        DBName: 'comments',
        DBVersion: 1,
        store: commentStore,
        onUpgrageNeeded: (event) => {
          const db = event.target.result;
          let data = db.createObjectStore(commentStore, {autoIncrement: true});
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
  snackbar.setText('Comment added. 🧨🧨✨✨');
  snackbar.show();
  snackbar.hide(2500);
  form.reset();
});


window.addEventListener('online', () => {
  render(commentsCardRow, state.comments, getCommentHtml);
  
  useLocalStorage ? removeFromStorage('comments') : commentsDB.clearDB();
});

// window.addEventListener('offline', () => {
//   console.log('offline');
// });
