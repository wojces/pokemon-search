interface Props {
  list: string[];
  selectedPokemonIndex: number;
  setSelectedPokemonIndex: (index: number) => void;
}

function PokemonList({
  list,
  selectedPokemonIndex,
  setSelectedPokemonIndex,
}: Props) {
  const pokemonList = list.map((pokemon, index) => (
    <li
      className={
        selectedPokemonIndex === index
          ? "list-group-item active"
          : "list-group-item"
      }
      key={index}
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
      onClick={() => {
        setSelectedPokemonIndex(index);
      }}>
      {pokemon}
    </li>
  ));

  return (
    <>
      <ul className="list-group">{pokemonList}</ul>
    </>
  );
}

export default PokemonList;
