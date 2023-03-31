import Notiflix from 'notiflix';
import Notiflix from 'notiflix';
import { Axios } from 'axios';
import { refs } from './js/refs';
// const form = document.querySelector('.search-form');
// const loadMoreButton = document.querySelector('.load-more');
// const gallery = document.querySelector('.gallery');
console.log(refs.form);
const onSubmit = async e => {
  e.preventDefault();
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) {
    Notiflix.Notify.failure('Please enter your request');
    return;
  }
  console.log(query);
};
refs.form.addEventListener('submit', onSubmit);
