import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchBar from './exercise1/SearchBar';
import SearchField from './exercise2/SearchField';
import SearchInput from './exercise3/SearchInput';

function App() {
  return (
    <Switch>
      <Route path="/exercise3" exact component={SearchInput} />
      <Route path="/exercise2" exact component={SearchField} />
      <Route path="/exercise1" exact component={SearchBar} />
    </Switch>
  );
}

export default App;
