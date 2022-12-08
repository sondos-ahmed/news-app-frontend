import { postComment } from "../../api.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/User";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

function SubmitComment({ article_id, setArticleComments }) {
  const [newComment, setNewComment] = useState();
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);

  function handelCommentSubmit(event) {
    event.preventDefault();
    if (user) {
      postComment(article_id, user.username, newComment).then(
        (commentFromApi) => {
          setNewComment("");
          setArticleComments((current) => {
            const newComments = [...current];
            newComments.push(commentFromApi);
            return newComments;
          });
        }
      );
    } else {
      setShow(true);
    }
  }

  return (
    <Form onSubmit={handelCommentSubmit}>
      <h3 className='m-3 text-start'>Share your thoughts</h3>
      <Alert variant='danger' show={show}>
        Request failed, please <Link to='/login'>login</Link>first!
      </Alert>
      <Form.Group className='m-3' controlId='usercomment'>
        <Form.Control
          as='textarea'
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          rows={3}
          required
        />
      </Form.Group>
      <Form.Group className='m-3 text-end' controlId='usercomment'>
        <Button type='submit'>Submit Comment</Button>
      </Form.Group>
    </Form>
  );
}

export default SubmitComment;
