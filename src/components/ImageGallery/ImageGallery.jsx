import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';


const ImageGallery = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);



  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };
      const { images } = props;

return (
      <>
        <Gallery>
          {images.map((image) => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onClick={handleImageClick}
            />
          ))}
        </Gallery>
        {isModalOpen && (
          <Modal image={selectedImage} onClose={handleCloseModal} />
        )}
      </>
    );
}
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
export default ImageGallery;

