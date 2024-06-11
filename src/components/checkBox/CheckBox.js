import React from 'react'
import './checkBox.css'

function CheckBox ({ label, value, onChange }) {
    return (
      <label className='chechBoxLabel'>
        <input type="checkbox" checked={value} onChange={onChange} className='checkbox'/>
        {label}
      </label>
    );
  };

export default CheckBox