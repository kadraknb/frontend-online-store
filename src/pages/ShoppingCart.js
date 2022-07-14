import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  render() {
    const {
      productCart,
      productCountControl,
      cartTotal,
      updateProductCart,
      freeShippingSale,
    } = this.props;
    const sub = -1;
    return (
      <div>
        { productCart.length ? (
          <div>
            <ul>
              { productCart.map((product) => {
                const { id, title, price, thumbnail } = product;
                // const control = productCountControl[id].count;
                // const canIncrease = control < product.available_quantity;
                return (
                  <li key={ id }>
                    <p data-testid="shopping-cart-product-name">{ title }</p>
                    <p>{ price }</p>
                    <img src={ thumbnail } alt={ title } />
                    { freeShippingSale(product) }
                    <button
                      type="button"
                      onClick={ () => updateProductCart([product, 0]) }
                    >
                      X
                    </button>
                    <button
                      type="button"
                      onClick={ () => updateProductCart([product, sub]) }
                      data-testid="product-decrease-quantity"
                    >
                      -
                    </button>
                    <span
                      data-testid="shopping-cart-product-quantity"
                    >
                      { productCountControl[id].count }
                    </span>
                    <button
                      type="button"
                      onClick={ () => updateProductCart([product, 1]) }
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
              { cartTotal.cost }
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
  productCart: PropTypes.arrayOf(PropTypes.object).isRequired,
  productCountControl: PropTypes.shape({}).isRequired,
  cartTotal: PropTypes.shape({
    cost: PropTypes.number,
    units: PropTypes.number,
  }).isRequired,
  freeShippingSale: PropTypes.func.isRequired,
};

export default ShoppingCart;
