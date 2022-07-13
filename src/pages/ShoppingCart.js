import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  onRemoveProductFromCart = (product) => {
    const { updateProductCart } = this.props;
    const callback = (productCart) => productCart.filter(({ id }) => id !== product.id);
    updateProductCart(callback);
  }

  onProductCountIncrease = (product) => {
    const { updateProductCart } = this.props;
    const callback = (productCart) => [...productCart, product];
    updateProductCart(callback);
  }

  onProductCountDecrease = ({ id }) => {
    const {
      productCountControl,
      onRemoveUnitOfProduct,
      updateProductCart,
    } = this.props;
    if (productCountControl[id] === 1) return;
    const callback = (productCart) => onRemoveUnitOfProduct(productCart, id);
    updateProductCart(callback);
  }

  render() {
    const {
      productCart,
      productCountControl,
      cartTotal,
    } = this.props;
    return (
      <div>
        { productCart.length ? (
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
          </div>
        ) : (
          <h4 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h4>
        ) }
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  updateProductCart: PropTypes.func.isRequired,
  onRemoveUnitOfProduct: PropTypes.func.isRequired,
  productCart: PropTypes.arrayOf(PropTypes.object).isRequired,
  productCountControl: PropTypes.shape({}).isRequired,
  cartTotal: PropTypes.number.isRequired,
};

export default ShoppingCart;
