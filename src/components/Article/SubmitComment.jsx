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
  const [disableSubmit, setdisableSubmit] = useState(false);
  let showAlertTextForlogin = false;

  function handelCommentSubmit(event) {
    const localCreatedDate = new Date();
    event.preventDefault();

    setdisableSubmit(true);

    if (user && user !== {}) {
      setArticleComments((current) => {
        const newComments = [...current];
        newComments.push({
          comment_id: localCreatedDate.toDateString(),
          author: user.username,
          body: newComment,
          created_at: localCreatedDate.toDateString(),
        });
        return newComments;
      });
      setNewComment("");
      postComment(article_id, user.username, newComment)
        .then((commentFromApi) => {
          setdisableSubmit(false);
        })
        .catch(() => {
          showAlertTextForlogin = false;
          setShow(true);
          setArticleComments((current) => {
            const newComments = [...current];
            newComments.pop();
            return newComments;
          });
          setdisableSubmit(false);
        });
    } else {
      showAlertTextForlogin = true;
      setShow(true);
    }
  }

  return (
    <Form onSubmit={handelCommentSubmit}>
      <h3 className='m-3 text-start'>Share your thoughts</h3>
      {showAlertTextForlogin ? (
        <Alert variant='danger' show={show}>
          Request failed, please <Link to='/login'>login</Link> first!
        </Alert>
      ) : (
        <Alert variant='danger' show={show}>
          Server error,please try again
        </Alert>
      )}

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
        <Button type='submit' disabled={disableSubmit}>
          Submit Comment
        </Button>
      </Form.Group>
    </Form>
  );
}

export default SubmitComment;
