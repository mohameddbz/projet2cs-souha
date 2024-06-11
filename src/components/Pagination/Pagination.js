import React from 'react'
import './pagination.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft , faChevronRight } from '@fortawesome/free-solid-svg-icons';
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  
    const prePage=(currentPage)=>{
        if (currentPage > 1){
          onPageChange(currentPage-1);
          window.scrollTo(0, 0);
      }
  }
    const afterPage=(currentPage)=>{
      if(currentPage < totalPages.length){
        onPageChange(currentPage+1);
        window.scrollTo(0, 0);

      }
        
    }
  const changePage=(id)=>{
      window.scrollTo(0, 0);
      onPageChange(id);
  }
    return (
        <div className='paginationContainer'>
          <ul className="paginationComponent">
            <li className="page-item" onClick={()=>afterPage(currentPage)}>
            <FontAwesomeIcon icon={faChevronRight} className="faChevron"/>
           </li>
  
          {totalPages.sort((a,b) =>b-a).map((page) => (
             <li
              key={page}
              className={`page-item ${page === currentPage ? 'activePage' : ''}`}
              onClick={() => changePage(page)}
              >
              {page} 
             
            </li>
        
            
          ))}
      
  
          <li className="page-item" onClick={()=>prePage(currentPage)}>
            <FontAwesomeIcon icon={faChevronLeft} className="faChevron"/>
          </li> 
  
      </ul>

        </div>

 
    );
  };

export default Pagination

