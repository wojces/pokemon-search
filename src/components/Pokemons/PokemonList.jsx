import ListGroup from "react-bootstrap/ListGroup";

function PokemonList({
  pokemonList,
  selectedPokemonIndex,
  selectedPokemonUrl,
  modalIsVisible,
}) {
  const list = pokemonList.map((pokemon, index) => (
    <ListGroup.Item
      key={index}
      onClick={() => {
        modalIsVisible(true);
        selectedPokemonIndex(index);
        selectedPokemonUrl(pokemon.url);
      }}>
      {pokemon.name}
    </ListGroup.Item>
  ));

  return (
    <>
      <ListGroup as="ol" numbered>
        {list}
      </ListGroup>
    </>
  );
}

export default PokemonList;
