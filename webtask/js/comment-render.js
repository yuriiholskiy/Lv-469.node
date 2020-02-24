const initialComments = [
  {
    id: uuid(),
    content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Nam tempora atque ut placeat quia neque harum, consectetur cupiditate dolor repellendus
              non reiciendis aut nihil dicta animi ab aspernatur nemo iste.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Nam tempora atque ut placeat quia neque harum, consectetur cupiditate dolor repellendus
              non reiciendis aut nihil dicta animi ab aspernatur nemo iste.`,
    author: 'Who?',
    date: '2/4/2020, 10:22:45 AM',
  },
  {
    id: uuid(),
    content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Nam tempora atque ut placeat quia neque harum, consectetur cupiditate dolor repellendus
              non reiciendis aut nihil dicta animi ab aspernatur nemo iste.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              `,
    author: 'Who?',
    date: '2/5/2020, 10:40:45 AM',
  },
  {
    id: uuid(),
    content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Nam tempora atque ut placeat quia neque harum, consectetur cupiditate dolor repellendus
              non reiciendis aut nihil dicta animi ab aspernatur nemo iste.`,
    author: 'Who?',
    date: '2/6/2020, 10:30:45 AM',
  }
];

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
    setToStorage('comments', state.comments);
    renderComments();
  } else {
    window.setTimeout(() => {
      setToStorage('comments', state.comments);
      renderComments();
    }, 500);
  }
  snackbar.setText('Comment added. 🧨🧨✨✨');
  snackbar.show();
  snackbar.hide(2500);
  form.reset();
});

renderComments();
function renderComments() {
  commentsCardRow.innerHTML = '';
  state.comments.forEach(({id, content, author, date}) => {
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
  renderComments();
}
