import './App.css';
import AjouterPiece from './pages/Admin/AjouterPiece';
import AddCategory from './pages/Admin/AddCategory';
import PiecesElectronics from './pages/Fablab/PiecesElectronics';
import PiecesPage from './pages/Admin/PiecesPage';
import PieceModal from './pages/Admin/PieceModal';
import CategoriesPage from './pages/Admin/CategoriesPage';
import FablabInscriptionPage from './pages/Admin/FablabInscriptionPage';
import Articles from './pages/Chercheur/Articles';

import Annuaire from './pages/Annuaire/Annuaire';
import Enseignants from'./pages/Annuaire/Enseignants'
import Alumni from './pages/Annuaire/Alumni';
import Projets from './pages/Lmcs/Projets';
import ProjectsLcsi from './pages/LCSI/Lcsiprojets';
import Equipe from './pages/Lmcs/Equipe';
import EquipeLCSI from './pages/LCSI/Lcsieqequipe';
// import Historique from './pages/Admin/Historique'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import Evenements from './pages/EventsPage/Evenements';
import Authentification from './pages/Authentification/Authentification';
import Clubs from './pages/Clubs/Clubs';
import ProfileEdit from './pages/Admin/ProfileEditeur'


// import FormationAvantPromo from './pages/AvantPromo/FormationAvantPromo'

import AvantPromo from './pages/AvantPromo/index'
import CatalogueFormation from './pages/CatalogueFormations/CatalogueFormation'
import DetailFormation from './pages/Formation/DetailFormation'

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
import ChercheurProfile from './pages/Chercheur/ChercheurProfile';
import Publications from './pages/Chercheur/Publications';
import Publier from './pages/Admin/Publier';
import PublierArticle from './pages/Admin/PublierArticle'
import Historique from './pages/Admin/Historique';
import Lcsi from './pages/LCSI/Lcsi';
import ProfileValid from './pages/Admin/ProfileValid'

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
import BachelierAdmin from './pages/BachelierAdmin/BachelierAdmin'
// import Postgraduation from './Pages/Postgraduation/Postgraduation'
import SuccessStories from './pages/SuccessStories/SuccessStories';
import PublicationDetail from './pages/SuccessStories/PublicationDetail';
import ProgrammeFinal from './pages/Programme/ProgrammeFinal';
import AjouterUser from './pages/Admin/AjouterUser';
import ListUser from './pages/Admin/ListeUser';
import Valid from './pages/Admin/Valid';
import PublicationValidateur from './pages/Admin/Validateur_pub'
import PrincipalValidateur from './pages/Admin/PrincipalValid'
import PubStory from './pages/Admin/PubStory'  
import AlumniPublier from './pages/Admin/AlumniPublier'  
import AlumniProfile from './pages/Admin/ProfileAlumni'
import ProfileFablab from './pages/Fablab/ProfileFablab'
import RelexPage from './pages/Relex/relex'
import RelexProfile from './pages/Relex/relexProfil'
import Partenaire from './pages/Relex/partenaire'
import PartenaireDemende from './pages/Relex/partenaireDemende'
import HistoriqueDemende from './pages/Relex/historiqueDemende'
import AjouterPartenaire from './pages/Relex/Ajouter'
import AddFormateur from './pages/Relex/AddFormateur'
import FormateurList from './pages/Relex/FormateurLists'
import AddModule from './pages/Relex/AjouterModule'
import ModuleList from './pages/Relex/ModuleList'
import AjouterFormation from './pages/Relex/AjouterFormation'
import FormationsList from './pages/Relex/formationsList'
import FormationAvantPromo from './pages/AvantPromo/FormationAvantPromo';
import AddChapitre from './pages/Relex/AddChapitre'
import ChapitreList from './pages/Relex/ChapitresList'
import AjouterCour from './pages/Relex/AjouterCour'
import CourList from './pages/Relex/courList'
import AjouterTheme from './pages/Relex/AjouterTheme'
import ThemeList from './pages/Relex/ThemeList'
import DemendeList from './pages/Relex/DemendesList'
import DevisList from './pages/Relex/DevisList'
import EventPage from './pages/Admin/Club_pub'
import ClubEvent from './pages/Admin/Club_create'
import MotPresident from './pages/MotPresident/MotPresident';
import Vision from './pages/VisionMission/Vision';
import Seminaire from './pages/Seminaire/Seminaire';
import DetailEvenement from './pages/DetailsEvenement/DetailsEvenement';
      
