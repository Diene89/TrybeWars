import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Header() {
  const { getFilterByName,
    handleButtonClick, getColumn, getComparison, getValue } = useContext(StarWarsContext);
  return (
    <form>
      <input
        data-testid="name-filter"
        onChange={ getFilterByName }
      />

      <select
        data-testid="column-filter"
        name="column"
        onChange={ getColumn }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation period</option>
        <option value="surface_water">surface water</option>
      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ getComparison }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        name="value"
        type="number"
        onChange={ getValue }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleButtonClick }
      >
        Filtrar
      </button>

    </form>
  );
}

export default Header;
