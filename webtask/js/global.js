// f to get unique id;
const uuid = () => '_' + Math.random().toString(16).slice(2);

// fs to work with ls;
const setToStorage = (key, val) => window.localStorage.setItem(key, JSON.stringify(val));
const getFromStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const removeFromStorage = (key) => window.localStorage.removeItem(key);

// f to set global state;
const setState = (newState) => {
	state = {...state, ...newState};
	return state;
}

// f to render data;
const render = (element = document.body, data = [], getHtml = () => {}) => {
	if(!data.length) return;
	element.innerHTML = '';
	data.forEach(item => element.innerHTML += getHtml(item));
};

// snackbar implementation;
let snackbar = null;
const snackbarElement = document.querySelector('.snackbar');
if(snackbarElement) {
	snackbar = {
		snackbar: snackbarElement,
		setText(content) {
			this.snackbar.innerHTML = content;
		},
		show() {
			this.snackbar.classList.add('active');
		},
		hide(time = 1000) {
			window.setTimeout(() => {
				this.snackbar.classList.remove('active');
			}, time);
		},
	};
};

// f to check if online;
function isOnline() {
	return window.navigator.onLine;
}

// global variable to work with dbs;
let useLocalStorage = true;

// f to get comment html;
const getCommentHtml = ({id, content, date, author}) => (`
	<div class="comment mt-2 pb-1 anim-trX-middle">
		<p class="comment-content">
			${content}
		</p>
		<div class="comment-footer flex-between mt-1">
			<time class="d-block comment-data">${date}</time>
			<span class="comment-author">${author}</span>
		</div>
	</div>`
);

// f to get article html;
const getArticleHtml = ({title, content, imageSrc}) => (
	`<article class="col col-3 col-md-6 col-sm-11 mt-1">
    <figure class="card anim-trY-slow">
      <img src=${imageSrc} alt="Table tennis last news">
      <figcaption class="card-caption text-center mt-1">
        <h3 class="card-title mt-1">${title}</h3>
        <p class="card-content">
          ${content}
        </p>
      </figcaption>
    </figure>
	</article>`
);