import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const AddCommentModal = ({ showModal, closeModal, handleAddComment }) => {
  const [comment, setComment] = useState('')
  const [errorMessage, setErrorMessage] = useState(null);
  const maxCommentLength = 200;

  const handleSubmit = () => {
    if (comment.trim() === '') {
      setErrorMessage('Cannot submit empty comment.');
    } else {
      setErrorMessage('');
      handleAddComment(comment);
      closeModal();
    }
  };

  const handleInputChange = (e) => {
    const inputComment = e.target.value;
    if (inputComment.length <= maxCommentLength) {
      setComment(inputComment);
    }
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="commentTextarea">
            <Form.Label>Comment:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={handleInputChange}
            />
            {errorMessage && <Alert className='mt-3' variant="danger" dismissible>{errorMessage}</Alert>}
            <small>{comment.length}/{maxCommentLength} characters</small>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCommentModal;
