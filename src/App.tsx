import { useState } from "react";
import Modal from "./components/Modal";
import PokemonList from "./components/PokemonList";

function App() {
  const list = [
    "Pikachu",
    "Charizard",
    "Bulbasaur",
    "Jigglypuff",
    "Snorlax",
    "Gyarados",
    "Eevee",
    "Vaporeon",
    "Mewtwo",
    "Meowth",
    "Machamp",
    "Gengar",
    "Blastoise",
    "Psyduck",
    "Alakazam",
    "Dragonite",
    "Arcanine",
    "Squirtle",
    "Lapras",
    "Ditto",
  ];

  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(-1);
  return (
    <div className="container">
      <h1 className="p-2 mt-2 text-center">Pokemon List</h1>
      <Modal
        list={list}
        selectedPokemonIndex={selectedPokemonIndex}
        setSelectedPokemonIndex={(index: number) =>
          setSelectedPokemonIndex(index)
        }
      />
      <PokemonList
        list={list}
        selectedPokemonIndex={selectedPokemonIndex}
        setSelectedPokemonIndex={(index: number) =>
          setSelectedPokemonIndex(index)
        }
      />
    </div>
  );
}

export default App;
