import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppContext } from '../context/context';

const SearchForm = () => {
  const { searchTerm, setSearchTerm } = useAppContext();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(inputValue);
  };
  return (
    <section>
      <h1 className="title">PicHunt</h1>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        alignItems="center"
        sx={{ width: '100%' }}
      >
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          sx={{ flex: 1, mr: 1 }}
          onChange={handleInputChange}
        />
        <Button variant="contained" type='submit' color="primary" size="small">
          <SearchIcon />
        </Button>
      </Box>
    </section>
  );
};

export default SearchForm;
