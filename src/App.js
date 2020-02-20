import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import GlobalSearch from './containers/GlobalSearch';
import UserSearch from './containers/UserSearch';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/globalSearch" component={GlobalSearch} />
        <Route path="/user/:username" component={UserSearch} />
      </BrowserRouter>
    </div>
  );
}

export default App;
