import React, { useState, useEffect } from 'react';
import moonLandingImage from '../assets/im1.jpeg';
import computersImage from '../assets/im2.jpeg';
import smartphoneImage from '../assets/im3.jpeg';

const slides = [
  { year: 1969, title:"CERI", content: "Naissance du CERI,  le principal pourvoyeur d'une génération d'informaticiens pour répondre aux besoins du plan national de développement.", image: moonLandingImage },
  { year: 1984,title:"INI", content: "Naissance de l'INI,  le principal pourvoyeur d'une génération d'informaticiens pour répondre aux besoins du plan national de développement.", image: computersImage },
  { year: 2008,title:"ESI", content: "Naissance de l'ESI,  le principal pourvoyeur d'une génération d'informaticiens pour répondre aux besoins du plan national de développement.", image: smartphoneImage },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const selectSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className=" flex flex-col w-full lg:h-[500px] max-sm:h-screen sm:h-screen overflow-hidden" style={{backgroundColor: '#212529'}}>
      <div className="flex-grow relative">
        {slides.map((slide, index) => (
          <div
            key={slide.year}
            className={`flex absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`} style={{backgroundColor: '#0061B1'}}
          >
            <div className="md:w-6/12 sm:w-6/12 h-full max-sm:w-6/12 flex flex-col justify-center absolute right-0 md:right-0" style={{clipPath: 'polygon(23% 0%, 100% 0, 100% 100%, 0% 100%)'}}>
              <img src={slide.image} alt="Slide Image" className="h-full w-full object-cover" />
            </div>
            {/* Ajustements responsifs pour le texte et le padding */}
            <div className="text-left sm:w-7/12 max-sm:w-7/12 md:w-7/12 items-center md:p-20 sm:p-10 max-sm:p-8" style={{backgroundColor: '#212529',clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)'}}>
            <div className="p-4 shadow-lg w-1/2 rounded-lg" style={{backgroundColor: '#FFA500',clipPath: 'inset(25px 0px 35px round 0 30px)'}}>
                <h2 className="flex font-semibold mb-4 text-center text-rlg text-white">Notre Histoire</h2>
              </div>
              <h3 className="mt-4 font-semibold text-rmd"style={{color: '#FFA500'}}>{slide.title}</h3>
      <p className="text-white flex text-rsm">{slide.content}</p>

                <div className="flex absolute bottom-0 sm:px-10 max-sm:px-8 md:px-20 lg:px-40 xl:px-60 space-x-2 max-sm:space-x-2 sm:space-x-4 md:space-x-8 lg:space-x-12 xl:space-x-16">
                          {slides.map((slide, index) => (
                            <div key={slide.year} className="flex flex-col items-center">
                                <button
                                      className={`font-semibold transition-transform ease-in-out duration-300 ${index === currentIndex ? 'text-md md:text-lg lg:text-xl xl:text-2xl' : 'text-sm md:text-md lg:text-lg xl:text-xl text-yellow-400'}`} style={{color:'#FFA500'}}
                                        onClick={() => selectSlide(index)}
              >
                                                {slide.year}
                          </button>
                          <div className={`h-1 w-1 bg-blue-600 rounded-full mt-1 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`} style={{backgroundColor: '#FFA500'}}> </div>
                           <div className={`h-8 w-0.5 bg-blue-600 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`} style={{backgroundColor: '#FFA500'}}></div>
          </div>
        ))}
       
      </div>
             
            </div>
            {/* Ajustements responsifs pour l'image */}
            
          </div>
        ))}
      </div>
      {/* Ajustements responsifs pour les boutons de défilement */}

    </div>
    
  );
}
