async function planetAPI() {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const data = await response.json();

  return data;
}

export default planetAPI;
