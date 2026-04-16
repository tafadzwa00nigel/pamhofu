import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import servicesBanner from '../assets/services-banner.webp';
import PamhofuNavbar from '../Components/navbar';
import BeefCuts from '../assets/beef-cuts.webp';
import PorkCuts from '../assets/pork-cuts.webp';
import GoatCuts from '../assets/goat-cuts.webp';
import Footer from '../Components/Footer';


const ServicesPage = () => {
  const services = [
    {
      title: "Cuts of Beef",
      description: "Premium selection of grass-fed beef. From succulent steaks to lean roasts, our abattoir ensures the highest quality processing for all your beef requirements.",
      imagePath: BeefCuts,
    },
    {
      title: "Cuts of Pork",
      description: "Tender and flavorful pork cuts processed under strict hygienic conditions. We offer everything from prime chops to specialty cuts for your butchery.",
      imagePath: PorkCuts,
    },
    {
      title: "Cuts of Goat",
      description: "Traditional and expertly butchered goat meat. Our precision cutting ensures you get the best yield and quality for stews, roasts, and traditional dishes.",
      imagePath: GoatCuts,
    }
  ];

  return (
    <div className="container-fluid p-0">
        
      {/* <PamhofuNavbar /> */}
        <PamhofuNavbar />

      {/* 1. TOP BANNER */}
      <header 
        style={{ 
          height: '350px', 
          backgroundColor: '#FFCC00',
          // FIX 2: Correct way to use the imported image in inline styles
          backgroundImage: `url(${servicesBanner})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}

        
      >
      </header>

      {/* NAVIGATION BAR SECTION */}
      <nav className="py-4 shadow-sm" style={{ backgroundColor: '#E9E9E9' }}>
        <div className="container">
          <div className="row text-center fw-bold text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.9rem' }}>
            <div className="col-4">Abattoir Service</div>
            <div className="col-4">Butchery</div>
          </div>
        </div>
      </nav>

      {/* SERVICES LIST */}
      <main>
        {services.map((service, index) => (
          <section 
            key={index} 
            className="py-5" 
            style={{ backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#E9E9E9' }}
          >
            <div className="container">
              <div className="row align-items-center justify-content-center">
                
                {/* IMAGE COLUMN */}
                <div className="col-md-5 d-flex align-items-center justify-content-center mb-4 mb-md-0">
                <img 
                    src={service.imagePath} 
                    alt={service.title}
                    className="img-fluid" 
                    style={{ 
                    width: '100%', 
                    maxWidth: '450px', 
                    height: 'auto', // Changed to auto so transparent images don't stretch
                    maxHeight: '300px', 
                    objectFit: 'contain' // Changed to contain so the whole transparent asset fits without clipping
                    }}
                />
                </div>

                {/* CONTENT COLUMN */}
                <div className="col-md-5 text-center">
                  <div className="mb-3 d-inline-block">
                    <div 
                      className="px-4 py-2 shadow-sm"
                      style={{ 
                        backgroundColor: '#4B4B96', 
                        color: 'white', 
                        borderRadius: '0 0 15px 15px',
                        minWidth: '220px',
                        position: 'relative'
                      }}
                    >
                      <small className="text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>{service.title}</small>
                      <div className="mt-1">
                        <span style={{color: '#FFCC00', fontSize: '1.2rem'}}>★ ★ ★</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 px-lg-4">
                    <p className="text-dark mb-4" style={{ lineHeight: '1.6' }}>
                      {service.description}
                    </p>

                    <button 
                      className="btn px-4 py-2 text-white fw-bold shadow-sm" 
                      style={{ 
                        backgroundColor: '#4B4B96',
                        border: 'none',
                        transition: '0.3s'
                      }}
                    >
                      Inquire Now
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </section>
        ))}
      </main>
        <Footer />
    </div>
  );
};

export default ServicesPage;