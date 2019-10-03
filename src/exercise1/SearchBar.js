import React from 'react';
import classes from './SearchBar.module.css';
import { ReactComponent as SearchGlassIcon } from '../assets/magnifying-glass.svg';

const SearchBar = () => {
  return (
    <form autoComplete="off">
      <div className={classes.SearchBarform}>
        <input
          id="search"
          type="text"
          placeholder="Search"
          className={classes.Field}
        />
        <SearchGlassIcon className={classes.SearchIcon} />
      </div>
    </form>
  );
};

export default SearchBar;
