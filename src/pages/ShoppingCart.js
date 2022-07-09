import React from 'react';
import { getProductsItemsByID } from '../services/api';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      productsCountControl: {},
    };
  }

  componentDidMount() {
    this.getCartFromStorage();
  }

  getCartFromStorage = async () => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const itemIds = JSON.parse(storedCartItems);
      const productsCountControl = {};
      const unrepeatedIds = itemIds.reduce((finalArrayIds, id) => {
        if (!finalArrayIds.includes(id)) {
          productsCountControl[id] = 1;
          return [...finalArrayIds, id];
        }
        productsCountControl[id] += 1;
        return finalArrayIds;
      }, []);
      const cartItems = await getProductsItemsByID(...unrepeatedIds);
      this.setState({ cartItems, productsCountControl });
    }
  }

  render() {
    const { cartItems, productsCountControl } = this.state;
    return (
      <div>
        <ul>
          { cartItems.map(({ id, title, price, thumbnail }) => (
            <li key={ id }>
              <img src={ thumbnail } alt={ title } />
              <p data-testid="shopping-cart-product-name">{ title }</p>
              <p>{ price }</p>
              <p
                data-testid="shopping-cart-product-quantity"
              >
                { productsCountControl[id] }
              </p>
            </li>
          )) }
        </ul>
        <h4 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h4>
      </div>
    );
  }
}

export default ShoppingCart;
