const initialComments = [];
const commentStore = 'comments';
let commentsDB = null; 
let state = {
  content: '',
  comments: getFromStorage('comments') || initialComments
};
const form = document.querySelector('.form');
const content = form['comment-content'];
const commentsCardRow = document.querySelector('.comment-wrap');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if(!content.checkValidity()) return;
  setState({
    content: content.value
  });
  const newComment = {
    id: uuid(),
    content: state.content,
    author: 'Who?',
    date: new Date().toLocaleString(),
  };

  const newState = {
    content: '',
    comments: [...state.comments, newComment]
  };

  setState(newState);
  if(isOnline()) {
    if(useLocalStorage) {
      // setToStorage('comments', state.comments);
    } else {
      console.log('[Data go to indexedDB]');
    }
    renderComments(state.comments);
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

// renderComments();
function renderComments(data) {
  commentsCardRow.innerHTML = '';
  data.forEach(({id, content, author, date}) => {
    commentsCardRow.innerHTML += getCommentHtml(id, content, author, date);
  });

  const delButton = document.querySelectorAll('.comment-del-button');
  delButton.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      deleteComment(id);
    });
  });
}
function getCommentHtml(id, content, author, date) {
  return `
    <div class="comment mt-2 pb-1 anim-trX-middle">
      <p class="comment-content">
        ${content}
      </p>
      <button type="button"
              class="comment-del-button button-danger"
              data-id='${id}'>
              ⨉
      </button>
      <div class="comment-footer flex-between mt-1">
        <time class="d-block comment-data">${date}</time>
        <span class="comment-author">${author}</span>
      </div>
    </div>`;
}


function deleteComment(id) {
  const newComments = state.comments.filter(comment => comment.id !== id);
  setState({
    comments: newComments
  });
  setToStorage('comments', state.comments);
  renderComments(state.comments);
}

window.addEventListener('online', () => {
  console.log('online');
  renderComments(state.comments);
  if(useLocalStorage) {
    removeFromStorage('comments');
  } else {
    commentsDB.clearDB();
  }
});

window.addEventListener('offline', () => {
  console.log('offline');
});
