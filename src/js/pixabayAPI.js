import axios from 'axios';
const API_KEY = '34920049-7ae8d333f47dc8d2d994cdaae';
const fetchUrl = 'https://pixabay.com/api/';
export class PixabayApi {
  perpage = 40;
  page = 1;
  totalPages = 0;
  query = '';
}
