import React from "react";

function ErrorPopup({ error, onClose }) {
  return (
    <div class="popup error">
      <div class="message">
        <p>{error}</p>
      </div>
      <i class="fa fa-times-circle" aria-hidden="true"></i>
      <div class="action">
        <button onClick={onClose}>Ok</button>
      </div>
    </div>
  );
}

export default ErrorPopup;
