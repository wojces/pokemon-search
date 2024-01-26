import { useEffect, useReducer } from "react";
import PokemonList from "./PokemonList";
import PokemonModal from "./PokemonModal";

function reducer(state, action) {
  switch (action.type) {
    case "fetchPokemonList": {
      return { ...state, pokemonList: action.pokemonData.results };
    }

    case "findSelectedPokemonIndex": {
      return {
        ...state,
        selectedPokemonIndex: action.selectedPokemonIndex,
      };
    }

    case "findSelectedPokemonUrl": {
      return {
        ...state,
        selectedPokemonUrl: action.selectedPokemonUrl,
      };
    }

    case "findSelectedPokemonDetails": {
      return {
        ...state,
        selectedPokemonDetails: action.selectedPokemonDetails,
      };
    }

    case "setModalVisibility": {
      return {
        ...state,
        modalIsVisible: action.modalIsVisible,
      };
    }

    default: {
      return state;
    }
  }
}

const initialState = {
  pokemonList: [],
  selectedPokemonIndex: null,
  selectedPokemonUrl: "",
  selectedPokemonDetails: null,
  modalIsVisible: false,
};

function PokemonContainer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: "fetchPokemonList", pokemonData: data })
      );
  }, []);

  function findSelectedPokemonDetails(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: "findSelectedPokemonDetails",
          selectedPokemonDetails: data,
        })
      );
  }

  function findSelectedPokemonIndex(selectedIndex) {
    dispatch({
      type: "findSelectedPokemonIndex",
      selectedPokemonIndex: selectedIndex,
    });
  }

  function findSelectedPokemonUrl(selectedUrl) {
    dispatch({
      type: "findSelectedPokemonUrl",
      selectedPokemonUrl: selectedUrl,
    });
    findSelectedPokemonDetails(selectedUrl);
  }

  function setModalVisibility(modalVisibility) {
    dispatch({
      type: "setModalVisibility",
      modalIsVisible: modalVisibility,
    });
  }

  return (
    <div className="container">
      <h1 className="p-2 mt-2 text-center">Pokemon List</h1>

      {state.selectedPokemonDetails && (
        <PokemonModal
          pokemonDetails={state.selectedPokemonDetails}
          modalIsVisible={state.modalIsVisible}
          setModalVisibility={setModalVisibility}
        />
      )}

      {state.pokemonList && (
        <PokemonList
          selectedPokemonUrl={findSelectedPokemonUrl}
          pokemonList={state.pokemonList}
          selectedPokemonIndex={findSelectedPokemonIndex}
          modalIsVisible={setModalVisibility}
        />
      )}
    </div>
  );
}

export default PokemonContainer;
