import React from 'react';
import parcoursImage from '../assets/prog.png'; // Assurez-vous que le chemin d'accès est correct

function Box() {
  return (
    <div className="mx-auto my-8 p-4 shadow-lg rounded-sm overflow-hidden max-w-screen-lg" style={{background:'#FFFFFF'}}>
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 p-4">
          <img src={parcoursImage} alt="Parcours académique" className="rounded-sm shadow-md h-full w-full object-cover" />
        </div>
        <div className="lg:w-1/2 p-4">
          <h2 className="text-2xl font-bold text-black mb-4">Le  Parcours académique</h2>
          <p className="mb-4 text-black">L’École nationale Supérieure d’Informatique forme des ingénieurs d’État en informatique. La scolarité dure cinq ans et est répartie en trois périodes:</p>
          <ul className=" text-black list-disc list-inside mb-4">
            <li>DEUX ANNÉES DE CLASSES PRÉPARATOIRES CP</li>
            <li>UNE ANNÉE DE SOCLE COMMUN AU SECOND CYCLE (SCS):</li>
            <li>DEUX ANNÉES DE SPÉCIALITÉ (4ÈME + 5ÈME ANNÉE):</li>
          </ul>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded shadow " style={{background:'#0061B1'}}>
            Savoir Plus
          </button>
        </div>
      </div>
    </div>
  );
}

export default Box;
