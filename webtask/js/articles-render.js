const newsCardRow = document.querySelector('.news-cards');
const newsFromStorage = getFromStorage('news') || [];
renderArticle();
function renderArticle() {
  newsCardRow.innerHTML = '';
  newsFromStorage.forEach(({title, content, imageSrc}) => {
    newsCardRow.innerHTML += getArticleHtml(title, content, imageSrc);
  });
}
function getArticleHtml(title, content, imageSrc) {
  return `<article class="col col-3 col-md-6 col-sm-11 mt-1">
    <figure class="card anim-trY-slow">
      <img src=${imageSrc} alt="Table tennis last news">
      <figcaption class="card-caption text-center mt-1">
        <h3 class="card-title mt-1">${title}</h3>
        <p class="card-content">
          ${content}
        </p>
      </figcaption>
    </figure>
  </article>`;
}
