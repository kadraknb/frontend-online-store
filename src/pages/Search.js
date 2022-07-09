import React from 'react';
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

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  fetchProducts = async () => {
    const { queryInput, categoryId } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(categoryId, queryInput);
    this.setState({
      productsList: results,
      alreadyFetched: true,
    });
  }

  // fetchItemsFromCategory = async (categoryId) => {
  //   console.log(categoryId);
  //   const { results } = await catedoriaId(categoryId);
  //   console.log(results);
  //   this.setState({
  //     listaItens: results,
  //     alreadyFetched: true,
  //   });
  // }

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
    // this.fetchProductssFromCategory(categoryId);
  }

  onAddItemToCart = (id) => {
    const newCartItems = [id];
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      const storedCartItems = JSON.parse(cartItems);
      newCartItems.push(...storedCartItems);
    }
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  }

  returnProductsList = (alreadyFetched, productsList, onAddItemToCart) => {
    if (productsList.length) {
      return (
        <ul>
          { productsList.map(({ id, title, price, thumbnail }) => (
            <li key={ id } data-testid="product" style={ styleLi }>
              <Link to={ `/productDetails/${id}` } data-testid="product-detail-link">
                <p>{ title }</p>
                <p>{ price }</p>
                <img src={ thumbnail } alt={ title } />
              </Link>
              <button
                type="button"
                onClick={ () => onAddItemToCart(id) }
                data-testid="product-add-to-cart"
              >
                Adicionar ao carrinho
              </button>
            </li>
          )) }
        </ul>
      );
    }
    if (alreadyFetched) {
      return (<p>Nenhum produto foi encontrado</p>);
    }
  }

  render() {
    const { productsList, queryInput, alreadyFetched } = this.state;
    return (
      <>
        <Categories
          onCategorySelect={ this.onCategorySelect }
        />
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
        { alreadyFetched ? (
          this.returnProductsList(alreadyFetched, productsList, this.onAddItemToCart)
        ) : (
          <h4 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h4>
        ) }
      </>
    );
  }
}

export default Search;
