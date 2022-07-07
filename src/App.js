import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={ Search } />
      </BrowserRouter>
    </div>
  );
}

export default App;
