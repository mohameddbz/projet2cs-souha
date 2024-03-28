import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import image1 from '../assets/dfd.jpg';
import image2 from '../assets/quas.jpg';
import image3 from '../assets/pok.jpg';

function PieceDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const piece = {
    nom: "Arduino ABX00092",
    statut: "Disponible",
    categorie: "microcontrôleurs",
    description: "Dans le cadre des efforts menés par l’école pour la lutte contre le changement climatique et la restauration d’un écosystème naturel, l’ESI a organisé une campagne de reboisement hier mardi 05 mars 2024  à 14h00, et ce, en collaboration avec la Direction des forets et la ceinture verte de la wilaya d’Alger, circonscriptions  de Belfort.Cette campagne a vu la participation de toute la communauté de l’école étudiants, enseignants et employés ayant contribué à la  plantation de plus de 200 arbustes dans les différents espaces de l’école.Cette opération de plantation vise également à consacrer la culture environnementale dans la communauté de l’école  et à faire connaitre l’importance de la ceinture verte, tout en inculquant aux participants les bonnes pratiques de plantation et les modalités de préservation des arbustes plantés au regard des changements climatiques.",
    images: [image1, image2, image3],
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Détails sur la pièce</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <button onClick={() => window.history.back()} className="flex items-center text-blue-500 hover:text-blue-700 mb-4">
            <FaArrowLeft className="mr-2" /> Revenir
          </button>
          <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6">
            <div className="md:w-1/2">
              <img src={piece.images[currentImageIndex]} alt={`Piece ${currentImageIndex + 1}`} className="w-full h-auto" />
              <div className="flex justify-center space-x-2 mt-2">
                {piece.images.map((_, index) => (
                  <button
                    key={index}
                    className={`h-3 w-3 rounded-full ${index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                    onClick={() => setCurrentImageIndex(index)}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mt-4 items-start md:mt-0 md:w-1/2">
              <h2 className="text-2xl font-bold mb-2">{piece.nom}</h2>
              <span className={`inline-block px-3 py-1 text-sm font-semibold text-white mb-2 ${piece.statut === "Disponible" ? "bg-green-500" : "bg-red-500"}`}>
                {piece.statut}
              </span>
              <div>
                <h3 className="text-xl mb-2">{piece.categorie}</h3>
                <p>Par: École Nationale Supérieure d'informatique</p>
              </div>
             
            </div>
          </div>
          <div className="my-4 md:w-1/2 sm:w-full">
            <div className=" mb-4 border justify-items-center border-blue-800 rounded-md">
            <h4 className="text-center text-rsm text-blue-800 font-bold">Description</h4>
            </div>
            <p>{piece.description}</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Demander
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PieceDetail;
