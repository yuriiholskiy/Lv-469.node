mobileMenu();
function mobileMenu() {
  const menu = document.querySelector('.nav-list');
  const mobileMenuToggleButton = document.querySelector('.nav-mobile-button');
  const styles = window.getComputedStyle(mobileMenuToggleButton);

  if(styles.display !== 'none') {
    menu.classList.remove('anim-trX-middle');
  }

  function toggleMobileMenu() {
    menu.classList.toggle('active');
  }

  mobileMenuToggleButton.addEventListener('click', toggleMobileMenu);
  document.addEventListener('click', (event) => {
    if(event.target.classList.contains('nav-list')) {
      toggleMobileMenu();
    }
  });
}
