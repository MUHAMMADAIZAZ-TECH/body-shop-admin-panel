import { useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import PropTypes from 'prop-types';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const ImagePreviewModal = ({ open, title, images, onCancel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };
  return (
    <Modal visible={open} title={title} footer={null} onCancel={onCancel}>
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
      <div>
        <LeftOutlined onClick={handlePrevImage} style={{ cursor: 'pointer' }} />
      </div>
      <div style={{ width: '415px', margin: '10px' }}>
        <img
          alt="example"
          style={{
            width: '100%',
            height: '350px',
            objectFit: 'cover',
          }}
          src={images[currentIndex]}
        />
      </div>
      <div>
        <RightOutlined onClick={handleNextImage} style={{ cursor: 'pointer' }} />
      </div>
    </div>
  </Modal>
  );
};

ImagePreviewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default ImagePreviewModal;
