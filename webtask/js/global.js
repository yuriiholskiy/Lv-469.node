const uuid = () => '_' + Math.random().toString(16).slice(2);
const setToStorage = (key, val) => window.localStorage.setItem(key, JSON.stringify(val));
const getFromStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const removeFromStorage = (key) => window.localStorage.removeItem(key);
function setState(newState) {
	state = {...state, ...newState};
	return state;
}
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

function isOnline() {
	return window.navigator.onLine;
}

let useLocalStorage = false;
