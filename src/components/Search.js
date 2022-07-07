import React from 'react';
import Categoria from '../services/category';

class Search extends React.Component {
  render() {
    return (
      <h4
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
        <Categoria />
      </h4>
    );
  }
}

export default Search;
