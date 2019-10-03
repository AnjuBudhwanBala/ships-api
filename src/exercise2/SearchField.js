import React, { useState, useEffect } from 'react';
import classes from './SearchField.module.css';
import { ReactComponent as SearchGlassIcon } from '../assets/magnifying-glass.svg';
import { ReactComponent as SearchCrossIcon } from '../assets/cross.svg';

const SearchField = ({ submit }) => {
  const [isShow, setIsShow] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  //search change handler
  const searchChangeHandler = event => {
    const newStr = event.target.value.trimStart();
    setSearchValue(newStr);
  };

  useEffect(() => {
    if (searchValue.length === 0) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, [searchValue]);

  //clear Search Field
  const clearFieldHandler = () => {
    setSearchValue('');
    setIsShow(true);
  };

  return (
    <form autoComplete="off">
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

export default SearchField;
