import PropTypes from 'prop-types';
import s from '../ImageGallery/ImageGalleryItem.module.css';

function ImageGalleryItem({ images, onClick }) {
  return (
    <>
      {images.map(image => (
        <li
          className={s.ImageGalleryItem}
          key={image.id}
          onClick={() => onClick(image.largeImageURL)}
        >
          <img
            className={s.ImageGalleryItem_image}
            src={image.webformatURL}
            alt=""
          />
        </li>
      ))}
    </>
  );
}

ImageGalleryItem.propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        })
    ),
    onClick: PropTypes.func.isRequired,
  };

export default ImageGalleryItem;
