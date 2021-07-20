import React from "react";

function Modal(props) {
  let { handler } = props;
  return (
    <div className="modal">
      <div className="modalContent">
        <h2>Oops you lost. Please start over</h2>
        <button className="StartAgainBtn" onClick={handler}>
          Click here
        </button>
      </div>
    </div>
  );
}

export default Modal;
