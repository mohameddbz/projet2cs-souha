import React, { useEffect, useState } from 'react'
import Calendrier from '../calendar/calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import CheckBox from '../checkBox/CheckBox';
import CardEvenement from './CardEvenement';
import Pagination from '../Pagination/Pagination';
import { Items } from './../../../node_modules/framer-motion/dist/cjs/index';

function Evenement (){
    const nbCase = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);
    const [checked3, setChecked3] = React.useState(false);
    const [checked4, setChecked4] = React.useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
    });
    
    useEffect(() => {
      const handleResize = () => {
        const newWidth = window.innerWidth;
        let newItemsPerPage = itemsPerPage;
    
        // Logique pour déterminer le nombre d'éléments par page en fonction de la largeur de la fenêtre
        if (newWidth < 1250 && newWidth >840) {
          newItemsPerPage = 9;
        } else if (newWidth < 840 && newWidth > 700) {
          newItemsPerPage = 6;
        }
    
        // Mise à jour de l'état seulement si nécessaire
        if (newItemsPerPage !== itemsPerPage) {
          setItemsPerPage(newItemsPerPage);
        }
    
        setWindowSize({
          width: newWidth
        });
      };
    
      window.addEventListener('resize', handleResize);
    
      // Nettoyage de l'écouteur d'événement lors du démontage du composant
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [itemsPerPage]); // Ajoutez itemsPerPage comme dépendance pour que useEffect soit appelé lorsque itemsPerPage change
    
  const handleChange1 = () => {
    setChecked1(!checked1);
  };

  const handleChange2 = () => {
    setChecked2(!checked2);
  };
  const handleChange3 = () => {
    setChecked3(!checked3);
  };
  const handleChange4 = () => {
    setChecked4(!checked4);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const donnees = nbCase;
  const totalPages = [];
  for (let i = 1; i <= Math.ceil(donnees.length / itemsPerPage); i++) {
    totalPages.push(i);
  }
  const currentItem = donnees.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='evenementFull-container'>
        <div className='evenementTitre'>Explorer Nos <span className='events-span'>Evénements</span></div>
        <div className='evenementContainer'>
            <div className='evenementSection1'>
                <Calendrier/>
                <div className='SearchEvent'>
                    <input type='text' placeholder='Chercher par un mot clé' className='SearchEventInput'/>
                    <div className='eventSearchIconC'><FontAwesomeIcon icon={faMagnifyingGlass} className='eventSearchIcon'/></div>
                    
                </div>
                <div className='filtrerCategorieEvent'>
                    <div className='filterCategorieEvent'>CATEGORIES</div>
                    <div className='checkBoxDiv'>
                        <CheckBox
                        label="Formations"
                        value={checked1}
                        onChange={handleChange1}
                        />
                    </div>
                    <div className='checkBoxDiv'>
                        <CheckBox
                        label="Sport"
                        value={checked2}
                        onChange={handleChange2}
                        />
                    </div>
                    <div className='checkBoxDiv'>
                        <CheckBox
                        label="Conférences"
                        value={checked3}
                        onChange={handleChange3}
                        />
                    </div>
                    <div className='checkBoxDiv'>
                        <CheckBox
                        label="Culture"
                        value={checked4}
                        onChange={handleChange4}
                        />
                    </div>
                </div>
            </div>
            <div className='evenementSection2'>
                <div className='ES1Part1'>
                {currentItem.map((event, index) => (
                  <CardEvenement key={index} isActive={index < itemsPerPage} />
                ))}
                </div>
              <div style={{direction:"rtl",textAlign:"center",margin:"auto"}}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
        </div>
    </div>
  )
}

export default Evenement