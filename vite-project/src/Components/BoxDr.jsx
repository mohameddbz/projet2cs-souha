import React from 'react';
import parcoursImage from '../assets/prog.png'; // Assurez-vous que le chemin d'accès est correct

function BoxDr() {
  return (
    <div className="mx-auto my-8 p-4 bg-white shadow-lg rounded-sm overflow-hidden max-w-screen-lg" style={{background:'#FFFFFF'}}>
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 p-4">
          <h2 className="text-2xl font-bold text-black mb-4">RECHERCHE SCIENTIFIQUE</h2>
          <p className="mb-4 text-black">L’Ecole est habilitée à assurer la formation doctorale. 02 laboratoires de recherche hébergeant 60% des enseignants-chercheurs. Méthodes de Conception de Systèmes (LMCS). Communication dans les systèmes informatiques (LCSI).</p>
          {/* <ul className="list-disc text-white list-inside mb-4">
            <li>Point détail 1</li>
            <li>Point détail 2</li>
            <li>Point détail 3</li>
          </ul> */}
          <button className="bg-yellow-400 hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded shadow" style={{background:'#0061B1'}}>
            Savoir Plus
          </button>
        </div>
        <div className="lg:w-1/2 p-4 h-full w-full object-cover">
          <img src={parcoursImage} alt="Parcours académique" className="rounded-sm shadow-md" />
        </div>
      </div>
    </div>
  );
}

export default BoxDr;
