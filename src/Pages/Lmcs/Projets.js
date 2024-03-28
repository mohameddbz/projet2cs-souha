import {React, useState} from 'react'
import './Projets.css'
import cardData from '../../db/Projets.json'
import { FcNext, FcPrevious } from "react-icons/fc"; 
import { GrLinkNext } from "react-icons/gr";
import {IoMdSearch} from "react-icons/io"
import{IoIosArrowDown} from "react-icons/io"
import { RxDividerVertical } from "react-icons/rx";

const pageSize = 5; 
function Projets() {
  
  const handleThemeSelect = (selectedTheme) => {
  setTheme(selectedTheme);
  setShowThemeMenu(false); // Masquer la liste déroulante des thèmes après la sélection
};

const handleAnneeSelect = (selectedAnnee) => {
  setAnnee(selectedAnnee);
  setShowAnneeMenu(false); // Masquer la liste déroulante des années après la sélection
};

  
  const [showMenu, setShowMenu] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [recherche, setRecherche] = useState('');
  const [cards, setCards] = useState(cardData);
  const [theme, setTheme] = useState('');
  const [annee, setAnnee] = useState('');
  const [currentPage, setCurrentPage] = useState(0); 
  const [expandedIndex, setExpandedIndex]=useState(null)
  
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showAnneeMenu, setShowAnneeMenu] = useState(false);
  
  // Fonctions pour basculer l'affichage des listes déroulantes des thèmes et des années
  const toggleThemeMenu = () => {
    setShowThemeMenu(!showThemeMenu);
  };
  
  const toggleAnneeMenu = () => {
    setShowAnneeMenu(!showAnneeMenu);
  };
  
// Fonction pour gérer la sélection de l'année

  const toggleMenu = () => {
      setShowMenu(!showMenu); 
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (selectedTheme) => {
    console.log(selectedTheme)
    setTheme(selectedTheme);
    setShowMenu(!showMenu); 
    ;
  };
    const handleChange = (event) => {
      setRecherche(event.target.value);
    };
  
    const handleSubmit = (event) => {
        event.preventDefault();
       
      };
    const Réinitialiser =(e)=>{
      e.preventDefault();
      setTheme('')
      setAnnee('');
    }  
    const handleExpand = (index) => {
      setExpandedIndex(index===expandedIndex? null:index);
    };
  const totalPages = Math.ceil(cardData.length / pageSize); 
  const getCurrentPageCards = () => {
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
 
  return cardData.slice(startIndex, endIndex);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <div className='page-container'>
     <div className='hero-container'>
    <RxDividerVertical className='first-icon'/>
      <div className='hero-title'>
      <h1>Les projets</h1>
      </div>
    </div>
  
      <div className='description-container'>
      
        <h2 className='description'>133 Projets</h2>
      </div> 
  
      <div className='semi-title'>
        <a href="/" className="lien">Projets nationaux</a>
        <a href="Enseignants" className="lien" >Projets Internationaux</a>
      </div>
  
    <div className='recherche-container'>
      <div className='recherche-bar'>
      <input  className='rech' type="text"value={recherche} 
            onChange={(e)=>setRecherche(e.target.value)} placeholder="Rechercher par un mot clé" />
      <IoMdSearch color='white' size={25} style={{ position: 'relative', top: '12', right: '20' }} />
      </div>
      
      <div className="filtres">
        <button  className="custom-button">Filtrer</button>
        <button onClick={Réinitialiser}>Réinitialiser</button>
      </div>
 
      <div className='filtres'>
  <span className=''>Thèmes</span>
  <IoIosArrowDown color='black' size={25} style={{ position: 'relative', left: '160', cursor: 'pointer' }} onClick={toggleThemeMenu}/>
  {showThemeMenu && (
    <ul className="options-list">
      <li onClick={() => handleThemeSelect('systeme-informations')}>Système d'informations</li>
      <li onClick={() => handleThemeSelect('data-science')}>Data Science</li>
      <li onClick={() => handleThemeSelect('intelligence-artificielle')}>Intelligence artificielle</li>
    </ul> 
  )}
  <span style={{ right: `100px` }}>{theme}</span>
</div>

<div className='filtres'>
  <span className=''>Année</span>
  <IoIosArrowDown color='black' size={25} style={{ position: 'relative', left: '168', cursor: 'pointer' }} onClick={toggleAnneeMenu}/>
  {showAnneeMenu && (
    <ul className="options-list">
      <li onClick={() => handleAnneeSelect('2020')}>2020</li>
      <li onClick={() => handleAnneeSelect('2021')}>2021</li>
      <li onClick={() => handleAnneeSelect('2022')}>2022</li>
      <li onClick={() => handleAnneeSelect('2023')}>2023</li>
      {/* Ajoutez d'autres années si nécessaire */}
    </ul> 
  )}
  <span style={{ right: `100px` }}>{annee}</span>
</div>
      
      
    </div>
  
          
  <div className='projet-container'>
      {getCurrentPageCards().map((projets, index) => (
        <div key={index} className='projet'>
          <div className='projet-title'>
            <h3 className='p-title'>
              {projets.titre}
              <GrLinkNext style={{ marginLeft: '10px'}} 
                onClick={()=>handleExpand(index)}
              />
            </h3>
            <section className={`projet-detail${expandedIndex===index? 'expanded':''}`}>
              <span>{projets.description}</span>
            </section>
          </div>
          <hr className='ligne' style={{ marginTop: '20px', marginBottom: '20px' }} /> {/* Ajouter de l'espace au-dessus et en dessous de la ligne */}
        </div>
      ))}
</div>




      
      <div className='pagination'>
        <button onClick={prevPage} disabled={currentPage === 0}><FcPrevious /></button>
        <span>{currentPage + 1} / {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages - 1}><FcNext /></button>
      </div>
    </div>
  );
  
}

export default Projets