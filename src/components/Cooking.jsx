import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { getOrderedCookingsArticles } from "../api.js";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function Cooking({ loading, setLoading }) {
  const [index, setIndex] = useState(0);
  const [cookingArticles, setcookingArticles] = useState([]);

  useEffect(() => {
    getOrderedCookingsArticles().then((articles) => {
      console.log(articles);
      setcookingArticles(articles);
      setLoading(false);
    });
  }, [loading]);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return loading ? (
    <Spinner animation='border' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  ) : (
    <section>
      <h2>Cooking Articles</h2>
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
    </section>
  );
}

export default Cooking;
