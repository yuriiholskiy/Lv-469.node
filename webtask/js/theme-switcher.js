const body = document.body;
const logo = document.querySelector('.logo');

if(getFromStorage('theme-dark')) {
  body.classList.add('theme-dark');
}
logo.addEventListener('click', () => {
  body.classList.toggle('theme-dark');
  const isTheme = body.classList.contains('theme-dark');
  setToStorage('theme-dark', isTheme);
});
