import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllArticles } from "../api.js";

function Articles() {
  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    getAllArticles().then((articles) => {
      setAllArticles(articles);
    });
  }, []);
  return (
    <div>
      {allArticles.map((article) => {
        return (
          <Card className='m-3'>
            <Card.Title>{article?.title}</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>
              {article?.topic}
            </Card.Subtitle>
            <Card.Link>
              <Link to={`/articles/${article?.article_id}`}>Article Link</Link>
            </Card.Link>
          </Card>
        );
      })}
    </div>
  );
}

export default Articles;
