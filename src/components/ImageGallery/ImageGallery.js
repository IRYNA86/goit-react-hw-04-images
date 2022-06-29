import ImageGalleryItem from '../ImageGallery/ImageGalleryItem';
import PropTypes from 'prop-types';
import s from '../ImageGallery/ImageGallery.module.css';

function ImageGallery({ images, nameImages, onClick }) {
  return (
    <ul className={s.ImageGallery}>
      <ImageGalleryItem
        images={images}
        nameImages={nameImages}
        onClick={onClick}
      />
    </ul>
  );
}

ImageGallery.propTypes = {
    images: PropTypes.array,
    nameImages: PropTypes.string,
    onClick: PropTypes.func,
  };

export default ImageGallery;
