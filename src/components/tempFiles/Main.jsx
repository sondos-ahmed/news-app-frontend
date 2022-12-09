import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getHotArticle,
  getLatestTechArticle,
  getLatestSportsArticles,
} from "../../api.js";
import "../css/main.css";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

function Main({ loading, setLoading }) {
  const [hotArticle, sethotArticle] = useState();
  const [latestTech, setlatestTech] = useState();
  const [latestSports, setlatestSports] = useState([]);

  return loading ? (
    <Spinner animation='border' role='status' className='spinner'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  ) : (
    <section>
      <div>
        <Card className='main'>
          <Card.Body>
            <Card.Title>{hotArticle?.title}</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>Hot topic</Card.Subtitle>
            <Link to={`/articles/${hotArticle?.article_id}`}>Article Link</Link>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>{latestTech?.title}</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>
              Latest Tech
            </Card.Subtitle>
            <Card.Subtitle className='mb-2 text-muted'>
              {latestTech?.created_at}
            </Card.Subtitle>

            <Link to={`/articles/${latestTech?.article_id}`}>Article Link</Link>
          </Card.Body>
        </Card>
      </div>
      <div id='sports-section'>
        <h2 className='mt-3'>Recent Sports Articles</h2>
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
      </div>
      <br />
    </section>
  );
}

export default Main;
