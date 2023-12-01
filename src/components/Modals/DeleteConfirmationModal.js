import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmationModal = ({ showModal, closeModal, handleDelete }) => {
  const handleConfirmDelete = () => {
    handleDelete();
    closeModal();
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this blog?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          No
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
