import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import planetAPI from '../Service/PlanetAPI';

function StarWarsProvider({ children }) {
  const [data, setData] = useState();
  const [filter, setFilter] = useState({ filterByName: { name: '' } });

  async function getPlanet() {
    const planetResponse = await planetAPI();
    setData(planetResponse.results);
  }

  useEffect(() => {
    getPlanet();
  }, []);

  const getFilterByName = ({ target }) => {
    setFilter({ filterByName: { name: target.value } });
  };

  const contextValue = {
    data,
    getPlanet,
    getFilterByName,
    filter,
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
