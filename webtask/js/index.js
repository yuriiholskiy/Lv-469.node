let state = {
	title: '',
	content: '',
	imageSrc: '',
	news: getFromStorage('news') || [
		{
			id: uuid(),
			title: 'Tennis',
			content: 'Lorem ipsum dollum dolorem eim sunt, iste. Quideipisci ipsam laudantium necessitatibus eveniet.',
			imageSrc: './images/news-image.png',
		},
		{
			id: uuid(),
			title: 'Tennis 2 ',
			content: 'Lorem ipsum dolor sit amet, consecteesci ipsam laudantium necessitatibus eveniet.',
			imageSrc: './images/news-image.png',
		},
		{
			id: uuid(),
			title: 'Tennis 3',
			content: 'Lorem ipsum dolor sit amet, consectetur menda quia dolor, aliquam voluptatem numquam adipisci ipsam laudantium necessitatibus eveniet.',
			imageSrc: './images/news-image.png',
		},
	]
};

const chooseImage = document.querySelector('.image-file');
const imagePreview = document.querySelector('.image-preview');
const form = document.querySelector('.form');
const title = form['news-title'];
const content = form['news-content'];

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

if(form) {
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		if(!title.checkValidity() || !content.checkValidity()) return;
		setState({
			title: title.value,
			content: content.value
		});
		const newNews = {
			id: uuid(),
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
			setToStorage('news', state.news);
		} else {
			window.setTimeout(() => {
				setToStorage('news', state.news);
			}, 500);
		}
		snackbar.setText('Article added. 🧨🧨✨✨');
		snackbar.show();
		snackbar.hide(2500);
		form.reset();
		// window.setTimeout(() => {
		// 	window.location.assign('news.html');
		// }, 500);
	});
}
