import React, { useState, useEffect } from 'react';
import moonLandingImage from '../../assets/im1.jpeg';
import computersImage from '../../assets/im2.jpeg';
import smartphoneImage from '../../assets/im3.jpeg';
import './Carousel.css'; // Assurez-vous que le chemin est correct

const slides = [
  { year: 1969, title: "CERI", content: "Naissance du CERI, le principal pourvoyeur d'une génération d'informaticiens pour répondre aux besoins du plan national de développement.", image: moonLandingImage },
  { year: 1984, title: "INI", content: "Naissance de l'INI, le principal pourvoyeur d'une génération d'informaticiens pour répondre aux besoins du plan national de développement.", image: computersImage },
  { year: 2008, title: "ESI", content: "Naissance de l'ESI, le principal pourvoyeur d'une génération d'informaticiens pour répondre aux besoins du plan national de développement.", image: smartphoneImage },
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
        <>
        <div className="carousel">
            <div className="flex-grow-relative">

                {slides.map((slide, index) => (
                    <div
                        key={slide.year}
                        className={`carousel-slide ${index === currentIndex ? 'carousel-slide-visible' : 'carousel-slide-hidden'}`}
                    >
                        <div className="carousel-image-container">
                        <img src={slide.image} alt={`${slide.title}`} className="full-cover" />

                        </div>
                        <div className="carousel-text">
                            <h2 className="carousel-heading">Notre Histoire</h2>
                            <h3 className="carousel-subheading">{slide.title}</h3>
                            <p className="carousel-content">{slide.content}</p>
                            <div className="carousel-indicators">
                    {slides.map((slide, index) => (
                        <div key={slide.year} className={`carousel-indicator-container ${index === currentIndex ? 'active' : ''}`}>
                            <button
                                className="carousel-indicator-button"
                                onClick={() => selectSlide(index)}
                            >
                                {slide.year}
                            </button>
                            <div className="carousel-indicator-line"></div>
                            <div className="carousel-indicator-dot"></div>
                        </div>
                    ))}
                </div>
                        </div>
                    </div>
                ))}
               
            </div>
        </div>
        <div>
            <h1> Qui Sommes nous</h1>
        </div>
        </>
        
    );
}
