import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaArrowRight as FaArrow } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import "./CarouselAlumni.css";

const CarouselAlumni = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/publication/searchall/?type_publication=success%20story&etat=valide`);
        const data = await response.json();
        const testimonialsWithPublisherDetails = await Promise.all(
          data.map(async (item) => {
            let publisherDetails = {
              first_name: "Imane",
              family_name: "HAISSAM",
            };

            if (item.publisher) {
              const publisherResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/${item.publisher}`);
              const publisherData = await publisherResponse.json();
              publisherDetails = {
                first_name: publisherData.first_name,
                family_name: publisherData.family_name,
              };
            }

            let imageUrl = item.image;
            if (imageUrl && !imageUrl.startsWith('http')) {
              const imageResponse = await fetch(`${process.env.REACT_APP_API_URL}${imageUrl}`);
              const imageBlob = await imageResponse.blob();
              imageUrl = URL.createObjectURL(imageBlob);
            }

            return {
              id_publication: item.id_publication,
              name: `${publisherDetails.first_name} ${publisherDetails.family_name}`,
              imageUrl: imageUrl || '',
              text: item.description || "Description not available",
            };
          })
        );

        setTestimonials(testimonialsWithPublisherDetails);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex - 2 < 0
        ? testimonials.length - (testimonials.length % 2 === 0 ? 2 : 1)
        : prevIndex - 2
    );
  };

  const handleNext = () => {
    setIndex((prevIndex) =>
      prevIndex + 2 >= testimonials.length ? 0 : prevIndex + 2
    );
  };

  const displayedTestimonials = testimonials.length === 1
    ? testimonials
    : testimonials.slice(index, index + 2);

  if (displayedTestimonials.length < 2 && testimonials.length > 1) {
    displayedTestimonials.push(...testimonials.slice(0, 2 - displayedTestimonials.length));
  }

  return (
    <div className="testimonials-container">
      <div className="testimonials-header">
        <div>
          <h1>Articles des Alumnis</h1>
          <p className="testimonials-text">
            Découvrez les récits inspirants et les succès professionnels de nos anciens élèves à travers nos articles Alumni.
          </p>
        </div>
        <div className="navigation">
          <button onClick={handlePrev}><FaArrowLeft color="#0061B1" /></button>
          <button onClick={handleNext}><FaArrowRight color="#0061B1" /></button>
        </div>
      </div>
      <div className="testimonial-cards">
        {displayedTestimonials.map((testimonial, idx) => (
          <div className="testimonial-card" key={idx}>
            <div className="testimonial-text-container">
              <div className="testimonial-image" style={{ backgroundImage: `url(${testimonial.imageUrl})` }}></div>
              <h3 className="testimonial-name">{testimonial.name}</h3>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="read-more-container">
                <Link
                  to={`/success-story/${testimonial.id_publication}`}
                  state={testimonial}
                  className="read-more-text"
                >
                  Lire plus
                </Link>
                <FaArrow className="read-more-arrow" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselAlumni;
