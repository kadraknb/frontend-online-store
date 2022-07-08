import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Categoria extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fechGetCategories();
  }

  fechGetCategories = async () => {
    const dado = await getCategories();
    this.setState({ categories: dado });
  }

  render() {
    const {
      categories,
    } = this.state;
    const {
      //  categoryId,
      //  onChangeInput,
      //  onQueryButtonClick,
      onCategorySelect,
    } = this.props;
    return (
      <>
        { categories.map((aa) => (
          <label htmlFor={ aa.id } key={ aa.id } data-testid="category">
            <input
              id={ aa.id }
              type="radio"
              name="categoryId"
              value={ aa.name }
              //  onChange={ (event) => onChangeInput(event, aa.id) }
              onClick={ () => {
                console.log('uam string qualquer!');
                onCategorySelect(aa.id);
              } }
            />
            {aa.name}
          </label>
        )) }
      </>
    );
  }
}

Categoria.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
};

export default Categoria;
