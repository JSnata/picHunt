import React from 'react';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { useAppContext } from '../context/context';

const ThemeToggle = () => {
  const {isDarkTheme, toggleTheme} = useAppContext();
  return (
    <section className='toggle-container'>
        <button className='theme-toggle' onClick={() => toggleTheme()}>
            {isDarkTheme ? <BsFillSunFill className='toggle-icon' /> : <BsFillMoonFill className='toggle-icon' />}
        </button>
    </section>
  )
}

export default ThemeToggle