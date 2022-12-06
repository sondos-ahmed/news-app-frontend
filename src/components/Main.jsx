import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHotArticle, getLatestTechArticle } from "../api.js";
import "../css/main.css";
import Card from "react-bootstrap/Card";

function Main() {
  const [hotArticle, sethotArticle] = useState();
  const [latestTech, setlatestTech] = useState();

  useEffect(() => {
    getHotArticle().then((article) => {
      if (article) {
        const newarticle = { ...article };
        newarticle.created_at = newarticle.created_at.substring(0, 10);
        sethotArticle(newarticle);
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

  return (
    <div className='main'>
      <Card>
        <Card.Body>
          <Card.Title>{hotArticle?.title}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>Hot topic</Card.Subtitle>
          <Card.Link>
            <Link to={`/articles/${hotArticle?.article_id}`}>Article Link</Link>
          </Card.Link>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>{latestTech?.title}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>Latest Tech</Card.Subtitle>
          <Card.Subtitle className='mb-2 text-muted'>
            {latestTech?.created_at}
          </Card.Subtitle>

          <Card.Link>
            <Link to={`/articles/${latestTech?.article_id}`}>Article Link</Link>
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Main;
