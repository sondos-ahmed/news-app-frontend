import { useEffect, useState } from "react";
import {
  getArticleById,
  getArticleComments,
  patchArticleVotes,
} from "../api.js";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import Spinner from "react-bootstrap/Spinner";
import "../css/article.css";
import Alert from "react-bootstrap/Alert";

export function Article() {
  const [article, setArticle] = useState();
  const [rating, setRating] = useState(0);
  const [incrementBy, setincrementBy] = useState(0);
  const { article_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [visibility, setvisibility] = useState("invisible");

  console.log(incrementBy);
  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setArticle(article);
      setRating(article.votes);
      setLoading(false);
    });
  }, [article_id]);

  function handelRating() {
    setRating((currentRating) => {
      const newRating = currentRating + 1;
      return newRating;
    });
    patchArticleVotes(article_id)
      .then(() => {
        setvisibility("invisible");
      })
      .catch(() => {
        setvisibility("visible");
      });
  }
  return loading ? (
    <Spinner animation='border' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  ) : (
    <section className=' m-3'>
      {" "}
      <Alert variant='danger' className={visibility}>
        Request failed, please try again!
      </Alert>
      <section className='article-card'>
        <p className='d-inline'> Article |</p>{" "}
        <p className='d-inline text-capitalize '> {article?.topic}</p>
        <button type='button' onClick={handelRating}>
          <span className='star float-end border p-2'>{rating} &#9733;</span>{" "}
        </button>
        <br />
        <h4 className='mt-3'>{article?.title}</h4>
        <br />
        <p className='text-capitalize'> {article?.author}</p>
        <p> {article?.created_at}</p>
        <p>{article?.body}</p>
        <br />
      </section>
      <Comments article_id={article_id} />
    </section>
  );
}

export default Article;
