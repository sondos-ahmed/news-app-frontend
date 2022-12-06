import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLatestSportsArticles } from "../api.js";

function Sports() {
  const [latestSports, setlatestSports] = useState([]);

  useEffect(() => {
    getLatestSportsArticles().then((articles) => {
      setlatestSports(articles);
    });
  }, []);

  return (
    <section>
      {latestSports.map((article, index) => {
        if (index <= 2) {
          return (
            <Card key={article.article_id} className='mb-2 mt-4'>
              <Card.Body>
                <Card.Title>{article?.title}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                  {article?.topic}
                </Card.Subtitle>
                <Card.Link>
                  <Link to={`/articles/${article?.article_id}`}>
                    Article Link
                  </Link>
                </Card.Link>
              </Card.Body>
            </Card>
          );
        }
      })}
    </section>
  );
}

export default Sports;
