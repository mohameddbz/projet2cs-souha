import React from 'react';
import './Chercheur.css';
import Cherch from '../../images/Cherch.png';
import { BsTwitterX} from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa"; 
import { MdMailOutline } from "react-icons/md"; 
import PropTypes from 'prop-types';
import cn from 'classnames';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';

const chercheurData = [
  {
    Nom: 'Linda SAID-ELHAJ',
    prof: 'Chercheuse depuis 2014',
    grade: 'Maitre de conférence classe B',
    Linkedin: 'Maitre de conférence classe B',
    Email:'Maitre de conférence classe B',
    Twitter: 'Maitre de conférence classe B'
    
  },]
  const chercheurData1 = [
    {
      Nom: 'Daribe ELINA',
      resume: 'Darine ELINA, diplômé de l ESI en 2014, est un entrepreneur accompli dans le domaine de l intelligence artificielle. Passionné par ce domaine dès ses études, il développe un chatbot performant pour son mémoire de fin d études. Convaincu du potentiel de sa technologie, il fonde la start-up IA-Solutions avec deux amis, également anciens élèves de l ESI.',
      Défis: 'Les débuts n ont pas été faciles. Nous avons dû jongler entre les défis techniques, le financement limité et les incertitudes du marché. Mais à chaque obstacle, nous avons trouvé une opportunité de grandir et d innover. Nous avons appris de nos erreurs et nous avons continué à avancer, guidés par notre passion commune pour l IA.',
      Réalisation: 'Aujourd hui, je suis fier de dire que IA-Solutions est devenue une référence dans le domaine de l IA. Nos solutions innovantes sont utilisées par des entreprises du monde entier pour résoudre des problèmes complexes et stimuler leur croissance. C est incroyable de voir comment une simple idée, née dans les salles de classe de l ESI, a pu se transformer en une entreprise florissante qui impacte positivement le monde',
      Horizons:'Mon voyage n est pas encore terminé, bien sûr. Il y aura de nouveaux défis à relever et de nouvelles innovations à découvrir. Mais je suis convaincu que, avec détermination et passion, rien n est impossible',
      Motivation: ' Tous ceux qui poursuivent leurs rêves, je veux dire : ne laissez jamais personne vous décourager. Croyez en vous-même, suivez votre passion et n ayez pas peur de prendre des risques. Car c est dans les défis que se trouvent les plus grandes opportunités.'
      
    },]

function Chercheur(props) {
  return (
    <div>
      <Navbar/>
    <div className={cn('Rechercheur_container', props.className)}>


    <section className='chercheur-section2'>
  <div>
    {chercheurData.map((event, index) => (
      <div key={index} className='chercheur-rect3'>
        <img className='chercheur-image4' src={Cherch} alt="alt text" />
        <h2 className='chercheur-medium_title'>{event.Nom}</h2>
        <div className='chercheur-text2'>{event.prof}</div>
        <h5 className='chercheur-highlight'>{event.grade}</h5>
        <div className='chercheur-coordonnes'>
          <h5 className='chercheur-highlight5'>{event.Twitter} </h5>
          <BsTwitterX className='chercheur-image5' />
          <h5 className='chercheur-highlight5'>{event.Linkedin} </h5>
          <FaLinkedinIn className='chercheur-image9' />
          <h5 className='chercheur-highlight5'>{event.Email} </h5>
          <MdMailOutline className='chercheur-image7' />
        </div>
      </div>
    ))}
  </div>
  <div className="chercheur-menu">
    <a href="#" className="chercheur-highlight1">Profile</a>
    <a href="#" className="chercheur-highlight1">Publication</a>
    <a href="#" className="chercheur-highlight1">Projet Recherche</a>
  </div>

  <div>
    {chercheurData1.map((event, index) => (
      <div key={index}>
        <img className='chercheur-image41' src={Cherch} alt="alt text" />
        <h2 className='chercheur-medium_title1'>{event.Nom}</h2>
        <hr className='chercheur-line' size={1} />
        <div className='chercheur-profile_ens'>
          <h3 className='chercheur-subtitle'>{event.resume}</h3>
          <h3 className='chercheur-subtitle1'>Résumé</h3>
        </div>
        <hr className='chercheur-rect5' size={1} />
        <h2 className='chercheur-medium_title11_box'>
          <span className='chercheur-medium_title11'>
            <span className='chercheur-medium_title11_span0'>
              Les Défis du Démarrage
              <br />
            </span>
            <span className='chercheur-medium_title11_span1'></span>
            <span className='chercheur-medium_title11_span2'>
              {event.Défis}
              <br />
              <br />
            </span>
            <span className='chercheur-medium_title11_span3'>
              Réalisation du Succès
              <br />
            </span>
            <span className='chercheur-medium_title11_span4'>
              {event.Réalisation}
              <br />
              <br />
            </span>
            <span className='chercheur-medium_title11_span5'>Vers de Nouveaux Horizons</span>
            <span className='chercheur-medium_title11_span6'>
              <br />
            </span>
            <span className='chercheur-medium_title11_span7'>
              {event.Horizons}
              <br />
            </span>
            <span className='chercheur-medium_title11_span8'>
              <br />
            </span>
            <span className='chercheur-medium_title11_span9'>
              Motivation
              <br />
            </span>
            <span className='chercheur-medium_title11_span10'>{event.Motivation}</span>
          </span>
        </h2>
      </div>
    ))}
  </div>
</section>

    </div>
    {/* <Footer/> */}
    </div>
  );
}

Chercheur.propTypes = {
  className: PropTypes.string,
};

export default Chercheur;
