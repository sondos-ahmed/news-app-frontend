import { useEffect, useState } from "react";
import { getArticleById } from "../api.js";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import "../css/article.css";

function Article() {
  const [article, setArticle] = useState();
  const { article_id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setArticle(article);
      setLoading(false);
    });
  }, [article_id]);

  return loading ? (
    <Spinner animation='border' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  ) : (
    <section className='border m-3 article-card'>
      <p className='d-inline '> Article |</p>{" "}
      <p className='d-inline text-capitalize '> {article?.topic}</p>
      <br />
      <h4 className='mt-3'>{article?.title}</h4>
      <br />
      <p className='text-capitalize'> {article?.author}</p>
      <p> {article?.created_at}</p>
      <p>{article?.body}</p>
      <br />
    </section>
  );
}

export default Article;
