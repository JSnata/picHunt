import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppContext } from '../context/context';
import { useTheme } from '@mui/material/styles';

const SearchForm = () => {
  const { searchTerm, setSearchTerm } = useAppContext();
  const [inputValue, setInputValue] = useState('');
  const theme = useTheme();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(inputValue);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography
        variant="h3"
        component="h1"
        sx={{ color: theme.palette.primary.main }}
      >
        PicHunt
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%', maxWidth: 600 }}
      >
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          sx={{
            flex: 1,
            mr: 0,
            '& .MuiOutlinedInput-root': {
              borderRadius: '4px 0 0 4px',
            },
          }}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          size="small"
          sx={{
            height: '40px',
            minWidth: '40px',
            borderRadius: '0 4px 4px 0',
            padding: 0,
          }}
        >
          <SearchIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default SearchForm;
