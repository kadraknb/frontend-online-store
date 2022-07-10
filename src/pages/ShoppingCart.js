import React from 'react';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      productCart: [],
      productCountControl: {},
    };
  }

  componentDidMount() {
    this.getCartFromStorage();
  }

  getCartFromStorage = () => {
    const storedProducts = localStorage.getItem('productCart');
    if (storedProducts) {
      const storedCart = JSON.parse(storedProducts);
      const productCountControl = {};
      const productCart = storedCart.reduce((productsArray, product) => {
        if (!productsArray.some(({ id }) => id === product.id)) {
          productCountControl[product.id] = 1;
          return [...productsArray, product];
        }
        productCountControl[product.id] += 1;
        return productsArray;
      }, []);
      this.setState({ productCart, productCountControl });
    }
  }

  onProductCountIncrease = (product) => {
    const { productCountControl } = this.state;
    productCountControl[product.id] += 1;
    const productCart = JSON.parse(localStorage.getItem('productCart'));
    productCart.push(product);
    localStorage.setItem('productCart', JSON.stringify(productCart));
    this.setState({ productCountControl });
  }

  onProductCountDecrease = ({ id }) => {
    const { productCountControl } = this.state;
    if (productCountControl[id] === 1) return;
    productCountControl[id] -= 1;
    const productCart = JSON.parse(localStorage.getItem('productCart'));
    productCart.splice(productCart.indexOf({ id }), 1);
    localStorage.setItem('productCart', JSON.stringify(productCart));
    this.setState({ productCountControl });
  }

  render() {
    const { productCart, productCountControl } = this.state;
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
        <h4 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h4>
      </div>
    );
  }
}

export default ShoppingCart;
