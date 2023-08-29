import { Rating, TextField, Button } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const AddReview = ({ id }) => {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState({
    title: '',
    description: '',
    meal_id: id,
    stars: ''
  });

  const updateData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    if (data.stars) {
      try {
        axios.post('api/reviews', data);
        alert('review sent');
        setEditing(false);
      } catch (e) {
        alert(e.message);
      }
    } else {
      alert('choose a star rating');
    }
  };

  return !editing ? (
    <Button variant="outlined" onClick={() => setEditing(true)}>
      Leave a review
    </Button>
  ) : (
    <form onSubmit={(e) => submit(e)}>
      <h2>Leave a review</h2>
      <Rating
        value={data.stars}
        name="stars"
        onChange={(e) => updateData(e)}
        size="large"
        required
      />
      <TextField
        value={data.title}
        onChange={(e) => updateData(e)}
        label="Review title"
        name="title"
        variant="outlined"
        margin="dense"
        fullWidth
        required
      />
      <TextField
        value={data.description}
        onChange={(e) => updateData(e)}
        label="Tell us more"
        name="description"
        variant="outlined"
        margin="dense"
        fullWidth
        multiline
        rows={4}
      />
      <Button type="submit" variant="outlined" sx={{ marginTop: '0.5rem' }}>
        Submit review
      </Button>
    </form>
  );
};

export default AddReview;
