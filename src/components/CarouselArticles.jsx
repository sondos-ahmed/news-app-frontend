import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

function CarouselArticles({ allArticles }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  //change the Carousal data from parametery to this array

  const articles = allArticles.filter((article, index) => {
    if (index <= 5) {

      const imageUrl = "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/spaghetti-carbonara-863d8d7.jpg?quality=90&webp=true&fit=700,350";

    // Add the `image` property to the article object
    return { ...article, image: imageUrl }
   };
   return null; 
  });

  console.log(articles);

  return (
    <Carousel
      variant='dark'
      activeIndex={index}
      onSelect={handleSelect}
      className='text-white bg-secondary'
    >
      {articles.map((article, index) => {
        return (
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
        ) 
        
      })}
    </Carousel>
  );
}

export default CarouselArticles;
