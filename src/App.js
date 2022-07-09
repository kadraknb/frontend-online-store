import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            path="/shoppingCart"
            component={ ShoppingCart }
          />
          <Route
            path="/productDetails/:ship"
            component={ ProductDetails }
          />
          <Route
            exact
            path="/"
            component={ Search }
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
