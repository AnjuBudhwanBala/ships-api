import React, { useState } from 'react';
import classes from './SearchInput.module.css';
import { ReactComponent as SearchGlassIcon } from '../assets/magnifying-glass.svg';
import { ReactComponent as SearchCrossIcon } from '../assets/cross.svg';

const SearchInput = () => {
  const [isShow, setIsShow] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  //search change handler
  const searchChangeHandler = event => {
    setIsShow(false);
    setSearchValue(event.target.value);
  };

  //clear Search Field
  const clearFieldHandler = () => {
    setSearchValue('');
    setIsShow(true);
  };

  return (
    <form>
      <div className={classes.SearchBarform}>
        <input
          id="search"
          type="text"
          placeholder="Search"
          className={classes.Field}
          onChange={searchChangeHandler}
          value={searchValue}
        />
        {isShow ? (
          <SearchGlassIcon className={classes.SearchIcon} />
        ) : (
          <SearchCrossIcon
            className={classes.SearchIcon}
            onClick={clearFieldHandler}
          />
        )}
      </div>
    </form>
  );
};

export default SearchInput;
