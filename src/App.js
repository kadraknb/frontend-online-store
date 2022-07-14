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
      productCart: [],
      productCountControl: {},
      cartTotal: { cost: 0, units: 0 },
      isLoading: false,
    };
  }

  componentDidMount() {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      this.setState({ ...storedCart });
    }
  }

  addCartToStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  }

  loadingToggler = (call) => this.setState(({ isLoading: true }), call);

  calculateCartTotal = (total, product) => {
    let { cost, units } = total;
    const { price, count } = product[1];
    const productTotal = Number((price * count).toFixed(2));
    cost = Number((cost + productTotal).toFixed(2));
    units += Number(count);
    return { cost, units };
  }

  parseProductCart = ([product, control]) => {
    const { productCart } = this.state;
    let { productCountControl, cartTotal } = this.state;
    if (!control) {
      const removeProduct = (entry, idx) => {
        if (entry[0] !== product.id) {
          return true;
        }
        productCart.splice(idx, 1);
        return false;
      };
      productCountControl = Object.fromEntries(
        Object.entries(productCountControl).filter(removeProduct),
      );
    } else {
      productCountControl[product.id].count += control;
    }
    const emptyControl = { cost: 0, units: 0 };
    const controlEntries = Object.entries(productCountControl);
    cartTotal = controlEntries.reduce(this.calculateCartTotal, emptyControl);
    return this.addCartToStorage({ productCart, productCountControl, cartTotal });
  }

  countControlCheck = ([product, control]) => {
    const { productCart, productCountControl } = this.state;
    const productControl = productCountControl[product.id];
    if (!productControl) {
      this.registerProductOnCart(product, productCart, productCountControl);
      return true;
    }
    const result = productControl.count + control;
    const availableQuantity = product.available_quantity;
    return result === 0 || (availableQuantity > 0 && result > availableQuantity);
  }

  updateProductCart = (content) => {
    if (this.countControlCheck(content)) return;
    const updater = () => this.setState({
      ...this.parseProductCart(content),
      isLoading: false,
    });
    this.loadingToggler(updater);
  }

  registerProductOnCart = (product, productCart, productCountControl) => {
    productCountControl[product.id] = { price: product.price, count: 0 };
    this.setState({
      productCart: [...productCart, product],
      productCountControl,
    }, () => this.updateProductCart([product, 1]));
  }

  onAddProductToCart = (product) => this.updateProductCart([product, 1]);

  shoppingCartButton = () => {
    const { cartTotal: { units } } = this.state;
    return (
      <Link to="/shoppingCart">
        <button type="button" data-testid="shopping-cart-button">
          Meu carrinho
          {units > 0 && (
            <b data-testid="shopping-cart-size">
              {` ${units}`}
            </b>
          )}
        </button>
      </Link>
    );
  }

  freeShippingSale = ({ shipping }) => (
    shipping.free_shipping && <span data-testid="free-shipping">Frete grátis</span>
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
                  freeShippingSale={ this.freeShippingSale }
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
                  freeShippingSale={ this.freeShippingSale }
                  shoppingCartButton={ this.shoppingCartButton }
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
                  freeShippingSale={ this.freeShippingSale }
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
