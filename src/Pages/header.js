import './Alumni/Alumni.css'
import {Link} from "react-router-dom"
function header (){
    return(
        <>
        <h2 className='recommended-title'>Annuaire</h2>
        <div className='recommended-flex'>
            {/* Ajout d'un événement onClick à chaque lien */}
            <a href="/" className="lien" >Administration</a>
            <a href="Enseignants" className="lien" >Enseignants</a>
            <a href="Alumni" className="lien" >Alumni</a>
        </div>
        </>
    )
}
export default header