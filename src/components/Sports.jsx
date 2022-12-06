import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLatestSportsArticles } from "../api.js";
import Spinner from "react-bootstrap/Spinner";

function Sports({ loading, setLoading }) {
  const [latestSports, setlatestSports] = useState([]);

  useEffect(() => {
    getLatestSportsArticles().then((articles) => {
      setlatestSports(articles);
      setLoading(false);
    });
  }, [loading]);

  return loading ? (
    <Spinner animation='border' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  ) : (
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

                <Link to={`/articles/${article?.article_id}`}>
                  Article Link
                </Link>
              </Card.Body>
            </Card>
          );
        }
      })}
    </section>
  );
}

export default Sports;
