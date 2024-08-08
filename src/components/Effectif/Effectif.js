// EffectifsComponent.jsx
import React from 'react';
import './Effectif.css';
import { FaUserGraduate, FaUserTie, FaChalkboardTeacher, FaUser } from 'react-icons/fa';

const EffectifsComponent = () => {
    return (
        <div className="effectifs-container">
            <div className="effectifs-title">Nos EFFECTIFS</div>
            <div className="effectifs-line">
                <div className="effectif left" style={{ top: '10%' }}>
                <div className="effectif-text">1206 étudiants en graduation</div>
                    <div className="effectif-icon"> <FaUserGraduate/></div>
                    
                </div>
                <div className="effectif right" style={{ top: '30%' }}>
                    <div className="effectif-icon"><FaUserTie/></div>
                    <div className="effectif-text">134 doctorants</div>
                </div>
                <div className="effectif left" style={{ top: '50%' }}>
                <div className="effectif-text">120 enseignants permanents</div>
                    <div className="effectif-icon"><FaChalkboardTeacher/></div>
                 
                </div>
                <div className="effectif right" style={{ top: '70%' }}>
                    <div className="effectif-icon"><FaUser/></div>
                    <div className="effectif-text">134 doctorants</div>
                </div>
            </div>
        </div>
    );
};

export default EffectifsComponent;
