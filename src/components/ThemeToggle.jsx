import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAppContext } from '../context/context';

const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useAppContext();
  return (
    <section className="toggle-container">
      <button className="theme-toggle" onClick={() => toggleTheme()}>
        {isDarkTheme ? (
          <LightModeIcon className="toggle-icon" />
        ) : (
          <DarkModeIcon className="toggle-icon" />
        )}
      </button>
    </section>
  );
};

export default ThemeToggle;
