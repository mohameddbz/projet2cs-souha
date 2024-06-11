import './App.css';
import Annuaire from './pages/Annuaire/Annuaire';
import Enseignants from'./pages/Annuaire/Enseignants'
import Alumni from './pages/Annuaire/Alumni';
import Projets from './pages/Lmcs/Projets';
import Equipe from './pages/Lmcs/Equipe';
// import Historique from './pages/Admin/Historique'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import Evenements from './pages/EventsPage/Evenements';
import Authentification from './pages/Authentification/Authentification';
import Clubs from './pages/Clubs/Clubs';

import AvantPromo from './pages/AvantPromo/index'
import CatalogueFormation from './pages/CatalogueFormations/index'
import DemandeDevis from './pages/DemandeDevis/index'
import DemandeEnregistree from './pages/DemandeDevis/DemandeEnreg'
import DF from './pages/DF/index'
import DemandePartenariatFinale from './pages/DemandePartenariatFinale/DemandePartenariatFinale';
import DetailsClubsFinale from './pages/DetailsClubsFinale/DetailsClubsFinale';
import ClubsFinal from './pages/ClubsFinal/ClubsFinal';
import EsiFinal from './pages/EsiFinal/EsiFinal';
import Lmcs from './pages/Lmcs/Lmcs'
import Post from './pages/Postgraduation/Post';
import Chercheur from './pages/Chercheur/Chercheur';
import Publication from './pages/Chercheur/Publications'
import Publications from './pages/Chercheur/Publications';
import Admin2 from './pages/Admin/Publier';
import Historique from './pages/Admin/Historique';
import Lcsi from './pages/LCSI/Lcsi';

import PublicationPage from './pages/Admin/Publication';
import AdminPage from './pages/Admin/Admin';
import HistoriquePage from './pages/Admin/Historique';
import Principal from './pages/Admin/Principal';
import ProfilePage from './pages/Admin/Profile';
import Historique_p from './pages/Admin/Historique_p';



// import Postgraduation from './Pages/Postgraduation/Postgraduation'


  
  
    
// =======

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/EventList' element={<Evenements/>}></Route>
        <Route path='/Auth' element={<Authentification/>}></Route>
        < Route path ="/Annuaire/Administration" element ={<Annuaire/>}/>
        < Route path ="/Annuaire/Enseignants" element={<Enseignants/> }/>
        < Route path ="/Annuaire/Alumni" element ={<Alumni/>}/>
        <Route path='/LCSI' element={<Lcsi/>}></Route>
        < Route path ="/LMCSProjects" element ={<Projets/>}/>
        < Route path ="/Admin" element ={<Principal/>}/>
        <Route path="/Admin/dashboard" element={<Historique_p />} />
            <Route path="/Admin/publications" element={<PublicationPage />} />
            <Route path="/Admin/publier" element={<Admin2 />} />
            <Route path="/Admin/publications_en_attente" element={<AdminPage />} />
            <Route path="/Admin/profile" element={<ProfilePage />} />
            <Route path="/demande_suppression" element={<ProfilePage />} />
            <Route path="/Admin/historique" element={<HistoriquePage />} />
            Ajoutez d'autres routes ici selon les liens de votre sidebar
       

        < Route path ="/LMCSTeams" element ={<Equipe/>}/>
        < Route path ="/lmcs" element ={<Lmcs/>}/>
        < Route path ="/postraduation" element ={<Post/>}/>
        < Route path ="/chercheur" element ={<Chercheur/>}/>
        < Route path ="/publication" element ={<Publications/>}/>
        < Route path ="/Historique" element ={<Historique/>}/>
      
      
        < Route path ="/AvantPromo" element ={<AvantPromo/>}/>
        < Route path ="/CatalogueFormation" element ={<CatalogueFormation/>}/>
        < Route path ="/DemandeDevis" element ={<DemandeDevis/>}/>
        < Route path ="/DemandeEnregistree" element ={<DemandeEnregistree/>}/>
        < Route path ="/DetailsFormation" element ={<DF/>}/>
        < Route path ="/DemandePartenariatFinale" element ={<DemandePartenariatFinale/>}/>
        < Route path ="/DetailsClubsFinale" element ={<DetailsClubsFinale/>}/>
        <Route path='/Clubs' element={<Clubs/>}></Route>
        < Route path ="/ClubsFinal" element ={<ClubsFinal/>}/>
        <Route path='/EsiFinal' element={<EsiFinal/>}></Route>
        




      </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
