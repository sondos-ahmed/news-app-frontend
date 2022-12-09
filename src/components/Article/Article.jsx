import { useEffect, useState } from "react";
import { getArticleById } from "../../api.js";
import { useParams, useNavigate } from "react-router-dom";
import Comments from "./Comments";
import Spinner from "react-bootstrap/Spinner";
import "../../css/article.css";
import Alert from "react-bootstrap/Alert";
import Votes from "./Votes";

export function Article() {
  const [article, setArticle] = useState();
  const [rating, setRating] = useState(0);
  const { article_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getArticleById(article_id)
      .then((article) => {
        setArticle(article);
        setRating(article.votes);
        setLoading(false);
      })
      .catch(() => {
        navigate("/*");
      });
  }, [article_id]);

  return loading ? (
    <Spinner animation='border' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  ) : (
    <section className=' m-3'>
      <Alert variant='danger' show={show}>
        Request failed, please try again!
      </Alert>
      <section className='article-card p-4'>
        <p className='d-inline'> Article |</p>{" "}
        <p className='d-inline text-capitalize '> {article?.topic}</p>
        <Votes
          article_id={article?.article_id}
          setShow={setShow}
          rating={rating}
          setRating={setRating}
        />
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
