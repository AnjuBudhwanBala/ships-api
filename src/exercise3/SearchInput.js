import React, { useState, useEffect, useReducer } from 'react';
import classes from './SearchInput.module.css';
import { ReactComponent as SearchGlassIcon } from '../assets/magnifying-glass.svg';
import { ReactComponent as SearchCrossIcon } from '../assets/cross.svg';
import axios from 'axios';

const SearchInput = () => {
  const [isShow, setIsShow] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const [shipItems, setShipItems] = useState([]);
  const [error, setError] = useState('');

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

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:4000/api/ships'
    })
      .then(response => {
        setShipItems(response.data);
      })
      .catch(error => setError(error));
  }, []);

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
