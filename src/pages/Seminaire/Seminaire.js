import { FiSearch } from "react-icons/fi";
import { LuSettings2 } from "react-icons/lu";
import './Seminaire.css'
import { useEffect, useState } from "react";
import axios from "axios";

import { LuMapPin } from "react-icons/lu";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdAccessTimeFilled } from "react-icons/md";
import Navbar from "../../components/navbar/navbar";

import LmcsImage from "../../assets/LMCS.png"





function Seminaire() {

    const [listSeminaire,setListSeminaire]= useState([]);
    
    const fetchSeminaire = async ()=>{

        try {
          const   response  = await axios.get(`${process.env.REACT_APP_API_URL}/publication/seminaire/1`)
          setListSeminaire(response.data);
        } catch (error) {
            
        }
       

    }
     useEffect(()=>{
         
       

        fetchSeminaire()
        
    },[])


    return (
        <div>
            <Navbar/>
            <div className="container-search-bar-components" >
                <img className="lmcs-image" src={LmcsImage} /> 
               
             <div className="front-components">
             <SearchBar/>
             </div>
            </div>


          <div>
        
            {listSeminaire && listSeminaire.map((seminaire) => {
                return(
                    <EventSeminaireComponents visiteur={seminaire.visiteur} image={ `${process.env.REACT_APP_API_URL}${seminaire.image}`} titre={seminaire.titre} lieux={seminaire.lieu} />
                )
            })}
          </div>
        </div>
    )
}   

 function EventSeminaireComponents ({image,titre,visiteur,lieux}) {
          return(
            <div className="container-component" >
              <div className="image-containerr">
               <img className="circular-image"  src={image} alt="Image de visiteur"/>
              </div>
              <div className="text-container">
                   <p className="titreS"  >{titre}</p>
                   <p className="visiteur" >{visiteur}</p>
                   <div className="place-time"> 
                      
                          <div className="icon-text"> 
                           <BsCalendarDateFill color="#EDB600" /> <p>Mardi 10 Mars</p>    
                          </div>
                          <div className="icon-text"> 
                          <LuMapPin  color="#EDB600"/> <p>{lieux}</p> 
                          </div>
                          <div className="icon-text">
                          <MdAccessTimeFilled  color="#EDB600" /> <p>10:10</p> 
                           </div>
                           
                   </div>
                   <br/>
                   <br/>
                   

              </div>
            </div>
          )
 }

function SearchBar(){
    return(
        <div className="container-search-bar">
            <div  className="left-flex">
                <FiSearch  className="search-icon"/>
                <input
                 type="text"
                //  value={searchbarValue}
                //  onChange={handleChangeSearchBar}
                placeholder="Votre recherche ici"
                />
            </div>
            <div className="right-flex">
                  <div>
                            <div className="filter">
                                <LuSettings2 className="filter-icon"/>
                                <div>Filtrer</div>
                            </div>
                  </div>
                  <button className="search-but" >Recherche</button>
                  
            </div>
        </div>
    )
}

 export  default Seminaire ; 