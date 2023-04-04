import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
export function simplLightBox() {
  const lightBox = new SimpleLightbox('.gallery .link', {
    captionsData: 'alt',
    captionDelay: 500,
  });
  lightBox.refresh();
}
