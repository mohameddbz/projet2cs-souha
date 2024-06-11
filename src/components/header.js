import '../pages/Annuaire/Annuaire.css';

function header (){
    return(
        <>
        <h2 className='annuaire-recommended-title'>Annuaire</h2>
        <div className='annuaire-recommended-flex'>
            {/* Ajout d'un événement onClick à chaque lien */}
            <a href="/Annuaire/Administration" className="lien" >Administration</a>
            <a href="/Annuaire/Enseignants" className="lien" >Enseignants</a>
            <a href="/Annuaire/Alumni" className="lien" >Alumni</a>
        </div>
        </>
    )
}
export default header