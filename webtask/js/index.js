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

const chooseImage = document.querySelector('.image-file');
const imagePreview = document.querySelector('.image-preview');
const form = document.querySelector('.form');
let title;
let content;
if(form) {
	title = form['news-title'];
	content = form['news-content'];
	chooseImage.addEventListener('change', (event) => {
		const file = event.target.files[0];
		if(!file) {
			imagePreview.setAttribute('src', '');
		}
		const fileReader = new FileReader();
		fileReader.onload = (event) => {
			if(!event.target.result) return;
			setState({
				imageSrc: event.target.result
			});
			imagePreview.setAttribute('src', state.imageSrc);
		}
		fileReader.readAsDataURL(file);
	});
}

if(form) {
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		if(!title.checkValidity() || !content.checkValidity()) return;
		setState({
			title: title.value,
			content: content.value
		});
		const newNews = {
			_id: uuid(),
			title: state.title,
			content: state.content,
			imageSrc: state.imageSrc
		};
		const newState = {
			title: '',
			content: '',
			news: [...state.news, newNews]
		};
		setState(newState);
		if(isOnline()) {
			console.log('[Data go to the server]');
		} else {
			if(useLocalStorage) {
				setToStorage('news', state.news);
			} else {
				newsDB = new IndexedDB({
					DBName: 'news',
					DBVersion: 1,
					store: newsStore,
					onUpgrageNeeded: (event) => {
						const db = event.target.result;
						let data = db.createObjectStore(newsStore, {autoIncrement: true});
					},
					onSuccess: (event) => {
						const db = event.target.result;
						newsDB.addOneDocument(newNews);
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
	});
}

window.addEventListener('online', () => {
	if(!localStorage) {
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
			},
		});
	}
	render(newsCardRow, state.news, getArticleHtml);
	
	useLocalStorage ? removeFromStorage('news') : newsDB.clearDB();
});