import React, { useState, useEffect, useReducer } from 'react';
import classes from './SearchInput.module.css';
import { ReactComponent as SearchGlassIcon } from '../assets/magnifying-glass.svg';
import { ReactComponent as SearchCrossIcon } from '../assets/cross.svg';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import ListItems from './ListItems';

const initialState = {
  loading: true,
  error: false,
  shipItems: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        error: false,
        shipItems: action.payload
      };
    case 'FETCH_ERROR':
      return {
        loading: false,
        error: true
      };
    default: {
      return state;
    }
  }
};

const SearchInput = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
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

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:4000/api/ships'
    })
      .then(response => {
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      })
      .catch(error => dispatch({ type: 'FETCH_SUCCESS' }));
  }, []);

  let shipData = null;

  if (state.loading) {
    shipData = <Spinner isLoading={state.loading} />;
  } else {
    if (state.error) {
      shipData = <p id="error">Sorry we are unable to fetch Contracts</p>;
    } else {
      if (state.shipItems.length === 0) {
        shipData = <p>You do not have any Ship</p>;
      } else {
        shipData = state.shipItems.map(data => (
          <ListItems key={data.id} items={data}></ListItems>
        ));
      }
    }
  }

  return (
    <>
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
      {shipData}
    </>
  );
};

export default SearchInput;
