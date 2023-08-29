import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

const ReviewStars = ({ meal }) => {
  const [stars, setStars] = useState(0);
  const [reviewAmount, setReviewAmount] = useState(0);

  useEffect(() => {
    async function getStars(mealId) {
      const res = await axios.get(`api/meals/${mealId}/reviews`);
      const reviews = res.data;

      if (reviews.length > 0) {
        setReviewAmount(reviews.length);
        let totalStars = 0;
        reviews.forEach((review) => {
          totalStars += review.stars;
        });
        const averageStars = totalStars / reviews.length;
        setStars(+averageStars.toFixed(1));
      }
    }
    getStars(meal.id).catch(console.error);
  }, []);

  function getSolidStars() {
    const total = [];
    for (let i = stars; i > 0.2; i--) {
      i > 0.7
        ? total.push(<FontAwesomeIcon key={i} icon={solidStar} />)
        : total.push(<FontAwesomeIcon key={i} icon={faStarHalfStroke} />);
    }
    return total;
  }

  function getEmptyStars(solidStars) {
    const total = [];
    for (let i = 5 - solidStars.length; i > 0; i--) {
      total.push(<FontAwesomeIcon key={i} icon={regularStar} />);
    }
    return total;
  }

  const solidStars = getSolidStars();
  const emptyStars = getEmptyStars(solidStars);

  return (
    <div className="stars">
      {stars} {solidStars}
      {emptyStars} ({reviewAmount})
    </div>
  );
};

export default ReviewStars;
