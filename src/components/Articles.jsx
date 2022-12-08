import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllArticles, getArticlesByTopic } from "../api.js";
import Spinner from "react-bootstrap/Spinner";
import { useSearchParams } from "react-router-dom";

function Articles() {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get("topic"));
  useEffect(() => {
    if (!searchParams.get("topic")) {
      getAllArticles().then((articles) => {
        setAllArticles(articles);
        setLoading(false);
      });
    } else {
      getArticlesByTopic(searchParams.get("topic")).then((articles) => {
        console.log(articles);
        setAllArticles(articles);
        setLoading(false);
      });
    }
  }, [searchParams.get("topic")]);

  return loading ? (
    <Spinner animation='border' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  ) : (
    <div>
      {allArticles.map((article) => {
        return (
          <Card key={article.article_id} className='m-3 p-3'>
            <Card.Title>{article?.title}</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>
              {article?.topic}
            </Card.Subtitle>
            <Card.Subtitle className='mb-2'>
              {article?.created_at}
            </Card.Subtitle>
            <Link to={`/articles/${article?.article_id}`}>Article Link</Link>
          </Card>
        );
      })}
    </div>
  );
}

export default Articles;
