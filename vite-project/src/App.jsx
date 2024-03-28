// App.jsx ou votre composant de page
import React from 'react';
import Nav from './Components/nav';
import Carousel from './Components/Carousel';
import Box from './Components/Box';
import BoxDr from './Components/BoxDr';
import InscriptionForm from './Components/form';
import DemandeForm from './Components/demandeform';
import PieceDetail from './Components/detailspiece';

function App() {
  return (
    <div>
      {/* <Carousel /> */}
      {/* Contenu supplémentaire ici */}
      {/* <section className="min-h-screen p-8" style={{background:'#FDFDFD'}}>
        <h2 className="text-3xl font-bold text-blue-800">Ce que nous offerons...</h2>
        <p className=""></p>
        <div className="lg:ml-0 ml-auto">
        <Box/>
        <BoxDr/>
        <Box/>
        </div>
       
      </section> */}
      {/* <InscriptionForm/> */}
      {/* <DemandeForm/> */}
      <PieceDetail/>

    </div>
  );
}

export default App;
