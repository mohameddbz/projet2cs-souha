import './App.css';
import AjouterPiece from './pages/Admin/AjouterPiece';
import AddCategory from './pages/Admin/AddCategory';
import PiecesElectronics from './pages/Fablab/PiecesElectronics';
import PiecesPage from './pages/Admin/PiecesPage';
import PieceModal from './pages/Admin/PieceModal';
import CategoriesPage from './pages/Admin/CategoriesPage';
import FablabInscriptionPage from './pages/Admin/FablabInscriptionPage';

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
import Publier from './pages/Admin/Publier';
import Historique from './pages/Admin/Historique';
import Lcsi from './pages/LCSI/Lcsi';

import PublicationPage from './pages/Admin/Publication';
import PublicationAdmin from './pages/Admin/Admin_pub';
import AdminPage from './pages/Admin/Admin';
import HistoriquePage from './pages/Admin/Historique';
import Principal from './pages/Admin/Principal';
import ProfilePage from './pages/Admin/Profile';
import Historique_p from './pages/Admin/Historique_p';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import FabLabPage from './pages/Fablab/PagePres';
import DemandeForm from './pages/Fablab/Demande';
import PieceDetail from './pages/Fablab/DetailsPiece';
import InscriptionForm from './pages/Fablab/Inscription';
import Ebachelier from './pages/Ebachelier/Ebachelier';
import ForumPage from './pages/Ebachelier/Forum';
import Presentation from './pages/Presentation/Presentation';
import Contact from './pages/ContactRelex/Contact';
import Admchercheur from './pages/Admin/Admchercheur'
import ProjetLabo from './pages/Admin/ProjetLabo';
import ProjetsInter from './pages/Lmcs/ProjetsInter'

// import Postgraduation from './Pages/Postgraduation/Postgraduation'
import SuccessStories from './pages/SuccessStories/SuccessStories';
import PublicationDetail from './pages/SuccessStories/PublicationDetail';

  
  
    
// ======= page historique pas integrer les 2 
// ======= page chercheur pas integrer 
// ======= page Publications

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/EventList' element={<Evenements/>}></Route>
        <Route path='/SuccessStories' element={<SuccessStories/>}></Route>
        <Route path="/success-story/:id" element={<PublicationDetail />} />

        <Route path="/Auth" element={<PublicRoute><Authentification /></PublicRoute>} />
        < Route path ="/Annuaire/Administration" element ={<Annuaire/>}/>
        < Route path ="/Annuaire/Enseignants" element={<Enseignants/> }/>
        < Route path ="/Annuaire/Alumni" element ={<Alumni/>}/>
        <Route path='/LCSI' element={<Lcsi/>}></Route>
        <Route path='/Contact' element={<Contact/>}></Route>
        < Route path ="/LMCSProjects" element ={<Projets/>}/>
        < Route path ="/Admin" element ={<PrivateRoute><Principal /></PrivateRoute>}/>
        <Route path="/Admin/publications" allowedRoles={['administrateur']} element={<PrivateRoute><PublicationAdmin /></PrivateRoute>} />
            <Route path="/Publieur/publications" allowedRoles={['editeur']} element={<PrivateRoute><PublicationPage /></PrivateRoute>} />
            <Route path="/Admin/publications_en_attente" allowedRoles={['administrateur']} element={<PrivateRoute><AdminPage /></PrivateRoute>} />
            <Route path="/Admin/profile" allowedRoles={['administrateur']} element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/Admin/historique" allowedRoles={['administrateur']} element={<PrivateRoute><HistoriquePage /></PrivateRoute>} /> 
            <Route path="/Publieur/publier" allowedRoles={['editeur']} element={<PrivateRoute><Publier/></PrivateRoute>} />

            <Route path="/Publieur/profile" allowedRoles={['editeur']} element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/Publieur/historique" allowedRoles={['editeur']} element={<PrivateRoute><HistoriquePage /></PrivateRoute>} />
            Ajoutez d'autres routes ici selon les liens de votre sideba
            < Route path ="/ProjetLabo" element ={<ProjetLabo/>}/>
            < Route path ="/admchercheur" element ={<Admchercheur/>}/>
        < Route path ="/LMCSTeams" element ={<Equipe/>}/>
        < Route path ="/lmcs" element ={<Lmcs/>}/>
        < Route path ="/postraduation" element ={<Post/>}/>
        < Route path ="/chercheur" element ={<Chercheur/>}/>
        < Route path ="/publication" element ={<Publications/>}/>
        < Route path ="/Historique" element ={<Historique/>}/>
        < Route path ="/ProjetsInter" element ={<ProjetsInter/>}/>
        
      
      
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
        <Route path='/FabLab/Accueil' element={<FabLabPage/>}></Route>
        <Route path='/FabLab/Demande_piece' element={<DemandeForm/>}></Route>
        <Route path="/ajouter_piece" element={<AjouterPiece/>}></Route>
        <Route path="/Fablab/pieces" element={<PiecesElectronics/>} />
        <Route path="/ajouter_category" element={<AddCategory/>} />
        <Route path="/Fablab/pieces/:id" element={<PieceDetail />} />
        <Route path="/pieces" exact element={<PiecesPage/>} />

          <Route path="/modifier_piece/:id" element={<PieceModal/>} />
          <Route path='/Fablab/categories' element={<CategoriesPage />} />
          <Route path="/fablab-inscriptions" element={<FablabInscriptionPage/>} />
        <Route path='/FabLab/Inscription' element={<InscriptionForm/>}></Route>
        <Route path='/Ebachelier/Accueil' element={<Ebachelier/>}></Route>
        <Route path='/Ebachelier/Forum' element={<ForumPage/>}></Route>
        <Route path='/Presentation' element={<Presentation/>}></Route>
        




      </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
