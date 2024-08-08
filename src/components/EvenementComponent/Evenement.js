import React, { useEffect, useState, useCallback } from 'react';
import Calendrier from '../calendar/calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import CheckBox from '../checkBox/CheckBox';
import CardEvenement from './CardEvenement';
import Pagination from '../Pagination/Pagination';
import axios from 'axios';

// Custom Hook for Window Size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Main Component
function Evenement() {
  const [cards, setCards] = useState([]);
  const [checked, setChecked] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [categorie, setCategorie] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  const windowSize = useWindowSize();

  useEffect(() => {
    const determineItemsPerPage = () => {
      if (windowSize.width < 700) return 6;
      if (windowSize.width < 840) return 9;
      return 9;
    };

    setItemsPerPage(determineItemsPerPage());
  }, [windowSize.width]);

  const loadDataCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/allCategories/`, {
        headers: { 'Content-Type': 'application/json' },
      });
      setCategorie(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadDataPublications = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/publication/event_publications`);
      setCards(response.data);
    } catch (err) {
      console.error('Error fetching publications:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDataCategories();
    loadDataPublications();
  }, [loadDataCategories, loadDataPublications]);

  const handleCheckboxChange = (index, categoryId) => {
    setChecked((prev) => ({ ...prev, [index]: !prev[index] }));
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(categoryId)
        ? prevSelectedCategories.filter((id) => id !== categoryId)
        : [...prevSelectedCategories, categoryId]
    );
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

  const totalPages = Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, i) => i + 1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='evenementFull-container'>
      <div className='evenementTitre'>
        Explorer Nos <span className='events-span'>Evénements</span>
      </div>
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
            {categorie.map((categ, index) => (
              <div className='checkBoxDiv' key={categ.id_categorie}>
                <CheckBox
                  id={categ.id_categorie}
                  label={categ.nom}
                  value={checked[index] || false}
                  onChange={() => handleCheckboxChange(index, categ.id_categorie)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='evenementSection2'>
          <div className='ES1Part1'>
            {currentItem.map((pub, index) => (
              <CardEvenement
                key={pub.id} // Use a unique identifier if available
                isActive={index < itemsPerPage}
                Picture={`${process.env.REACT_APP_API_URL}${pub.image}`}
                titre={pub.titre}
                description={pub.description}
                date={pub.date_debut}
              />
            ))}
          </div>
          <div style={{ direction: 'rtl', textAlign: 'center', margin: 'auto' }}>
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
