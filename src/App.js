import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Annuaire from './Pages/Annuaire/Annuaire';
import Enseignants from'./Pages/Annuaire/Enseignants'
import Alumni from './Pages/Annuaire/Alumni';

function App() {
  return (
    <Router>
     <Routes>
      < Route path ="/" element ={<Annuaire/>}/>
      < Route path ="Enseignants" element={<Enseignants/> }/>
      < Route path ="Alumni" element ={<Alumni/>}/>
    </Routes>
    </Router>
  );
}

export default App;
