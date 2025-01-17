import React, { useState, useReducer, useEffect } from 'react';
import classes from './SearchInput.module.css';
import { ReactComponent as SearchGlassIcon } from '../assets/magnifying-glass.svg';
import { ReactComponent as SearchCrossIcon } from '../assets/cross.svg';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import ListItems from '../ListItems/ListItems';

//set initial state for network request
const initialState = {
  loading: false,
  error: false,
  isPresent: false,
  shipItems: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        loading: true
      };
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
  const [isPresent, setIsPresent] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

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

  // display data based on network response
  let shipData = null;
  if (state.loading) {
    shipData = <Spinner isLoading={state.loading} />;
  } else {
    if (state.error) {
      shipData = <p id="error">Sorry we are unable to fetch Ships</p>;
    } else {
      if (state.shipItems.length === 0 && isSubmit && isPresent) {
        shipData = <p style={{ textAlign: 'center' }}>No result found</p>;
      } else {
        shipData = state.shipItems.map(data => (
          <ListItems key={data.id} items={data}></ListItems>
        ));
      }
    }
  }

  //fetch requested data on submit
  const submitHandler = e => {
    e.preventDefault();

    setIsShow(true);
    setIsSubmit(true);
    dispatch({ type: 'FETCH_START' });

    axios({
      method: 'get',
      url: `http://localhost:4000/api/ships/${searchValue}`
    })
      .then(response => {
        if (response.data) {
          dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
          setIsPresent(true);
        } else {
          setIsPresent(false);
        }
      })
      .catch(error => dispatch({ type: 'FETCH_ERROR' }));
  };

  return (
    <>
      <form onSubmit={submitHandler} autoComplete="off">
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
