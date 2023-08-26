import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';

const HostPage = () => {
  const [data, setData] = useState({
    title: '',
    description: '',
    location: '',
    max_reservations: '',
    price: '',
    when: new Date().toISOString().split('T')[0]
  });

  const updateData = (e) => {
    typeof e === 'string'
      ? setData({
          ...data,
          when: `${e.split('T')[0]} ${e.split('T')[1].slice(0, 8)}`
        })
      : setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    try {
      axios.post('http://localhost:5000/api/meals', data);
      alert('meal added');
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="row-wrap">
      <p className="about">
        <h3>Become a Host</h3>
        Ready to transform your kitchen into a dining hotspot? Embrace the role
        of a host and share your culinary passion with a community of fellow
        food lovers. Craft your own event, curate your menu, and determine the
        guest count – it's your kitchen, your rules, and your chance to create
        flavorful memories. Fill in the form with all the necessary details
        about your meal and get ready to embark on your journey as a host, where
        your culinary skills take center stage.
      </p>
      <form className="host" onSubmit={(e) => submit(e)}>
        <TextField
          onChange={(e) => updateData(e)}
          value={data.title}
          label="Meal Title"
          name="title"
          variant="outlined"
          sx={{ width: '100%', m: 0.5 }}
          required
        />
        <TextField
          onChange={(e) => updateData(e)}
          value={data.description}
          label="Meal Description"
          name="description"
          variant="outlined"
          sx={{ width: '100%', m: 0.5 }}
          required
        />
        <TextField
          onChange={(e) => updateData(e)}
          value={data.location}
          label="Location"
          name="location"
          variant="outlined"
          sx={{ width: '100%', m: 0.5 }}
          required
        />
        <TextField
          value={data.price}
          onChange={(e) => updateData(e)}
          label="Meal Price"
          name="price"
          variant="outlined"
          type="number"
          sx={{ width: '100%', m: 0.5 }}
          InputProps={{ inputProps: { min: 0 } }}
          required
        />
        <TextField
          value={data.max_reservations}
          onChange={(e) => updateData(e)}
          label="Max reservations"
          name="max_reservations"
          variant="outlined"
          type="number"
          sx={{ width: '100%', m: 0.5 }}
          InputProps={{ inputProps: { min: 1 } }}
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            ampm={false}
            label="Date"
            name="when"
            value={dayjs(data.when)}
            onChange={(e) => updateData(e.toISOString())}
            sx={{ width: '100%', m: 0.5 }}
            required
          />
        </LocalizationProvider>
        <Button type="submit" variant="contained" sx={{ marginTop: '0.5rem' }}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default HostPage;
