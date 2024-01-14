import React from 'react';
import { Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import ReviewStars from './ReviewStars';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const MainPage = ({ meals }) => {
  return (
    <div className="main-page">
      <div className="row-wrap">
        <div className="carousel">
          <Carousel
            sx={{ width: '100%' }}
            NextIcon={<NavigateNextIcon />}
            PrevIcon={<NavigateBeforeIcon />}>
            {meals.map((meal) => (
              <a href={`/meals/${meal.id}`} key={meal.id} className="main-page">
                <div className="main-img">
                  <img
                    src={`https://source.unsplash.com/random?${meal.title}`}
                  />
                </div>
                <div className="main-info">
                  <div>
                    <h1>{meal.title}</h1>
                    <ReviewStars meal={meal} />
                  </div>
                  <div>
                    <p>{meal.description}</p>
                    <h6>{meal.price}DKK</h6>
                  </div>
                </div>
              </a>
            ))}
          </Carousel>
        </div>
        <p className="about">
          Welcome to our meal-sharing dining platform - a culinary marketplace
          that celebrates the joy of sharing a meal. This is a space where
          passionate home cooks and food enthusiasts from all corners of Denmark
          can come together to create and enjoy unique dining experiences.
          Imagine a world where you can savor the aroma of homemade dishes,
          crafted with love and care, by hosts who open their kitchens to you.
          Whether it's a cozy family recipe prepared by a host in Aalborg, a
          flavorful cultural delight cooked up in Odense, or a gastronomic
          adventure whipped up by a culinary artist in Copenhagen, each meal is
          an intimate gathering designed to connect foodies and foster new
          friendships. Dive into a melting pot of flavors, stories, and
          friendships, and embark on a journey that turns ordinary meals into
          extraordinary memories.
        </p>
      </div>
      <a href="/meals">
        <Button variant="outlined" sx={{ marginTop: '1rem' }}>
          Explore more
        </Button>
      </a>
    </div>
  );
};

export default MainPage;
