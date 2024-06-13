import React from 'react';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';
import "../../pages/Fablab/Pagepieces.css";

function CustomCheckbox({ label, checked, onChange, id }) {
  return (
    <div className="category-label" onClick={() => onChange(!checked)}>
      <input
        type="checkbox"
        id={id}
        className="category-checkbox"
        checked={checked}
        onChange={() => {}} // Noop pour le vrai input, contrôle est géré par onClick sur le div parent
        style={{ display: 'none' }} // Masquer le vrai checkbox
      />
      <div className="checkbox-custom">
        {checked ? (
          <FaCheckSquare className="checkbox-icon checked" />
        ) : (
          <FaSquare className="checkbox-icon" />
        )}
      </div>
      <span className="checkbox-text">{label}</span>
    </div>
  );
}

export default CustomCheckbox;
