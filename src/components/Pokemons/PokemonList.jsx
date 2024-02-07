import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";

function PokemonList({ selectedPokemonUrl, modalIsVisible }) {
  const pokemonList = useSelector((state) => state.pokemons.pokemonList);

  const list = pokemonList.map((pokemon, index) => (
    <ListGroup.Item
      key={index}
      onClick={() => {
        modalIsVisible(true);
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
