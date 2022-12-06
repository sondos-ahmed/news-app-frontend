import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHotArticle, getLatestTechArticle } from "../api.js";
import "../css/main.css";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

function Main({ loading, setLoading }) {
  const [hotArticle, sethotArticle] = useState();
  const [latestTech, setlatestTech] = useState();

  useEffect(() => {
    getHotArticle().then((article) => {
      if (article) {
        const newarticle = { ...article };
        newarticle.created_at = newarticle.created_at.substring(0, 10);
        sethotArticle(newarticle);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    getLatestTechArticle().then((article) => {
      if (article) {
        const newarticle = { ...article };
        newarticle.created_at = newarticle.created_at.substring(0, 10);
        setlatestTech(newarticle);
      }
    });
  }, []);

  return loading ? (
    <Spinner animation='border' role='status' className='spinner'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  ) : (
    <div className='main'>
      <Card>
        <Card.Body>
          <Card.Title>{hotArticle?.title}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>Hot topic</Card.Subtitle>
          <Link to={`/articles/${hotArticle?.article_id}`}>Article Link</Link>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>{latestTech?.title}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>Latest Tech</Card.Subtitle>
          <Card.Subtitle className='mb-2 text-muted'>
            {latestTech?.created_at}
          </Card.Subtitle>

          <Link to={`/articles/${latestTech?.article_id}`}>Article Link</Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Main;
