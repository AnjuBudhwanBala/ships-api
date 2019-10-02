import React from 'react';
import classes from './ListItems.module.css';

const ListItems = ({ items }) => {
  return (
    <ul className={classes.ListItems}>
      <li>{items.name}</li>
    </ul>
  );
};

export default ListItems;
