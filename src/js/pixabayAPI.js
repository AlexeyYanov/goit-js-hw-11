import axios from 'axios';
const API_KEY = '34920049-7ae8d333f47dc8d2d994cdaae';
const fetchUrl = 'https://pixabay.com/api/';
export class PixabayApi {
  perpage = 40;
  page = 1;
  totalPages = 0;
  query = '';
  options = {
    params: {
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };
  async getphotos() {
    const url = `${fetchUrl}?key=${API_KEY}&q=${this.query}&per_page=${this.perpage}&page=${this.page}`;
    const { data } = await axios.get(url, this.options);
    return data;
  }
  set query(newQ) {
    this.query = newQ;
  }
  get query() {
    return this.query;
  }
  incPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  calcTotalPages(total) {
    this.totalPages = Math.ceil(total / this.perpage);
  }
  get showMore() {
    return this.page < this.totalPages;
  }
  get totalPages() {
    return this.totalPages;
  }
  get page() {
    return this.page;
  }
}
