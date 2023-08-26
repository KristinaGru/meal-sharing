import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddReview from './AddReview';
import Review from './Review';

const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getReviews = async () => {
      const reviews = await axios.get(
        `http://localhost:5000/api/meals/${id}/reviews`
      );
      setReviews(reviews.data);
    };
    getReviews().catch(console.error);
  }, []);

  return (
    <>
      <AddReview id={id} />
      <ul className="reviews">
        {reviews.map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </ul>
    </>
  );
};

export default Reviews;
