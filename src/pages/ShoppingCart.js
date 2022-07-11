import React from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      productCart: [],
      productCountControl: {},
      cartTotal: 0,
    };
  }

  componentDidMount() {
    this.getProductCart();
  }

  addCartToStorage = (cart) => localStorage.setItem('productCart', JSON.stringify(cart));

  getCartFromStorage = () => {
    const storedProducts = localStorage.getItem('productCart');
    return storedProducts ? JSON.parse(storedProducts) : [];
  }

  parseProductCart = (cart) => {
    let cartTotal = 0;
    const productCountControl = {};
    const productCart = cart.reduce((productsArray, product) => {
      cartTotal += product.price;
      cartTotal = Number(cartTotal.toFixed(2));
      if (!productsArray.some(({ id }) => id === product.id)) {
        productCountControl[product.id] = 1;
        return [...productsArray, product];
      }
      productCountControl[product.id] += 1;
      return productsArray;
    }, []);
    return [productCart, productCountControl, cartTotal];
  }

  getProductCart = () => {
    const storedCart = this.getCartFromStorage();
    const [
      productCart,
      productCountControl,
      cartTotal,
    ] = this.parseProductCart(storedCart);
    this.setState({ productCart, productCountControl, cartTotal });
  }

  updateProductCart = (callback) => {
    const productCart = this.getCartFromStorage();
    const newProductCart = callback(productCart);
    this.addCartToStorage(newProductCart);
    this.getProductCart();
  }

  onRemoveProductFromCart = (product) => {
    const callback = (productCart) => productCart.filter(({ id }) => id !== product.id);
    this.updateProductCart(callback);
  }

  onProductCountIncrease = (product) => {
    const callback = (productCart) => [...productCart, product];
    this.updateProductCart(callback);
  }

  removeRepeatedProduct = (productCart, id) => {
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

  onProductCountDecrease = ({ id }) => {
    const { productCountControl } = this.state;
    if (productCountControl[id] === 1) return;
    const callback = (productCart) => this.removeRepeatedProduct(productCart, id);
    this.updateProductCart(callback);
  }

  render() {
    const { productCart, productCountControl, cartTotal } = this.state;
    return (
      <div>
        <ul>
          { productCart.map((item) => {
            const { id, title, price, thumbnail } = item;
            return (
              <li key={ id }>
                <img src={ thumbnail } alt={ title } />
                <p data-testid="shopping-cart-product-name">{ title }</p>
                <p>{ price }</p>
                <button
                  type="button"
                  onClick={ () => this.onRemoveProductFromCart(item) }
                >
                  X
                </button>
                <button
                  type="button"
                  onClick={ () => this.onProductCountDecrease(item) }
                  data-testid="product-decrease-quantity"
                >
                  -
                </button>
                <span
                  data-testid="shopping-cart-product-quantity"
                >
                  { productCountControl[id] }
                </span>
                <button
                  type="button"
                  onClick={ () => this.onProductCountIncrease(item) }
                  data-testid="product-increase-quantity"
                >
                  +
                </button>
              </li>
            );
          }) }
        </ul>
        <p>
          Total da compra: R$
          { cartTotal }
        </p>
        <Link
          to="/checkOut"
          data-testid="checkout-products"
        >
          <button type="button">
            CheckOut
          </button>
        </Link>
        <h4 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h4>
      </div>
    );
  }
}

export default ShoppingCart;
