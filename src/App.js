import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';
import CheckOut from './pages/CheckOut';

class App extends React.Component {
  onAddProductToCart = (product) => {
    const storedProducts = JSON.parse(localStorage.getItem('productCart'));
    const newCart = storedProducts ? [...storedProducts, product] : [product];
    localStorage.setItem('productCart', JSON.stringify(newCart));
  }

  shoppingCartButton = () => (
    <Link to="/shoppingCart">
      <button type="button" data-testid="shopping-cart-button">
        Meu carrinho
      </button>
    </Link>
  )

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={ (props) => (
                <Search
                  { ...props }
                  onAddProductToCart={ this.onAddProductToCart }
                  shoppingCartButton={ this.shoppingCartButton }
                />
              ) }
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
              render={ (props) => (
                <ProductDetails
                  { ...props }
                  onAddProductToCart={ this.onAddProductToCart }
                  shoppingCartButton={ this.shoppingCartButton }
                />
              ) }
            />
          </Switch>

        </BrowserRouter>
      </div>
    );
  }
}

export default App;
