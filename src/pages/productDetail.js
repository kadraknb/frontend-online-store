import React from 'react';
import PropTypes from 'prop-types';
import { getProductId } from '../services/api';

class ProductDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      item: [],
    };
  }

  componentDidMount() {
    this.fetchItem();
  }

  fetchItem = async () => {
    const { match } = this.props;
    const { ship } = match.params;
    console.log(match);
    const results = await getProductId(ship);
    console.log(results);
    this.setState({
      item: results,
    });
  }

  render() {
    const { item } = this.state;
    return (
      <>
        <p data-testid="product-detail-name">{item.title}</p>
        <p>{item.price}</p>
        <img src={ item.thumbnail } alt={ item.title } />
      </>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      ship: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ProductDetail;
