// Presentation.jsx

import React from 'react';
import "./Presentation.css";
import Carousel from '../../components/Carousel/Carousel';
import BoxComponent from '../../components/Box/def';
import EffectifsComponent from '../../components/Effectif/Effectif';

function Presentation() {
    const textData = [{
      title: "Le Parcours académique",
      description: "L’École nationale Supérieure d’Informatique forme des ingénieurs d’État en informatique. La scolarité dure cinq ans et est répartie en trois périodes:",
      list: [
        "DEUX ANNÉES DE CLASSES PRÉPARATOIRES CP",
        "UNE ANNÉE DE SOCLE COMMUN AU SECOND CYCLE (SCS)",
        "DEUX ANNÉES DE SPÉCIALITÉ (4ÈME + 5ÈME ANNÉE)"
      ]
    },
    {
        title: "RECHERCHE SCIENTIFIQUE",
        description: "L’Ecole est habilitée à assurer la formation doctorale. 02 laboratoires de recherche hébergeant 60% des enseignants-chercheurs. Méthodes de Conception de Systèmes (LMCS). Communication dans les systèmes informatiques (LCSI).",
        list: []
      },
      {
        title: "Formation continue",
        description: "Vous êtes un professionnel et vous souhaiteriez développer de nouvelles compétences ou bien faire valider celles que vous possédez déjà ? Découvrez l'ensemble de nos formations continues proposées par l’ESI",
        list: []
      }
    ];

    return (
        <div className="home-page">
            <Carousel />
            <BoxComponent data={textData[0]} isImageOnLeft={true} />
            <BoxComponent data={textData[1]} isImageOnLeft={false} />
            <BoxComponent data={textData[2]} isImageOnLeft={true} />
            <EffectifsComponent />
        </div>
    );
}

export default Presentation;
