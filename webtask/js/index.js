const uuid = () => '_' + Math.random().toString(16).slice(2);
const setToStorage = (key, val) => window.localStorage.setItem(key, JSON.stringify(val));
const getFromStorage = (key) => JSON.parse(window.localStorage.getItem(key));

let state = {
	title: '',
	content: '',
	news: getFromStorage('news') || [
		{
			id: uuid(),
			title: 'Tennis',
			content: 'Lorem ipsum dollum dolorem eim sunt, iste. Quideipisci ipsam laudantium necessitatibus eveniet.'
		},
		{
			id: uuid(),
			title: 'Tennis 2 ',
			content: 'Lorem ipsum dolor sit amet, consecteesci ipsam laudantium necessitatibus eveniet.'
		},
		{
			id: uuid(),
			title: 'Tennis 3',
			content: 'Lorem ipsum dolor sit amet, consectetur menda quia dolor, aliquam voluptatem numquam adipisci ipsam laudantium necessitatibus eveniet.'
		},
	]
};
function setState(newState) {
	state = {...state, ...newState};
	return state;
};

const form = document.querySelector('.form');
function inputsUpdate() {
	form['news-title'].value = state.title;
	form['news-content'].value = state.content;
}
if(form) {
	form.addEventListener('submit', (event) => {
		event.preventDefault();

		setState({
			title: form['news-title'].value,
			content: form['news-content'].value
		});
		inputsUpdate();
		const newNews = {
			id: uuid(),
			title: state.title,
			content: state.content
		};
		const newState = {
			title: '',
			content: '',
			news: [...state.news, newNews]
		};
		setState(newState);
		setToStorage('news', state.news);
		inputsUpdate();
		window.setTimeout(() => {
			window.location.assign('news.html');
		}, 500);
	});
}
