import Container from "react-bootstrap/Container";
import "../css/home.css";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getHotArticle,
  getLatestTechArticle,
  getLatestSportsArticles,
  getOrderedCookingsArticles,
} from "../../api.js";
import "../css/main.css";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";

function Home() {
  const [loading, setLoading] = useState(true);
  const [hotArticle, sethotArticle] = useState();
  const [latestTech, setlatestTech] = useState();
  const [latestSports, setlatestSports] = useState([]);
  const [index, setIndex] = useState(0);
  const [cookingArticles, setcookingArticles] = useState([]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    getHotArticle()
      .then((article) => {
        if (article) {
          const newarticle = { ...article };
          newarticle.created_at = newarticle.created_at.substring(0, 10);
          sethotArticle(newarticle);
          setLoading(false);
        }
      })
      .then(() => {
        getLatestTechArticle().then((article) => {
          if (article) {
            const newarticle = { ...article };
            newarticle.created_at = newarticle.created_at.substring(0, 10);
            setlatestTech(newarticle);
          }
        });
      })
      .then(() => {
        getLatestSportsArticles().then((articles) => {
          setlatestSports(articles);
          setLoading(false);
        });
      })
      .then(() => {
        getOrderedCookingsArticles().then((articles) => {
          setcookingArticles(articles);
          setLoading(false);
        });
      });
  }, []);
  return loading ? (
    <Spinner animation='border' role='status' className='spinner'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  ) : (
    <Container>
      <Row className='main'>
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
            <Card.Subtitle className='mb-2 text-muted'>
              Latest Tech
            </Card.Subtitle>
            <Card.Subtitle className='mb-2 text-muted'>
              {latestTech?.created_at}
            </Card.Subtitle>

            <Link to={`/articles/${latestTech?.article_id}`}>Article Link</Link>
          </Card.Body>
        </Card>
      </Row>
      <Row id='sports-section'>
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
      </Row>
      <Row id='cooking-section'>
        <h2 className='mt-3'>Cooking Articles</h2>
        <Carousel
          variant='dark'
          className='d-block'
          activeIndex={index}
          onSelect={handleSelect}
        >
          {cookingArticles.map((article) => {
            return (
              <Carousel.Item key={article?.article_id}>
                <img
                  className='d-block '
                  src='https://pngimage.net/wp-content/uploads/2018/05/empty-image-png-7.png'
                  alt='First slide'
                />
                <Carousel.Caption>
                  <h3>{article?.title}</h3>
                  <h5 className='mb-2 text-muted'>{`By: ${article?.author}`}</h5>
                  <Link to={`/articles/${article?.article_id}`}>read more</Link>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Row>
      <Row id='footer'>
        <Footer />
      </Row>
    </Container>
  );
}

export default Home;
