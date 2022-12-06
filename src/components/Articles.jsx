import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllArticles } from "../api.js";
import Spinner from "react-bootstrap/Spinner";

function Articles() {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllArticles().then((articles) => {
      setAllArticles(articles);
      setLoading(false);
    });
  }, []);
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

            <Link to={`/articles/${article?.article_id}`}>Article Link</Link>
          </Card>
        );
      })}
    </div>
  );
}

export default Articles;
