import { useState } from "react";

function PokemonList() {
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
  const [selectedPokemon, setSelectedPokemon] = useState(-1);

  function handleClick(name: string, index: number) {
    return console.log(index + ". " + name);
  }

  const pokemonList = list.map((pokemon, index) => (
    <li
      className={
        selectedPokemon === index ? "list-group-item active" : "list-group-item"
      }
      key={index}
      onClick={() => {
        setSelectedPokemon(index);
        handleClick(pokemon, index);
      }}>
      {pokemon}
    </li>
  ));

  return (
    <>
      <h1>Pokemon List</h1>
      <ul className="list-group">{pokemonList}</ul>
    </>
  );
}

export default PokemonList;
