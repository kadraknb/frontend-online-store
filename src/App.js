import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';
import CheckOut from './pages/CheckOut';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fullProductCart: [],
      productCart: [],
      productCountControl: {},
      cartTotal: 0,
      isLoading: false,
    };
  }

  loadingToggler = () => this.setState((state) => ({ isLoading: !state.isLoading }))

  parseProductCart = (fullProductCart) => {
    let cartTotal = 0;
    const productCountControl = {};
    const productCart = fullProductCart.reduce((products, product) => {
      cartTotal += product.price;
      cartTotal = Number(cartTotal.toFixed(2));
      if (!products.some(({ id }) => id === product.id)) {
        productCountControl[product.id] = 1;
        return [...products, product];
      }
      productCountControl[product.id] += 1;
      return products;
    }, []);
    return { fullProductCart, productCart, productCountControl, cartTotal };
  }

  updateProductCart = (callback) => {
    this.loadingToggler();
    const { fullProductCart } = this.state;
    const newState = this.parseProductCart(callback(fullProductCart));
    this.setState({ ...newState }, this.loadingToggler);
  }

  onAddProductToCart = (product) => this.updateProductCart((cart) => [...cart, product]);

  onRemoveUnitOfProduct = (productCart, id) => {
    let foundFirstProduct = false;
    const cartIndex = productCart.findIndex((product) => {
      if (product.id === id) {
        if (foundFirstProduct) {
          return true;
        }
        foundFirstProduct = true;
      }
      return false;
    });
    productCart.splice(cartIndex, 1);
    return productCart;
  }

  shoppingCartButton = () => (
    <Link to="/shoppingCart">
      <button type="button" data-testid="shopping-cart-button">
        Meu carrinho
      </button>
    </Link>
  )

  render() {
    const {
      productCart,
      productCountControl,
      cartTotal,
      isLoading,
    } = this.state;
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
                  isLoading={ isLoading }
                  onAddProductToCart={ this.onAddProductToCart }
                  shoppingCartButton={ this.shoppingCartButton }
                  updateProductCart={ this.updateProductCart }
                />
              ) }
            />
            <Route
              path="/checkOut"
              component={ CheckOut }
            />
            <Route
              path="/shoppingCart"
              render={ (props) => (
                <ShoppingCart
                  { ...props }
                  isLoading={ isLoading }
                  productCart={ productCart }
                  productCountControl={ productCountControl }
                  cartTotal={ cartTotal }
                  updateProductCart={ this.updateProductCart }
                  onRemoveUnitOfProduct={ this.onRemoveUnitOfProduct }
                />
              ) }
            />
            <Route
              path="/productDetails/:ship"
              render={ (props) => (
                <ProductDetails
                  { ...props }
                  isLoading={ isLoading }
                  onAddProductToCart={ this.onAddProductToCart }
                  shoppingCartButton={ this.shoppingCartButton }
                  updateProductCart={ this.updateProductCart }
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
