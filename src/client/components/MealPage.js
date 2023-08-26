import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import ReviewStars from './ReviewStars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBowlFood,
  faCalendarDay,
  faClock,
  faLocationDot,
  faMoneyBillWave,
  faPeopleGroup
} from '@fortawesome/free-solid-svg-icons';
import ReservationForm from './ReservationForm';
import AddReview from './AddReview';
import Reviews from './Reviews';
import { CircularProgress } from '@mui/material';

const MealPage = ({ meals }) => {
  const { id } = useParams();
  const meal = meals.find((meal) => meal.id === +id);

  return !meal ? (
    <CircularProgress color="inherit" />
  ) : (
    <div className="meal-page">
      <div className="row-wrap">
        <div>
          <div className="meal-page-img">
            <img src={`https://source.unsplash.com/random?${meal.title}`} />
          </div>
          <h1>
            {meal.title} <ReviewStars meal={meal} />
          </h1>
          <p>
            <FontAwesomeIcon className="meal-page-icon" icon={faBowlFood} />{' '}
            {meal.description}
          </p>
          <p>
            <FontAwesomeIcon className="meal-page-icon" icon={faLocationDot} />{' '}
            {meal.location}
          </p>
          <p>
            <FontAwesomeIcon className="meal-page-icon" icon={faPeopleGroup} />{' '}
            Max {meal.max_reservations} people
          </p>
          <p>
            <FontAwesomeIcon className="meal-page-icon" icon={faCalendarDay} />{' '}
            {meal.when.split('T')[0]}
          </p>
          <p>
            <FontAwesomeIcon className="meal-page-icon" icon={faClock} />{' '}
            {meal.when.split('T')[1].substring(0, 5)}
          </p>
          <p>
            <FontAwesomeIcon
              className="meal-page-icon"
              icon={faMoneyBillWave}
            />{' '}
            {meal.price}DKK
          </p>
        </div>
        <ReservationForm id={id} />
      </div>
      <Reviews id={id} />
    </div>
  );
};

export default MealPage;
