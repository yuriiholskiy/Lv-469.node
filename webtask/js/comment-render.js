const commentStore = 'comments';
let commentsDB = null; 
let state = {
  content: '',
  comments: getFromStorage('comments') || []
};
const form = document.querySelector('.form');
const content = form['comment-content'];
const commentsCardRow = document.querySelector('.comment-wrap');

window.addEventListener('load', async () => {
  const { data } = await http.get('comments');
  const { error, comments } = data;
  if(!error && isOnline()) {
    render(commentsCardRow, comments, getCommentHtml);
  } else {
    commentsCardRow.innerHTML = 'Some server error happens';
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if(!content.checkValidity()) return;
  setState({
    content: content.value
  });
  const newComment = {
    content: state.content,
    author: 'Who?',
    date: new Date().toLocaleString()
  };

  const newState = {
    content: '',
    comments: [...state.comments, newComment]
  };

  setState(newState);

  if(isOnline()) {
		await http.post('comments', newComment);
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
