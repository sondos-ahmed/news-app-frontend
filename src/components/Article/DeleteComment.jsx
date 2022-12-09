import { UserContext } from "../../contexts/User";
import { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { deleteComment } from "../../api.js";

function DeleteComment({
  comment_id,
  author,
  setDeletedComment,
  setShowAlert,
}) {
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  function handelDeleteComment() {
    setShow(false);
    setDeletedComment(comment_id);
    deleteComment(comment_id).catch(() => {
      setShowAlert(true);
    });
  }
  return user.username === author ? (
    <div>
      <button onClick={handleShow}>Remove</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are sure you want to delete your comment?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handelDeleteComment}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  ) : (
    <span></span>
  );
}
export default DeleteComment;
