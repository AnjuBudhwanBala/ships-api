import React from 'react';
import './Spinner.css';

const Spinner = ({ isLoading }) => {
  let spinner = null;
  if (isLoading) {
    spinner = <div className="lds-dual-ring"></div>;
  }

  return spinner;
};

export default Spinner;
