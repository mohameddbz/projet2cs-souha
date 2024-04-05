import React from 'react';
import backgroundImage from '../assets/pok.jpg'; // Assurez-vous que le chemin vers l'image est correct

function Pentagon() {
    return (
      <div
        className="w-16 h-16 bg-blue-500"
        style={{
          clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"
        }}
      />
    );
  }
  
  function FabLabHeader() {
    // Utilisez le composant Pentagon à l'intérieur de votre composant principal
    return (
        <div className=" h-screen text-white">
        {/* Utilisez l'image importée comme arrière-plan */}
        <div className="bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="bg-black bg-opacity-50 flex flex-col justify-center items-center h-full">
            <h1 className="text-4xl font-bold mb-4">ESI FABLAB</h1>
            <div className="flex justify-center items-center space-x-4">
        <div className="flex justify-center items-center space-x-4">
          <Pentagon />
          <Pentagon />
          <Pentagon />
        </div>
      </div>
      </div> 
      </div>
      </div>
    );
  }
  
  export default FabLabHeader;
  