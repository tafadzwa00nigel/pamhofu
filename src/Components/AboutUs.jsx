import React, { useState, useEffect } from 'react';

// Images - update these paths to your actual file locations
import img1 from '../assets/abattoir1.jpg';
import img2 from '../assets/abattoir2.jpg';
import img3 from '../assets/abattoir3.jpeg';

const AboutSection = () => {
  const images = [img1, img2, img3];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slideshow Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="py-5 bg-light">
      <div className="container py-lg-5">
        <div className="row align-items-center g-5">
          
          {/* Column 1: Custom Slideshow Gallery */}
          <div className="col-12 col-md-6">
            <div 
              className="position-relative overflow-hidden rounded-4 shadow-lg" 
              style={{ height: '450px', backgroundColor: '#eee' }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    opacity: index === currentIndex ? 1 : 0,
                    transition: 'opacity 1.2s ease-in-out',
                    zIndex: index === currentIndex ? 1 : 0
                  }}
                >
                  <img
                    src={image}
                    alt={`Pamhofu facility ${index + 1}`}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
              
              {/* Modern Progress Indicators */}
              <div 
                className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2" 
                style={{ zIndex: 10 }}
              >
                {images.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      height: '4px',
                      width: '40px',
                      borderRadius: '10px',
                      backgroundColor: index === currentIndex ? '#fff' : 'rgba(255,255,255,0.4)',
                      transition: '0.4s ease'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Text Content */}
          <div className="col-12 col-md-6">
            <div className="ps-md-4">
              <h2 
                className="display-6 fw-bold mb-4" 
                style={{ borderLeft: '6px solid #434190', paddingLeft: '20px' }}
              >
                About Pamhofu Centre
              </h2>
              
              <p className="lead text-dark mb-4" style={{ fontWeight: '400' }}>
                Welcome to <span className="fw-bold" style={{ color: '#434190' }}>Pamhofu Centre</span>, 
                Harare’s premier hub for professional meat processing and trade. We serve as a vital 
                link in the agricultural value chain, providing a state-of-the-art <strong>abattoir</strong> 
                with specialized slaughter services for <strong>cattle, goats, and pigs</strong>.
              </p>
              
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Beyond processing, our facility features a dedicated <strong>butchery service</strong>, 
                ensuring the community has direct access to the freshest, highest-quality cuts. 
                At its core, Pamhofu is a dynamic marketplace designed to empower the industry by 
                offering a transparent platform where <strong>meat producers and buyers meet</strong>.
              </p>

              <div className="mt-4">
                <button className="btn btn-primary btn-lg px-5 py-3 shadow-sm fw-bold border-0" style={{ backgroundColor: '#4e73df' }}>
                  Learn More
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;