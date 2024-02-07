import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokemonList from "./PokemonList";
import PokemonModal from "./PokemonModal";
import {
  fetchPokemonList,
  findSelectedPokemonDetails,
} from "../../features/pokemons/pokemonsSlice";

function PokemonContainer() {
  const [modal, setModal] = useState(false);

  const pokemonsList = useSelector((state) => state.pokemons.pokemonList);
  const selectedPokemonDetails = useSelector(
    (state) => state.pokemons.selectedPokemonDetails
  );

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchPokemonList(data.results));
      });
  }, []);

  function findSelDetails(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => dispatch(findSelectedPokemonDetails(data)));
  }

  return (
    <div>
      <h1 className="p-2 mt-2 text-center">Pokemon List</h1>

      {selectedPokemonDetails && (
        <PokemonModal modalIsVisible={modal} setModalVisibility={setModal} />
      )}

      {pokemonsList && (
        <PokemonList
          selectedPokemonUrl={(url) => {
            findSelDetails(url);
          }}
          modalIsVisible={setModal}
        />
      )}
    </div>
  );
}

export default PokemonContainer;
