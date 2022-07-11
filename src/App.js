import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';
import CheckOut from './pages/CheckOut';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={ Search }
          />
          <Route
            path="/checkOut"
            component={ CheckOut }
          />
          <Route
            path="/shoppingCart"
            component={ ShoppingCart }
          />
          <Route
            path="/productDetails/:ship"
            component={ ProductDetails }
          />
        </Switch>
        <Link to="/shoppingCart">
          <button type="button" data-testid="shopping-cart-button">
            Meu carrinho
          </button>
        </Link>
      </BrowserRouter>
    </div>
  );
}

export default App;
