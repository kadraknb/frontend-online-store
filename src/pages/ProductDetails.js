import React from 'react';
import PropTypes from 'prop-types';
import { getProductItemByID } from '../services/api';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    this.fetchProductDetails();
  }

  fetchProductDetails = async () => {
    const { match: { params: { ship } } } = this.props;
    const results = await getProductItemByID(ship);
    this.setState({
      product: results,
    });
  }

  render() {
    const { product: { title, price, thumbnail } } = this.state;
    return (
      <div>
        <p data-testid="product-detail-name">{ title }</p>
        <p>{ price }</p>
        <img src={ thumbnail } alt={ title } />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      ship: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
