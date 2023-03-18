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
    <Container  className="bg-light"> 
    <Container className='py-3 justify-content-center'>
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
    </Container>
  );
}

export default Articles;
