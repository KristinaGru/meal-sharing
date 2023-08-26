import {
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDownWideShort,
  faArrowUpWideShort,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const FilterMeals = ({ fetchMeals }) => {
  const [title, setTitle] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortDir, setSortDir] = useState('asc');
  const [maxPrice, setMaxPrice] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [availableReservations, setAvailableReservations] = useState(false);
  const [dateAfter, setDateAfter] = useState('');
  const [dateBefore, setDateBefore] = useState('');
  const [openFilters, setOpenFilters] = useState(false);

  useEffect(() => {
    fetchMeals(
      title,
      sortKey,
      sortDir,
      maxPrice,
      minPrice,
      availableReservations,
      dateAfter,
      dateBefore
    );
  }, [title, sortKey, sortDir]);

  return (
    <div className="filters">
      <Paper
        component="form"
        sx={{
          padding: '0.5rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
        <InputBase
          sx={{ width: '80%' }}
          placeholder="Search"
          onChange={(e) => setTitle(e.target.value)}
        />
        <IconButton sx={{ p: '10px' }}>
          <SearchIcon />
        </IconButton>
      </Paper>
      <Paper
        sx={{
          width: '10rem'
        }}>
        <FormControl fullWidth variant="standard">
          <InputLabel
            sx={{
              padding: '0 1rem'
            }}>
            Order By
          </InputLabel>
          <Select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            disableUnderline
            sx={{
              padding: '0 1rem'
            }}>
            <MenuItem value={'when'}>Date</MenuItem>
            <MenuItem value={'price'}>Price</MenuItem>
            <MenuItem value={'max_reservations'}>Max Reservations</MenuItem>
          </Select>
        </FormControl>
      </Paper>
      {sortKey ? (
        <Paper
          sx={{
            padding: '0 0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <IconButton
            onClick={() => {
              sortDir === 'asc' ? setSortDir('desc') : setSortDir('asc');
            }}>
            {sortDir === 'asc' ? (
              <FontAwesomeIcon icon={faArrowDownWideShort} />
            ) : (
              <FontAwesomeIcon icon={faArrowUpWideShort} />
            )}
          </IconButton>
        </Paper>
      ) : null}
      <Paper
        sx={{
          padding: '0 0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <IconButton onClick={() => setOpenFilters(true)}>
          <FontAwesomeIcon icon={faFilter} />
        </IconButton>
      </Paper>
      <Dialog open={openFilters} onClose={() => setOpenFilters(false)}>
        <div className="filter-dialog">
          <DialogTitle>More Filters</DialogTitle>
          <div>
            <TextField
              value={minPrice}
              label="Min Price"
              name="minPrice"
              variant="outlined"
              margin="dense"
              type="number"
              onChange={(e) => setMinPrice(e.target.value)}
              inputProps={{ inputMode: 'numeric' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">DKK</InputAdornment>
                )
              }}
            />
            <TextField
              value={maxPrice}
              label="Max Price"
              name="maxPrice"
              variant="outlined"
              margin="dense"
              type="number"
              onChange={(e) => setMaxPrice(e.target.value)}
              inputProps={{ inputMode: 'numeric' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">DKK</InputAdornment>
                )
              }}
            />
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="After"
                value={!dateAfter ? null : dayjs(dateAfter)}
                onChange={(e) => setDateAfter(e.toISOString())}
              />
              <DatePicker
                label="Before"
                value={!dateBefore ? null : dayjs(dateBefore)}
                onChange={(e) => setDateBefore(e.toISOString())}
              />
            </LocalizationProvider>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={availableReservations}
                onChange={(e) => setAvailableReservations(e.target.checked)}
              />
            }
            label="Show only meals with available reservations"
          />
          <Button
            variant="contained"
            onClick={() => {
              fetchMeals(
                title,
                sortKey,
                sortDir,
                maxPrice,
                minPrice,
                availableReservations,
                dateAfter,
                dateBefore
              );
              setOpenFilters(false);
            }}>
            Filter
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default FilterMeals;
