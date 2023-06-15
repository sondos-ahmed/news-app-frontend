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


  return (
    <Carousel
      variant='dark'
      activeIndex={index}
      onSelect={handleSelect}
      className='text-white'
    >
      {articles.map((article, index) => {
        return (
          <Carousel.Item key={article?.article_id}>
            <img
          className="d-block w-100"
          src="https://img.freepik.com/free-vector/realistic-bokeh-background_52683-64201.jpg"
          alt="First slide"
        />
            <Carousel.Caption>
              <h3 className='baltic-color'>{article?.title}</h3>
              <h5 className='mb-2  text-capitalize'>{`By: ${article?.author}`}</h5>
              <Link
                to={`/articles/${article?.article_id}`}
                className=' text-decoration-none'
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
