import React, { useState } from 'react';
import './Charte.css'; // Assurez-vous que le chemin est correct pour votre fichier CSS

const AccordionSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="accordion-section">
            <button className="accordion-title" onClick={() => setIsOpen(!isOpen)}>
                {title}
                <span className={isOpen ? 'arrow up' : 'arrow down'}></span>
            </button>
            {isOpen && <div className="accordion-content">{children}</div>}
        </div>
    );
};

const Accordion = ({ data = [] }) => {
    return (
        <div className="accordion-container">
            <h1 className=''> Explorez la charte du FabLab !</h1>
            {data.map(item => (
                <AccordionSection key={item.id} title={item.name}>
                    {item.details}
                </AccordionSection>
            ))}
        </div>
    );
};

export default Accordion;
