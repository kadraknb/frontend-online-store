import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Search from './components/Search';
import ShoppingCart from './components/ShoppingCart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/shoppingCart" component={ ShoppingCart } />
          <Route exact path="/" component={ Search } />
        </Switch>
        <Link to="/shoppingCart">
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            Meu carrinho
          </button>
        </Link>
      </BrowserRouter>
    </div>
  );
}

export default App;
