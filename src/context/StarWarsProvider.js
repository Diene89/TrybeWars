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
    console.log(filterValue);
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
    const copyData = [...data]
  //  const { comparison } = filterComparison;
  //  const { column } = filterColumn;
  //  const { value } = filterValue;
    console.log(filterColumn);
    if (filterComparison === 'maior que') {
      setData(copyData.filter((element) => Number(element[filterColumn]) > Number(filterValue)))
    }
    if (filterComparison === 'menor que') {
      setData(copyData.filter((element) => Number(element[filterColumn]) < Number(filterValue)))
    }
    if (filterComparison === 'igual a') {
      setData(copyData.filter((element) => Number(element[filterColumn]) === Number(filterValue)))
    }
    document.getElementById("column-filter").childNodes.forEach((element) => element.innerHTML === filterColumn && element.remove())
  }

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
