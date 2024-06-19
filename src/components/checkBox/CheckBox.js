import React from 'react'
import './checkBox.css'

function CheckBox ({ id ,label, value, onChange  }) {
    return (
      <label className='chechBoxLabel'>
        <input type="checkbox" id={id} checked={value} onChange={onChange} className='checkbox'/>
        {label}
      </label>
    );
  };

export default CheckBox