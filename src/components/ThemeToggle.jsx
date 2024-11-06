import React from 'react';
import { IconButton, Box } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAppContext } from '../context/context';

const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useAppContext();

  return (
    <Box display="flex" className="toggle-container" sx={{ mb: 2 }}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label="toggle theme"
      >
        {isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Box>
  );
};

export default ThemeToggle;
