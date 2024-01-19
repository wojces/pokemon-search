interface Props {
  list: string[];
  selectedPokemonIndex: number;
  setSelectedPokemonIndex: (index: number) => void;
}

function Modal({ list, selectedPokemonIndex, setSelectedPokemonIndex }: Props) {
  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                {list[selectedPokemonIndex]}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setSelectedPokemonIndex(-1);
                }}></button>
            </div>
            <div className="modal-body">
              {list[selectedPokemonIndex] + " selected pokemon description"}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setSelectedPokemonIndex(-1);
                }}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
