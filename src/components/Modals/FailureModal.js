import { Modal, Button } from 'react-bootstrap';

const FailureModal = ({ showModal, closeModal, errorMessage }) => {
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Operation Failed</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{errorMessage || "An error occurred during the operation."}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FailureModal;
