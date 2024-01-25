import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const LoginRequiredModal = ({ showModal }) => {
  const navigate = useNavigate();
  
  const closeModal = () => {
    navigate("/login");
    // setShowLoginModal(false);
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Authentication Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please login to perform this action.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginRequiredModal;
