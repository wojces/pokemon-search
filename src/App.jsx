import App2Container from "./components/App2/App2Container";
import PokemonData from "./components/Pokemons/PokemonData";

import { useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "switchView": {
      return {
        ...state,
        currentView: action.view,
      };
    }
    default: {
      return state;
    }
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, { currentView: "App2" });

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <form className="container-fluid justify-content-start">
            <button
              className="btn btn-sm btn-outline-secondary mx-1"
              type="button"
              onClick={() => dispatch({ type: "switchView", view: "Pokemon" })}>
              Pokemon List
            </button>
            <button
              className="btn btn-sm btn-outline-secondary mx-1"
              type="button"
              onClick={() => dispatch({ type: "switchView", view: "App2" })}>
              App 2
            </button>
          </form>
        </nav>
      </header>
      <div className="container-fluid">
        {state.currentView === "Pokemon" && <PokemonData />}
        {state.currentView === "App2" && <App2Container />}
      </div>
      <footer></footer>
    </>
  );
}
