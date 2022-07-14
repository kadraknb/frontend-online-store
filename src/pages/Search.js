import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';

const styleLi = {
  backgroundColor: 'rgb(200, 0, 0)',
};

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      queryInput: '',
      categoryId: '',
      productsList: [],
      alreadyFetched: false,
    };
  }

  fetchProducts = async () => {
    const { queryInput, categoryId } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(categoryId, queryInput);
    this.setState({
      productsList: results,
      alreadyFetched: true,
    });
  }

  onQueryButtonClick = (event) => {
    event.preventDefault();
    this.fetchProducts();
  }

  onChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  onCategorySelect = (categoryId) => {
    this.setState({ categoryId }, this.fetchProducts);
  }

  renderProductList = () => {
    const {
      productsList,
      alreadyFetched,
    } = this.state;
    const {
      onAddProductToCart,
      freeShippingSale,
    } = this.props;
    if (productsList.length) {
      return (
        <ul>
          { productsList.map((product) => {
            const { id, title, price, thumbnail } = product;
            return (
              <li key={ id } data-testid="product" style={ styleLi }>
                <Link to={ `/productDetails/${id}` } data-testid="product-detail-link">
                  <p>{ title }</p>
                  <p>{ price }</p>
                  <img src={ thumbnail } alt={ title } />
                  { freeShippingSale(product) }
                </Link>
                <button
                  type="button"
                  onClick={ () => onAddProductToCart(product) }
                  data-testid="product-add-to-cart"
                >
                  Adicionar ao carrinho
                </button>
              </li>
            );
          }) }
        </ul>
      );
    }
    if (alreadyFetched) {
      return (<p>Nenhum produto foi encontrado</p>);
    }
  }

  render() {
    const {
      queryInput,
    } = this.state;
    const {
      shoppingCartButton,
      isLoading,
    } = this.props;
    return (
      <>
        <Categories
          onCategorySelect={ this.onCategorySelect }
        />
        <hr />
        { shoppingCartButton() }
        <h4 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h4>
        <form>
          <input
            type="text"
            name="queryInput"
            onChange={ this.onChangeInput }
            value={ queryInput }
            data-testid="query-input"
          />
          <button
            type="submit"
            data-testid="query-button"
            onClick={ this.onQueryButtonClick }
          >
            Buscar
          </button>
        </form>
        { !isLoading ? (
          this.renderProductList()
        ) : (
          <p>Carregando...</p>
        ) }
      </>
    );
  }
}

Search.propTypes = {
  onAddProductToCart: PropTypes.func.isRequired,
  shoppingCartButton: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  freeShippingSale: PropTypes.func.isRequired,
};

export default Search;
