import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Header() {
  const { getFilterByName } = useContext(StarWarsContext);
  return (
    <form>
      <input
        data-testid="name-filter"
        onChange={ getFilterByName }
      />
    </form>
  );
}

export default Header;
