import React, { useEffect, useState } from 'react';
import Calendrier from '../calendar/calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import CheckBox from '../checkBox/CheckBox';
import CardEvenement from './CardEvenement';
import Pagination from '../Pagination/Pagination';
import axios from 'axios';

function Evenement() {
  const [cards, setCards] = useState([]);
  const [checked, setChecked] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });
  const [categorie, setCategorie] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  useEffect(() => {
    loadDataCategories();
    loadDataPublications();
  }, []);

  const loadDataCategories = () => {
    axios.get('http://localhost:8000/allCategories/', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res.data);
        setCategorie(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(true);
        setLoading(false);
      });
  };

  const loadDataPublications = () => {
    axios.get('http://localhost:8000/publication/event_publications', {
    })
      .then(res => {
        setCards(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      let newItemsPerPage = itemsPerPage;

      if (newWidth < 1250 && newWidth > 840) {
        newItemsPerPage = 9;
      } else if (newWidth < 840 && newWidth > 700) {
        newItemsPerPage = 6;
      }

      if (newItemsPerPage !== itemsPerPage) {
        setItemsPerPage(newItemsPerPage);
      }

      setWindowSize({
        width: newWidth
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [itemsPerPage]);

  const handleCheckboxChange = (index, categoryId) => {
    console.log(categoryId)
    setChecked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));

    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryId)) {
        return prevSelectedCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevSelectedCategories, categoryId];
      }
    });
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredItems = cards.filter((card) => {
    const matchesSearchTerm = card.titre.toLowerCase().includes(searchTerm.toLowerCase()) || card.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(card.categorie);
    const matchesDateRange = (!dateRange.startDate || new Date(card.date_debut) >= new Date(dateRange.startDate)) && 
                              (!dateRange.endDate || new Date(card.date_debut) <= new Date(dateRange.endDate));
    return matchesSearchTerm && matchesCategory && matchesDateRange;
  });

  const currentItem = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = [];
  for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
    totalPages.push(i);
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='evenementFull-container'>
      <div className='evenementTitre'>Explorer Nos <span className='events-span'>Evénements</span></div>
      <div className='evenementContainer'>
        <div className='evenementSection1'>
          <Calendrier onDateRangeChange={handleDateRangeChange} />
          <div className='SearchEvent'>
            <input
              type='text'
              placeholder='Chercher par un mot clé'
              className='SearchEventInput'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='eventSearchIconC'>
              <FontAwesomeIcon icon={faMagnifyingGlass} className='eventSearchIcon' />
            </div>
          </div>
          <div className='filtrerCategorieEvent'>
            <div className='filterCategorieEvent'>CATEGORIES</div>
            {
              categorie.map((categ, index) => (
                <div className='checkBoxDiv' key={index}>
                  <CheckBox
                    id={categ.id_categorie}
                    label={categ.nom}
                    value={checked[index] || false}
                    onChange={() => handleCheckboxChange(index, categ.id_categorie)}
                  />
                </div>
              ))
            }
          </div>
        </div>
        <div className='evenementSection2'>
          <div className='ES1Part1'>
            {currentItem.map((pub, index) => (
              <CardEvenement
                key={index}
                isActive={index < itemsPerPage}
                Picture={`http://localhost:8000${pub.image}`}
                titre={pub.titre}
                description={pub.description}
                date={pub.date_debut}
              />
            ))}
          </div>
          <div style={{ direction: "rtl", textAlign: "center", margin: "auto" }}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Evenement;
