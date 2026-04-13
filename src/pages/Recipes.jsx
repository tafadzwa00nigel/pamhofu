import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import recipeBanner from '../assets/recipes-banner.webp';
import PamhofuNavbar from '../Components/navbar';
import Footer from '../Components/Footer';

const Recipes = () => {
  // Sample data for the cards
  const recipes = [1, 2, 3];

  return (
    <div className="container-fluid p-0">
      <PamhofuNavbar/>
      {/* 1. TOP BANNER SECTION */}
        <div className="position-relative w-100 overflow-hidden" style={{ height: '450px', backgroundColor: '#000' }}>
          {/* PLACEHOLDER: Replace with your actual banner image */}
          <img 
            src= {recipeBanner} 
            alt="Premium Meat Selection" 
            className="w-100 h-100 object-fit-cover opacity-75"
          />
        </div>

      {/* Recipes Cards Section */}
      <section className="container py-5">
        <div className="row justify-content-center mt-5">
          {recipes.map((item) => (
            <div key={item} className="col-lg-4 col-md-6 mb-5 d-flex justify-content-center">
              <div 
                className="position-relative p-4 d-flex flex-column justify-content-end"
                style={{ 
                  backgroundColor: '#4B4E97', 
                  width: '280px', 
                  height: '350px',
                  borderRadius: '4px'
                }}
              >
                {/* Overlapping Image Placeholder */}
                <div 
                  className="position-absolute d-flex align-items-center justify-content-center text-center p-2"
                  style={{ 
                    top: '-50px', 
                    right: '10px', 
                    width: '130px', 
                    height: '130px', 
                    backgroundColor: '#FFCC33',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  IMAGE <br /> PLACEHOLDER
                </div>

                {/* Star Ratings */}
                <div className="mb-4">
                  <div 
                    className="bg-white d-inline-block px-2 py-1 rounded-pill"
                    style={{ fontSize: '14px' }}
                  >
                    <span style={{ color: '#FFCC33' }}>★★★★</span>
                  </div>
                </div>

                {/* Order Button */}
                <div>
                  <button 
                    className="btn btn-light rounded-0 fw-bold px-3 py-1"
                    style={{ fontSize: '12px', color: '#4B4E97' }}
                  >
                    ORDER NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Recipes;