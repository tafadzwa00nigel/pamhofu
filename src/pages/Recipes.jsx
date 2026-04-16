import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import recipeBanner from '../assets/recipes-banner.webp';
import PamhofuNavbar from '../Components/navbar';
import Footer from '../Components/Footer';

// 1. IMPORT YOUR IMAGES HERE
import ZvinyenzePic from '../assets/Recipes/zvinyenze.jpg';

// IMPORT THE PDF FILE
import recipePDF from '../assets/Recipes/Pamhofu-Recipes-Zvinyenze.pdf';

const Recipes = () => {
  // FIX 1: Assign ZvinyenzePic to the image property here
  const recipes = [
    { id: 1, name: "Zvinyenze Special", image: ZvinyenzePic }, 
    { id: 2, name: "Beef Stew", image: null },    
    { id: 3, name: "Roasted Lamb", image: null }, 
  ];

  return (
    <div className="container-fluid p-0">
      <PamhofuNavbar />
      
      <div className="position-relative w-100 overflow-hidden" style={{ height: '450px', backgroundColor: '#000' }}>
        <img 
          src={recipeBanner} 
          alt="Premium Meat Selection" 
          className="w-100 h-100 object-fit-cover opacity-75"
        />
      </div>

      <section className="container py-5">
        <div className="row justify-content-center mt-5">
          {recipes.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6 mb-5 d-flex justify-content-center">
              <div 
                className="overflow-hidden d-flex flex-column"
                style={{ 
                  backgroundColor: '#4B4E97', 
                  width: '300px', 
                  height: '400px',
                  borderRadius: '8px',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
                }}
              >
                {/* IMAGE PLACEMENT */}
                <div style={{ height: '200px', width: '100%', backgroundColor: '#3a3d7a' }}>
                  {item.image ? (
                    <img 
                      /* FIX 2: src must be inside curly braces {item.image} */
                      src={item.image} 
                      alt={item.name} 
                      className="w-100 h-100 object-fit-cover" 
                    />
                  ) : (
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center text-white-50">
                      <span>Image Placeholder</span>
                    </div>
                  )}
                </div>

                <div className="p-4 flex-grow-1 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="text-white mb-2">{item.name}</h5>
                    <div className="mb-3">
                      <div 
                        className="bg-white d-inline-block px-2 py-1 rounded-pill"
                        style={{ fontSize: '12px' }}
                      >
                        <span style={{ color: '#FFCC33' }}>★★★★★</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <a 
                      href={recipePDF} 
                      download="Pamhofu-Recipe.pdf"
                      className="btn btn-light rounded-0 fw-bold px-3 py-2 w-100 text-decoration-none"
                      style={{ fontSize: '12px', color: '#4B4E97', letterSpacing: '1px', textAlign: 'center' }}
                    >
                      DOWNLOAD PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Recipes;