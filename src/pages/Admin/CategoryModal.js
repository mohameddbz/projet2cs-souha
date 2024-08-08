import React, { useState } from 'react';
import './CategoryModal.css';

function CategoryModal({ category, onClose, onSave }) {
    const [name, setName] = useState(category.name);

    const handleSave = () => {
        onSave({ ...category, name });
    };

    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <h2>Edit Category</h2>
                <label>
                    Name:
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default CategoryModal;