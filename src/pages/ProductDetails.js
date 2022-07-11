import React from 'react';
import PropTypes from 'prop-types';
import { getProductItemByID } from '../services/api';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      email: '',
      score: '1',
      comment: '',
      comments: [],
    };
  }

  componentDidMount() {
    this.fetchProductDetails();
    const storedComments = localStorage.getItem('comments');
    if (storedComments) this.setState({ comments: JSON.parse(storedComments) });
  }

  saveOnStorage = () => {
    const { comments } = this.state;
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  onSubmitForm = (event) => {
    event.preventDefault();
    const {
      email,
      score,
      comment,
      comments,
    } = this.state;
    this.setState({
      email: '',
      score: '1',
      comment: '',
      comments: [...comments, {
        email,
        score,
        comment,
      }],
    }, () => this.saveOnStorage());
  }

  fetchProductDetails = async () => {
    const { match: { params: { ship } } } = this.props;
    const results = await getProductItemByID(ship);
    this.setState({
      product: results,
    });
  }

  onAddProductToCart = (product) => {
    const storedProducts = JSON.parse(localStorage.getItem('productCart'));
    const newCart = storedProducts ? [...storedProducts, product] : [product];
    localStorage.setItem('productCart', JSON.stringify(newCart));
  }

  render() {
    const {
      product: { title, price, thumbnail },
      email,
      score,
      comment,
      comments,
      product,
    } = this.state;
    return (
      <div>
        <div>
          <p data-testid="product-detail-name">{ title }</p>
          <p>{ price }</p>
          <img src={ thumbnail } alt={ title } />
        </div>
        <button
          type="button"
          onClick={ () => this.onAddProductToCart(product) }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
        <form onSubmit={ this.onSubmitForm }>
          <label htmlFor="email">
            E-mail
            <input
              id="email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.onInputChange }
              data-testid="product-detail-email"
            />
          </label>
          <div>
            <label htmlFor="rating-1" data-testid="1-rating">
              <input
                id="rating-1"
                type="radio"
                name="score"
                value="1"
                onChange={ this.onInputChange }
                checked={ score === '1' }
              />
              1
            </label>
            <label htmlFor="rating-2" data-testid="2-rating">
              <input
                id="rating-2"
                type="radio"
                name="score"
                value="2"
                onChange={ this.onInputChange }
                checked={ score === '2' }
              />
              2
            </label>
            <label htmlFor="rating-3" data-testid="3-rating">
              <input
                id="rating-3"
                type="radio"
                name="score"
                value="3"
                onChange={ this.onInputChange }
                checked={ score === '3' }
              />
              3
            </label>
            <label htmlFor="rating-4" data-testid="4-rating">
              <input
                id="rating-4"
                type="radio"
                name="score"
                value="4"
                onChange={ this.onInputChange }
                checked={ score === '4' }
              />
              4
            </label>
            <label htmlFor="rating-5" data-testid="5-rating">
              <input
                id="rating-5"
                type="radio"
                name="score"
                value="5"
                onChange={ this.onInputChange }
                checked={ score === '5' }
              />
              5
            </label>
          </div>
          <label htmlFor="comment">
            Comentário
            <textarea
              id="comment"
              name="comment"
              placeholder="Digite seu comentário"
              onChange={ this.onInputChange }
              value={ comment }
              data-testid="product-detail-evaluation"
            />
          </label>
          <button
            type="submit"
            data-testid="submit-review-btn"
          >
            Comentar
          </button>
        </form>
        <div>
          <h4>Comentários</h4>
          <ul>
            { comments.map((post) => (
              <li key={ post.email }>
                <p>{ post.email }</p>
                <p>{ post.score }</p>
                <p>{ post.comment }</p>
              </li>
            )) }
          </ul>
        </div>
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
