import Notiflix from 'notiflix';
import { refs } from './js/refs';
import { PixabayApi } from './js/pixabayAPI';
import { creatMarkUp } from './js/createMarkup';
import { scrollWindow } from './js/scroll';
// / Описан в документации
import { simplLightBox } from './js/modal';
refs.loadMoreButton.classList.add('is-hidden');
// Дополнительный импорт стилей

// const form = document.querySelector('.search-form');
// const loadMoreButton = document.querySelector('.load-more');
// const gallery = document.querySelector('.gallery');

const exempEl = new PixabayApi();
const onSubmit = async e => {
  e.preventDefault();
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  const userQuery = searchQuery.value.trim().toLowerCase();
  if (!userQuery) {
    Notiflix.Notify.failure('Please enter your request');
    return;
  }
  console.log(userQuery);
  exempEl.query = userQuery;
  cleanMarkUp();
  try {
    const getRes = await exempEl.getphotos();
    const { total, totalHits, hits } = getRes;
    console.log(hits);
    if (hits.length === 0) {
      Notiflix.Notify.warning(`Sorry, no image matched your request`);
      return;
    }
    console.log(getRes);
    const imagesMarkUp = creatMarkUp(hits);
    console.log(imagesMarkUp);
    refs.gallery.insertAdjacentHTML('beforeend', imagesMarkUp);
    simplLightBox();
    exempEl.calcTotalPages(totalHits);
    Notiflix.Notify.success(
      `We found ${totalHits} images by your request ${userQuery} on ${exempEl.totalPages} pages`
    );
    if (exempEl.showMore) {
      refs.loadMoreButton.classList.remove('is-hidden');
    }
  } catch (error) {
    console.log(error.message);
    Notiflix.Notify.failure('Something wrong with your request');
  }
};
function cleanMarkUp() {
  refs.gallery.innerHTML = '';
  exempEl.resetPage();
  refs.loadMoreButton.classList.add('is-hidden');
}

function handlerLoadMore() {
  exempEl.incPage();
  if (!exempEl.showMore) {
    refs.loadMoreButton.classList.add('is-hidden');
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results"
    );
  }
  exempEl
    .getphotos()
    .then(({ hits }) => {
      const markUp = creatMarkUp(hits);
      refs.gallery.insertAdjacentHTML('beforeend', markUp);
      console.log(exempEl.page);
      console.log(hits.length);
      scrollWindow();
    })
    .catch(error => {
      console.log(error.message);

      Notiflix.Notify.failure('Oops, something is wrong');
      cleanMarkUp();
    });
}
refs.form.addEventListener('submit', onSubmit);
refs.loadMoreButton.addEventListener('click', handlerLoadMore);
