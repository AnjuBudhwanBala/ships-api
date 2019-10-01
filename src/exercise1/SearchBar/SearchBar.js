import React from 'react';
import classes from './SearchBar.module.css';
import { ReactComponent as SearchGlassIcon } from '../../assets/magnifying-glass.svg';

const SearchBar = () => {
  const submitHandler = () => {
    alert('submit');
  };
  return (
    <form onSubmit={submitHandler}>
      <div className={classes.SearchBarform}>
        <input type="text" placeholder="Search" className={classes.Field} />
        <SearchGlassIcon className={classes.SearchIcon} />
      </div>
    </form>
  );
};

export default SearchBar;
