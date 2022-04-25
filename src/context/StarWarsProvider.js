import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import planetAPI from '../Service/PlanetAPI';

function StarWarsProvider({ children }) {
  const [data, setData] = useState();
  const [filter, setFilter] = useState({ filterByName: { name: '' } });
  const [filterByNumericValues, setFilterByNumericValues] = useState(
    [],
  );
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);

  async function getPlanet() {
    const planetResponse = await planetAPI();
    setData(planetResponse.results);
  }

  useEffect(() => {
    getPlanet();
  }, []);

  // Requisito .2
  const getFilterByName = ({ target }) => {
    setFilter({ filterByName: { name: target.value } });
  };

  const getColumn = ({ target }) => {
    setFilterColumn(target.value);
  };

  const getComparison = ({ target }) => {
    setFilterComparison(target.value);
  };

  const getValue = ({ target }) => {
    setFilterValue(target.value);
  };

  // Requisito 3
  const getFilterByOption = () => {
    setFilterByNumericValues([...filterByNumericValues,
      { column: filterColumn,
        comparison: filterComparison,
        value: filterValue }]);
  };

  const handleButtonClick = () => {
    // console.log(filterByNumericValues);
    getFilterByOption();
    const { comparison } = filterComparison;
    const { column } = filterColumn;
    const { value } = filterValue;

    if (comparison === 'maior que') {
      return column > value;
    }
    if (comparison === 'menor que') {
      return column < value;
    }
    if (comparison === 'igual a') {
      return column === value;
    }

    // switch (comparison) {
    // case 'maior que':
    //   return setData(data.filter((element) => element[column] > value));
    // case 'menor que':
    //   return setData(data.filter((element) => element[column] < value));
    // case 'igual a':
    //   return setData(data.filter((element) => element[column] === value));
    // default:
    //   break;
    // }
  };

  const contextValue = {
    data,
    getPlanet,
    getFilterByName,
    filter,
    getFilterByOption,
    handleButtonClick,
    getColumn,
    getComparison,
    getValue,
    filterColumn,
    filterComparison,
    filterValue,
    filterByNumericValues,
  };
  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
