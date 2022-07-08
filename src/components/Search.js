import React from 'react';
import Categoria from './category';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nomeBusca: '',
      categoryId: '',
      listaItens: [],
      alreadyFetched: false,
    };
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  fetchItem = async () => {
    const { nomeBusca, categoryId } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(categoryId, nomeBusca);
    this.setState({
      listaItens: results,
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
    this.fetchItem();
  }

  onChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  onCategorySelect = (categoryId) => {
    console.log('entrei');
    this.setState({ categoryId }, () => this.fetchItem(categoryId));
    // this.fetchItemsFromCategory(categoryId);
  }

  returnItensList = (alreadyFetched, listaItens) => {
    if (listaItens.length) {
      return (
        <ul>
          {listaItens.map((aa) => (
            <li key={ aa.id } data-testid="product">
              <p>{aa.title}</p>
              <p>{aa.price}</p>
              <img src={ aa.thumbnail } alt={ aa.title } />
            </li>
          ))}
        </ul>
      );
    }
    if (alreadyFetched) {
      return (<p>Nenhum produto foi encontrado</p>);
    }
  }

  render() {
    const { listaItens, nomeBusca, alreadyFetched, categoryId } = this.state;
    return (
      <>
        <Categoria
          categoryId={ categoryId }
          onChangeInput={ this.onChangeInput }
          onCategorySelect={ this.onCategorySelect }
        />
        <form>
          <input
            type="text"
            name="nomeBusca"
            onChange={ (aa) => this.onChangeInput(aa) }
            value={ nomeBusca }
            data-testid="query-input"
          />
          <button
            type="submit"
            data-testid="query-button"
            onClick={ (aa) => this.onQueryButtonClick(aa) }
          >
            Buscar
          </button>
        </form>
        {alreadyFetched ? (
          this.returnItensList(alreadyFetched, listaItens)
        ) : (
          <h4 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h4>
        )}
      </>
    );
  }
}

export default Search;
