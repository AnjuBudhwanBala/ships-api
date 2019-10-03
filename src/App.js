import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchBar from './exercise1/SearchBar';
import SearchField from './exercise2/SearchField';
import SearchInput from './exercise3/SearchInput';
import SearchShips from './exercise4/SearchShips';

function App() {
  return (
    <Switch>
      <Route path="/exercise4" component={SearchShips} />
      <Route path="/exercise3" component={SearchInput} />
      <Route path="/exercise2" component={SearchField} />
      <Route path="/exercise1" component={SearchBar} />
    </Switch>
  );
}

export default App;
