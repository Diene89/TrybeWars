import React from 'react';
import './App.css';
import Header from './Components/Hearder';
import Table from './Components/Table';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <Header />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
