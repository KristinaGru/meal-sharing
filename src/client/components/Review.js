import React from 'react';
import { Rating } from '@mui/material';

const Review = ({ review }) => {
  return (
    <li className="review">
      <h4>{review.title}</h4>
      <Rating value={review.stars} size="small" readOnly />
      <p>{review.description}</p>
    </li>
  );
};

export default Review;
