import { useEffect, useState } from "react";
import { getArticleComments } from "../../api.js";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import SubmitComment from "./SubmitComment";
import DeleteComment from "./DeleteComment";
import Alert from "react-bootstrap/Alert";

function Comments({ article_id }) {
  const [articleComments, setArticleComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletedComment, setDeletedComment] = useState();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getArticleComments(article_id).then((comments) => {
      setArticleComments(comments);
      setLoading(false);
    });
  }, [article_id]);

  useEffect(() => {
    setArticleComments((currentComments) => {
      return currentComments.filter(
        (comment) => comment.comment_id !== deletedComment
      );
    });
  }, [deletedComment]);
  return loading ? (
    <Spinner animation='border' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  ) : (
    <section className='comments-card'>
      <Alert variant='danger' show={showAlert}>
        Server error,please try again
      </Alert>
      <SubmitComment
        article_id={article_id}
        setArticleComments={setArticleComments}
      />
      <h3 className='m-3 text-start'>Comments</h3>
      {articleComments.map((eachComment) => {
        return (
          <Card key={eachComment.comment_id} className='m-3 text-start p-3'>
            <Card.Title>{eachComment.author}</Card.Title>

            <Card.Text className='d-flex justify-content-between'>
              {eachComment.created_at}{" "}
              <DeleteComment
                setShowAlert={setShowAlert}
                comment_id={eachComment.comment_id}
                author={eachComment.author}
                setDeletedComment={setDeletedComment}
              />
            </Card.Text>
            <Card.Body className=' p-0'>{eachComment.body}</Card.Body>
          </Card>
        );
      })}
    </section>
  );
}

export default Comments;
