import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/navbar/navbar';
import './WaveBackground.css'

function Vision () {

  return (

    <div>
        <Navbar/> 

    
        <div className="wave-background">
            <div className='headd'>
                <p className='titleee'>Mission Et  Objective </p>
                <p className='subtitlee'>Notre Vision pour l'Avenir</p>
                <p className='texttitlee' >{text_title}</p>
                            
            </div>
            <div className="sectionss">
              <p className='subtitle2'>Objectifs du Programme de Formation</p>
              <hr className='line-horizontal'/>
              <p className='cycle'>Premier Cycle</p>
              <ul>
              <li className='normal-text' >Préparer le Futur Ingénieur Fournir une formation théorique solide en informatique.</li>
              <li className='normal-text'>Développer les compétences analytiques et critiques des étudiants.</li>
              <li className='normal-text'>Encourager le travail en équipe, l'autonomie, et les compétences en communication.</li>
              <li className='normal-text'>Initier les étudiants à l'économie et aux dynamiques des entreprises. </li>
              <li className='normal-text'>Favoriser la vie en groupe et le partage à travers des activités culturelles, scientifiques, et sportives.</li>
              </ul>
              <br/>
              <p className='cycle'>Second Cycle</p>
              <p className='normal-text'>Spécialisation et Professionnalisation Dispenser un socle commun de connaissances en informatique, mathématiques appliquées et management.<br/>
Proposer des spécialisations en deuxième année pour répondre aux besoins spécifiques de l'industrie :</p>
            <ul class="two-column-list">
              <li>Systèmes d'Information et Technologies (SIT)</li>
              <li>Systèmes Informatiques et Logiciels (SIL)</li>
              <li>Systèmes Informatiques (SIQ)</li>
              <li>Systèmes Intelligents et Données (SID)</li>
            </ul>
            <ul>
              <li className='normal-text' >Offrir des cursus complémentaires tels que le Master Recherche et la Formation Ingénieur Entrepreneur (FIE).</li>
              <li className='normal-text'>Permettre aux étudiants de réaliser un projet de fin d'études en entreprise, afin de favoriser une transition réussie vers le monde professionnel. </li>
              <li className='normal-text'>Encourager l'Innovation et l'Entrepreneuriat Accompagner les futurs entrepreneurs grâce à la Formation Ingénieur Entrepreneur (FIE), offrant des séminaires, des cours, et du coaching pour transformer des idées innovantes en projets concrets.</li>
             </ul>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="sectionss">
              <p className='subtitle2'>Formation Continue : Un Engagement pour l'Excellence Professionnelle</p>
              <hr className='line-horizontal'/>
              <p className='normal-text'>L'ESI s'engage également dans le développement des compétences tout au long de la carrière professionnelle à travers deux types de formations continues :</p>
                 <br/>
               <ul>
               <li className='normal-text' >Formation Continue à la Carte : Ce service est offert aux partenaires de l'école et consiste en des formations spécifiques de courte durée, organisées à la demande. Ces formations sont conçues pour répondre aux besoins précis des partenaires et peuvent se dérouler soit au sein de l'école, soit dans les locaux du client. </li>
              <li className='normal-text' >Formation Avant Promotion : Conformément à l'arrêté ministériel du 19 décembre 2019, l'ESI propose également des formations statutaires pour préparer les professionnels à la promotion vers des grades spécifiques au sein des établissements et administrations publiques. </li>
               </ul>
               <br/>
               <p className='normal-text'>Ces formations visent à renforcer les compétences des participants.</p>
              </div>
              <br/>
            <br/>
            <br/>
            <div className="sectionss">
              <p className='subtitle2'> Notre Engagement</p>
              <hr className='line-horizontal'/>
              <p className='normal-text'> L'ESI est dédiée à l'excellence académique et professionnelle, assurant que chaque étudiant et professionnel en formation continue acquiert les compétences et connaissances nécessaires pour devenir un acteur clé dans le monde de l'informatique et de la technologie.</p>
              </div>
              <Footer/>
        </div>
       
    </div>
 
  );
}

const text_title = "À l'ESI, notre mission est de former des ingénieurs informaticiens hautement qualifiés, capables de répondre aux besoins actuels et futurs des secteurs industriels, économiques, et de la recherche. Nous nous engageons à fournir une formation solide et complète qui couvre tant les aspects théoriques que pratiques de l'informatique, tout en développant les compétences transversales nécessaires à l'insertion et à l'évolution professionnelle."
export default  Vision ; 