// ======= page historique pas integrer les 2 
// ======= page chercheur pas integrer 
// ======= page Publications

// import Postgraduation from './Pages/Postgraduation/Postgraduation'
// import SuccessStories from './pages/SuccessStories/SuccessStories';

import Program from './pages/pgm/Program'
  
  
    
// =======

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
        < Route path ="/LCSIProjects" element ={<ProjectsLcsi/>}/>
        < Route path ="/Admin" allowedRoles={['administrateur']}  element ={<PrivateRoute><Principal /></PrivateRoute>}/>

        < Route path ="/Admin" allowedRoles={['administrateur']} element ={<PrivateRoute><Principal /></PrivateRoute>}/>
        <Route path="/Admin/publications" allowedRoles={['administrateur']} element={<PrivateRoute><PublicationAdmin /></PrivateRoute>} />
            <Route path="/Publieur/publications" allowedRoles={['editeur']} element={<PrivateRoute><PublicationPage /></PrivateRoute>} />
            <Route path="/alumni/publications" allowedRoles={['editeur']} element={<PrivateRoute><PubStory /></PrivateRoute>} />
            <Route path="/Admin/publications_en_attente" allowedRoles={['administrateur']} element={<PrivateRoute><AdminPage /></PrivateRoute>} />
            <Route path="/Admin/profile" allowedRoles={['administrateur']} element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/Admin/historique" allowedRoles={['administrateur']} element={<PrivateRoute><HistoriquePage /></PrivateRoute>} /> 
            <Route path="/Publieur/publier" allowedRoles={['editeur']} element={<PrivateRoute><Publier/></PrivateRoute>} />
            <Route path="/chercheur/publier" allowedRoles={['editeur']} element={<PrivateRoute><PublierArticle/></PrivateRoute>} />

            <Route path="/Publieur/profile" allowedRoles={['editeur']} element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/Publieur/historique" allowedRoles={['editeur']} element={<PrivateRoute><HistoriquePage /></PrivateRoute>} />
            Ajoutez d'autres routes ici selon les liens de votre sideba
        <Route path="/Ebachelier/BachelierAdmin" allowedRoles={['administrateur']} element={<PrivateRoute><BachelierAdmin /></PrivateRoute>} />
        <Route path ="/ProjetLabo" element ={<ProjetLabo/>}/>
        <Route path ="/admchercheur" allowedRoles={['chercheur']} element ={<PrivateRoute><Admchercheur/></PrivateRoute>}/> /* role de this page */
        <Route path ="/LMCSTeams" element ={<Equipe/>}/>
        <Route path ="/LCSITeams" element ={<EquipeLCSI/>}/>
        <Route path ="/lmcs" element ={<Lmcs/>}/>
        <Route path ="/postraduation" element ={<Post/>}/>
        <Route path="/chercheur/:Idchercheur" element={<ChercheurProfile />}>
          <Route path="cv/:publicationId" element={<Chercheur />} />
          <Route path="publication" element={<Publications />} />
        </Route>
        <Route path ="/Historique" element ={<Historique/>}/>
        <Route path ="/ProjetsInter" element ={<ProjetsInter/>}/>
        <Route path="/Admin/Ajouter_user" allowedRoles={['administrateur']} element={<PrivateRoute><AjouterUser /></PrivateRoute>} />
        <Route path="/Admin/Liste_des_utilisateurs" allowedRoles={['administrateur']} element={<PrivateRoute><ListUser /></PrivateRoute>} />   
        {/* < Route path ="/AvantPromo" element ={<AvantPromo/>}/> */}

        < Route path ="/AvantPromo" element ={<FormationAvantPromo/>}/>

        < Route path ="/CatalogueFormation" element ={<CatalogueFormation/>}/>
        < Route path ="/DetailFormation/:id" element ={<DetailFormation/>}/>
        < Route path ="/DemandeDevis" element ={<DemandeDevis/>}/>
        < Route path ="/DemandeEnregistree" element ={<DemandeEnregistree/>}/>
        < Route path ="/DetailsFormation" element ={<DF/>}/>
        < Route path ="/DemandePartenariatFinale" element ={<DemandePartenariatFinale/>}/>
        < Route path ="/DetailsClubsFinale" element ={<DetailsClubsFinale/>}/>
        <Route path='/Clubs' element={<Clubs/>}></Route>
        < Route path ="/ClubsFinal" element ={<ClubsFinal/>}/>
        <Route path='/EsiFinal' element={<EsiFinal/>}></Route>
        <Route path='/FabLab/Accueil' element={<FabLabPage/>}></Route>
        <Route path='/FabLab/Demande_piece/:id' element={<DemandeForm/>}></Route>
        <Route path="/ajouter_piece" element={<AjouterPiece/>}></Route>
        <Route path="/FabLab/piece" element={<PiecesElectronics/>} />
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
        <Route path='/ProgrammeFinal' element={<ProgrammeFinal/>}></Route>


         mohamed verification
        <Route path='/relex/DevisList' element={<DevisList/>} ></Route>
        <Route path='/relex/DemendeList' element={<DemendeList/>} ></Route>
        <Route path='/relex/ThemeList' element={<ThemeList/>} ></Route>
        <Route path='/relex/AjouterTheme' element={<AjouterTheme/>} ></Route>
        <Route path='/relex/CourList' element={<CourList/>} ></Route> 
        <Route path='/relex/AjouterCour' element={<AjouterCour/>} ></Route>
        <Route path='/relex/ChapitreList' element={<ChapitreList/>} ></Route>
        <Route path='/relex/AddChapitre' element={<AddChapitre/>} ></Route> 
        <Route path='/relex/formationList' element={<FormationsList/>} ></Route>
        <Route path='/relex/AddFormation' element={<AjouterFormation/>} ></Route>
        <Route path='/relex/ModuleList' element={<ModuleList/>} ></Route>
        <Route path='/relex/AddModule' element={<AddModule/>} ></Route>
        <Route path='/relex/FormateurList' element={<FormateurList/>} ></Route>
        <Route path='/relex/AddFormateur' element={<AddFormateur/>} ></Route>
        <Route path='/relex/AjouterPartenaire' element={<AjouterPartenaire/>} ></Route> 
        <Route path='/relex/historiqueDemnde' element={<HistoriqueDemende/>} ></Route> 
        <Route path='/relex/partenaireDemende' element={<PartenaireDemende/>} ></Route> 
        <Route path='/relex/partenaire' element={<Partenaire/>} ></Route>
        <Route path='/relex' element={<RelexPage/>} ></Route>
        <Route path='/relex/profile' element={<RelexProfile/>} ></Route>
        <Route path='/Valid/profile' element={<ProfileValid/>} ></Route>
        <Route path='/alumni/publier' element={<AlumniPublier/>} ></Route>
        <Route path='/alumni/profile' element={<AlumniProfile/>} ></Route>
        <Route path='/chercheur/articles' element={<Articles/>} ></Route>
        <Route path ="/Vaidateur" allowedRoles={['administrateur']} element ={<PrivateRoute><PrincipalValidateur /></PrivateRoute>}/>
        <Route path="/Validateur/publications" allowedRoles={['administrateur']} element={<PrivateRoute><PublicationValidateur /></PrivateRoute>} />
        <Route path="/Valid/publications_en_attente" allowedRoles={['administrateur']} element={<PrivateRoute><Valid/></PrivateRoute>} />
        <Route path="/editeur/profile" allowedRoles={['editeur']} element={<PrivateRoute><ProfileEdit/></PrivateRoute>} />
        <Route path="/fablab/profile"  element={<ProfileFablab/>} />
        <Route path="/club/event"  element={<EventPage/>} />
        <Route path="/club/Creer"  element={<ClubEvent/>} />

        <Route path='/MotPresident' element={<MotPresident/>}></Route>
        <Route path='/Vision_Mission' element={<Vision/>}></Route>

        <Route path='/Seminaire' element={<Seminaire/>} ></Route>

        <Route path='/EventList/DetailEven' element={<DetailEvenement/>}></Route>
        <Route path="/Program" element={<Program/>} />

      </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
