import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const ReservationForm = ({ id }) => {
  const [availableReservations, setAvailableReservations] = useState(0);

  const getAvailableReservations = async () => {
    const res = await axios.get(
      'http://localhost:5000/api/meals?availableReservations=true'
    );
    const meals = res.data;
    const meal = meals.find((meal) => meal.id === +id);
    meal
      ? meal.available_reservations === null
        ? setAvailableReservations(meal.max_reservations)
        : setAvailableReservations(meal.available_reservations)
      : setAvailableReservations(0);
  };

  useEffect(() => {
    getAvailableReservations().catch(console.error);
  }, []);

  const [data, setData] = useState({
    number_of_guests: '',
    meal_id: id,
    contact_phonenumber: '',
    contact_name: '',
    contact_email: ''
  });

  const updateData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    try {
      setAvailableReservations(availableReservations - data.number_of_guests);
      axios.post('http://localhost:5000/api/reservations', data);
      alert('successful reservation');
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <form className="reservation" onSubmit={(e) => submit(e)}>
      <h2>Make a reservation</h2>
      {availableReservations > 0 ? (
        <>
          <p>{availableReservations} spots left</p>
          <TextField
            onChange={(e) => updateData(e)}
            value={data.contact_name}
            label="Name"
            name="contact_name"
            variant="outlined"
            margin="dense"
            sx={{ width: '100%' }}
            required
          />
          <TextField
            value={data.contact_email}
            onChange={(e) => updateData(e)}
            label="Email"
            name="contact_email"
            variant="outlined"
            margin="dense"
            type={'email'}
            sx={{ width: '100%' }}
            required
          />
          <TextField
            value={data.contact_phonenumber}
            onChange={(e) => updateData(e)}
            label="Phone Number"
            name="contact_phonenumber"
            variant="outlined"
            margin="dense"
            type="number"
            sx={{ width: '100%' }}
          />
          <TextField
            value={data.number_of_guests}
            onChange={(e) => updateData(e)}
            label="Number of guests"
            name="number_of_guests"
            variant="outlined"
            margin="dense"
            type="number"
            sx={{ width: '100%' }}
            InputProps={{ inputProps: { min: 1, max: availableReservations } }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: '0.5rem' }}>
            Book
          </Button>
        </>
      ) : (
        <p>
          No available reservations
          <Link to={'/meals'}> Browse other available meals </Link>
        </p>
      )}
    </form>
  );
};

export default ReservationForm;
