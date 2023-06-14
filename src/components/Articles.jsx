import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllArticles, getArticlesByTopic } from "../api.js";
import Spinner from "react-bootstrap/Spinner";
import CarouselArticles from "./CarouselArticles";
import {Row,Container, Col} from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "../css/articles.css"
import image from "../img/mainBG.jpg"

function Articles() {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  const [query, setquery] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get("topic")) {
      getAllArticles(query).then((articles) => {
        setAllArticles(articles);
        setLoading(false);
      });
    } else {
      getArticlesByTopic(searchParams.get("topic"), query)
        .then((articles) => {
          setAllArticles(articles);
          setLoading(false);
        })
        .catch(() => {
          navigate("/*");
        });
    }
  }, [searchParams.get("topic"), query]);
  function handelSortSelectionChange(event) {
    setquery((prevQuery) => {
      return { ...prevQuery, sort_by: event.target.value };
    });
  }

  function handelOrderChange(event) {
    setquery((prevQuery) => {
      return { ...prevQuery, order: event.target.value };
    });
  }

  return loading ? (
    <Spinner animation='border' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  ) : (
    <Container  fluid  className="bg-light wv-100"> 
    <Container  fluid className='wv-100'>
    <Row className='carousel-articles'>
        <CarouselArticles
          className='text-white bg-secondary'
          allArticles={allArticles}
        />
      </Row>
      <Row className="justify-content-center">
     
        <label className='m-2'>Sort by:</label>
        <Form.Select
          aria-label='sort by select'
          onChange={handelSortSelectionChange}
          className='w-25 '
        >
          <option defaultValue='created_at'>Date</option>
          <option value='comment_count'>Comments</option>
          <option value='votes'>Rating</option>
        </Form.Select>

        <label className='m-2'>Order</label>
        <Form.Select
          aria-label='sort by select'
          onChange={handelOrderChange}
          className='w-25 '
        >
          <option defaultValue='DESC'>Descending</option>{" "}
          <option value='ASC'>Ascending</option>
        </Form.Select>
      </Row>
      </Container>
      {allArticles.map((article) => {
        return (
          <Card key={article.article_id} className=' p-3 text-start comments-card border-0 bg-light flex-row border-bottom border-top-none  m-0'>
            
             <img src={image} alt="Article Image" className=" pr-3 card-img-end" />
             <div class="card-body p-4 ">
            <Card.Title className="fs-5 fw-bold">{article?.title}</Card.Title>
            <Card.Subtitle className='mb-2 fs-5 text-capitalize fw-bold text-muted'>
              {article?.topic}
            </Card.Subtitle>
            <Card.Subtitle className='mb-4 '>
              {article?.created_at}
            </Card.Subtitle>
            <Link className="fs-5 text-white bg-dark p-3 mt-3" to={`/articles/${article?.article_id}`}>Article Link</Link></div>
          </Card>
        );
      })}
    </Container>
  );
}

export default Articles;
