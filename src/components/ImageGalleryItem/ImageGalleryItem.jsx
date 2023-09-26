import React, { useState } from 'react';
import { GalleryItem, Img } from './ImageGalleryItem.styled';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

const ImageGalleryItem = (props) => {
  const [showModal, setShowModal] = useState();

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
      setShowModal(false);
  };
  const { image } = props;

    return (
      <>
        <GalleryItem onClick={handleImageClick}>
          <Img src={image.webformatURL} alt={image.tags} />
        </GalleryItem>
        {showModal && (
          <Modal image={image} onClose={handleCloseModal} />
        )}
      </>
    );

};


ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;

