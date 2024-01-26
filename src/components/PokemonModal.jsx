import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function PokemonModal({ modalIsVisible, setModalVisibility, pokemonDetails }) {
  const statsList = pokemonDetails.stats.map((stat) => (
    <li key={stat.stat.name}>{stat.stat.name + ": " + stat.base_stat}</li>
  ));

  return (
    <>
      <Modal show={modalIsVisible} onHide={() => setModalVisibility(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{pokemonDetails.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>{"Height: " + pokemonDetails.height}</span>
          <br />
          <span>{"Weight: " + pokemonDetails.weight}</span>
          <br />
          <span>{"Base exp: " + pokemonDetails.base_experience}</span>
          <br />
          <span>
            {"Stats: "} <ul>{statsList}</ul>
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalVisibility(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PokemonModal;
