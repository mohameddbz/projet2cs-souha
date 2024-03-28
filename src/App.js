import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Annuaire from './Pages/Annuaire/Annuaire';
import Enseignants from'./Pages/Annuaire/Enseignants'
import Alumni from './Pages/Annuaire/Alumni';
import Projets from './Pages/Lmcs/Projets';
import Equipe from './Pages/Lmcs/Equipe';

function App() {
  return (
    // <Router>
    //  <Routes>
    //   < Route path ="/" element ={<Annuaire/>}/>
    //   < Route path ="Enseignants" element={<Enseignants/> }/>
    //   < Route path ="Alumni" element ={<Alumni/>}/>
    // </Routes>
    // </Router>
    // <Projets/>
    <Equipe/>
  );
}

export default App;
