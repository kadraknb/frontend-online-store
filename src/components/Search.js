import React from 'react';
import Categoria from './category';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nomeBusca: '',
      listaItens: [],
      alreadyFetched: false,
    };
  }

  componentDidMount() {
  }

  fachItem = async () => {
    const { nomeBusca } = this.state;
    const { results } = await getProductsFromCategoryAndQuery('', nomeBusca);
    this.setState({
      listaItens: results,
      alreadyFetched: true,
    });
  }

  onQueryButtonClick = (aa) => {
    aa.preventDefault();
    this.fachItem();
  }

  onChangeInput = ({ target }) => {
    const { value } = target;
    this.setState({ nomeBusca: value });
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
    const { listaItens, nomeBusca, alreadyFetched } = this.state;
    return (
      <>
        <Categoria />
        <form>
          <input
            type="text"
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
