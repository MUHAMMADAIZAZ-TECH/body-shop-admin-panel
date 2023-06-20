import Modal from "antd/lib/modal/Modal";
import PropTypes from 'prop-types';

const ImagePreviewModal = ({ open, title, images, onCancel }) => {
    return (
      <Modal open={open} title={title} footer={null} onCancel={onCancel}>
        {images?.map((image, index) => (
          <div key={index}>
            <img
              alt="example"
              style={{
                width: '100%',
              }}
              src={image}
            />
          </div>
        ))}
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