import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

function CarouselArticles({ allArticles }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      variant='dark'
      activeIndex={index}
      onSelect={handleSelect}
      classNAme='text-white bg-secondary'
    >
      {allArticles.map((article, index) => {
        return index <= 5 ? (
          <Carousel.Item key={article?.article_id}>
            <Carousel.Caption>
              <h3 className='baltic-color'>{article?.title}</h3>
              <h5 className='mb-2 mulberry text-capitalize'>{`By: ${article?.author}`}</h5>
              <Link
                to={`/articles/${article?.article_id}`}
                className='mulberry text-decoration-none'
              >
                Read more...
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        ) : (
          ""
        );
      })}
    </Carousel>
  );
}

export default CarouselArticles;
