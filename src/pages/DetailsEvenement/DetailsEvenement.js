import axios from "axios";
import { useEffect, useState } from "react";

import { LuMapPin } from "react-icons/lu";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdAccessTimeFilled } from "react-icons/md";


import './DetailsEvenement.css'
import Navbar from "../../components/navbar/navbar";
function DetailEvenement() {
    const id="25"
    
     const [detailEvenement,setDetailEvenement]= useState([]);

    useEffect(()=>{
          const fetchDetailEvenementById = async () => {

            try {
                 const response = await axios.get(`${process.env.REACT_APP_API_URL}/publication1/${id}/`)
                 if (response.status === 200) {
                       setDetailEvenement(response.data); 
                 }else{
                    console.log("erreur dans la recupuration des detail de l'evenement ")
                 }
            } catch (error) {
                console.log(error);
            }

          }

          fetchDetailEvenementById();

    },[])

    
     function DateEventComponents ({date}) {
        const getDayMonthYearFormatted = (dateString) => {
            const date = new Date(dateString);
            
            const day = date.getDate();
            // 'default' et 'month: 'short'' renvoient déjà le mois en 3 lettres
            const month = date.toLocaleString('default', { month: 'short' }); 
            let formattedMonth = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
             formattedMonth = formattedMonth.endsWith('.')? formattedMonth.slice(0,-1):formattedMonth ;
            const year = date.getFullYear();
        
            return { day, month: formattedMonth, year };
        };

        const localDate = getDayMonthYearFormatted(date)
        
          return (
            <div  className="date-container" >
              <p className="day">{localDate.day}</p>
              <p className="month">{localDate.month}</p>
            </div>
          )

     }  


     function DetailPlaceTimeComponents (){
        return(
            <div className="place-time">
                
              <div className="itemS">
                  <LuMapPin className="icon-compo-map" />
                 <p>
                 L’Ecole Nationale Superieure D’Informatique, Alger , Oued Semar
                 </p>
              </div>

              <div className="itemS">
                  <BsCalendarDateFill className="icon-compo"/>
                 <p>
                 Mardi  06 Mars 2024
                 </p>
              </div>

              <div className="itemS">
                  <MdAccessTimeFilled className="icon-compo"/>
                 <p>
                 A partir de 12 : 30
                 </p>
              </div>

              <div className="itemS">
                 
                 <p>
                    
                 </p>
              </div>

            </div>
        );
     }

   

    return ( 

      <>
  
        <Navbar/>

        <div  className="titleee">
        Explorer Nos  <span>Evénements</span> 
        </div>
        <div className="desktop-div">
              
              
              <div className="detail-event-container">

                {/* je vai deviser ce container en 2 (flex colmun ) , chaqun de ces flex est flex row  */}
                 <div  className="top-flex">
                    <div  className="image-evn-container">
                        <img className="image-event" src={`${process.env.REACT_APP_API_URL}${detailEvenement.image}`} />
                        {/* <FramedPhoto photoSrc={`${process.env.REACT_APP_API_URL}${detailEvenement.image}`} /> */}
                    </div>
                    <div   className="top-right-container">
                       <DateEventComponents date={detailEvenement.date_debut}/>
                      <p className="categorie-event">COMPAGNE DE REBOISEMENT</p>
                      <h1>{detailEvenement.titre}</h1>
                      <br/>
                     <h4> Par : Ecole Nationale Supérieure d’informatique
                     </h4>
                    </div>
                 </div>
                 <div className="bottom-flex">
                   <div className="description-event">
                        <p className="descriptP" >  <span>Description</span> </p>
                        <p className="description-text">
                            {detailEvenement.description}
                        </p>
                   </div>

                   <div className="bottom-right">
                      <DetailPlaceTimeComponents/>
                   </div>
                 </div>
              </div>
        </div>




        <div className="mobile-div">
           <div  className="mobile-image-container">
                <img  className="mobile-image-event" src={`${process.env.REACT_APP_API_URL}${detailEvenement.image}`} alt="image de l'évenement"  /> 
                <div className="mobile-date-event">
                <DateEventComponents date={detailEvenement.date_debut}/>
                </div>

                <div className="mobile-detaile-place-container">
                    <DetailPlaceTimeComponents/>
                </div>
                
           </div>

           <div >
              <p className="categorie-event">
              COMPAGNE DE REBOISEMENT
              </p>
              <h1>{detailEvenement.titre}</h1>
              <h4> Par : Ecole Nationale Supérieure d’informatique
              </h4>
           </div >
            
           <div className="description">
                   <p> {detailEvenement.description}</p>
           </div>

        </div>

        </>
    )
}

export default DetailEvenement