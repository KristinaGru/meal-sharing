import React from 'react';
import { Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import ReviewStars from './ReviewStars';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const MainPage = ({ meals }) => {
  return (
    <div className="main-page">
      <Carousel
        sx={{ width: '100%' }}
        NextIcon={<NavigateNextIcon />}
        PrevIcon={<NavigateBeforeIcon />}>
        {meals.map((meal) => (
          <a href={`/meals/${meal.id}`} key={meal.id} className="main-page">
            <div className="main-img">
              <img src={`https://source.unsplash.com/random?${meal.title}`} />
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
      <a href="/meals">
        <Button variant="outlined" sx={{ marginTop: '1rem' }}>
          Explore more
        </Button>
      </a>
    </div>
  );
};

export default MainPage;
