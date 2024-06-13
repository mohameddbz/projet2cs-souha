import React from 'react';
import './ExplorerFab.css'; // Assurez-vous que le chemin est correct
import im1 from '../../assets/dfd.jpg';
import im2 from '../../assets/im1.jpeg';
import im3 from '../../assets/im2.jpeg';
import im4 from '../../assets/im3.jpeg';
import im5 from '../../assets/pok.jpg';
import im6 from '../../assets/quas.jpg';
import im7 from '../../assets/prog.png';

const fakeData = [
    {
        id: 1,
        name: 'Arduino ABX00092',
        available: true,
        category: 'Microcontrôleurs',
        stock: 15,
        image: im1,
    },
    {
        id: 2,
        name: 'Raspberry Pi 4',
        available: false,
        category: 'Encodeurs',
        stock: 0,
        image: im2,
    },
    {
        id: 3,
        name: 'Raspberry Pi 5',
        available: false,
        category: 'Transistor',
        stock: 0,
        image: im3,
    },
    {
        id: 4,
        name: 'Raspberry Pi 6',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im4,
    },
    {
        id: 5,
        name: 'Raspberry Pi 7',
        available: false,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im5,
    },
    {
        id: 6,
        name: 'Raspberry Pi 8',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im6,
    },
    {
        id: 7,
        name: 'Raspberry Pi 9',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im7,
    },
    {
        id: 8,
        name: 'Raspberry Pi 10',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im1,
    },
    {
        id: 9,
        name: 'Arduino ABX0009211',
        available: true,
        category: 'Microcontrôleurs',
        stock: 15,
        image: im2,
    },
    {
        id: 10,
        name: 'Raspberry Pi 12',
        available: false,
        category: 'Encodeurs',
        stock: 0,
        image: im3,
    },
    {
        id: 11,
        name: 'Raspberry Pi 13',
        available: false,
        category: 'Transistor',
        stock: 0,
        image: im4,
    },
    {
        id: 12,
        name: 'Raspberry Pi 14',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im5,
    },
    {
        id: 13,
        name: 'Raspberry Pi 15',
        available: false,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im6,
    },
    {
        id: 14,
        name: 'Raspberry Pi 16',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im7,
    },
    {
        id: 15,
        name: 'Raspberry Pi 17',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im1,
    },
    {
        id: 16,
        name: 'Raspberry Pi 18',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im2,
    },
];

function getRandomItems(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function ExplorationSection() {
    const randomItems = getRandomItems(fakeData, 4); // Obtenir 4 éléments aléatoires

    return (
        <div className="exploration-section">
            <div className="header-with-button">
                <h1>Explorer le matériel</h1>
                <button onClick={() => window.location.href = '/all-materials'}>Voir tous</button>
            </div>
            <div className="item-container">
                {randomItems.map((item) => (
                    <div className="item-box" key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <div className="item-info">
                            <p className="item-name">{item.name}</p>
                            <p className="item-category">{item.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExplorationSection;
