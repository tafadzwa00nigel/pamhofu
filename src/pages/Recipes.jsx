import React from 'react';
import PamhofuNavbar from "../Components/navbar.jsx"; 
import MeatBanner from '../assets/banner-meat.webp';
import Pot from '../assets/meatpot.png';
import Footer from '../components/Footer.jsx';

const Recipes = () => {
  // Array of meat products to keep the JSX clean
  const products = [
    { id: 1, name: "Beef", price: "35.00" },
    { id: 2, name: "Goat Ribs", price: "35.00" },
    { id: 3, name: "Pork Belly", price: "35.00" },
    { id: 4, name: "Beef", price: "35.00" },
    { id: 5, name: "Cow Legs", price: "35.00" },
    { id: 6, name: "Ox Tail", price: "35.00" },
    { id: 7, name: "Goat Head", price: "35.00" },
    { id: 8, name: "Beef", price: "35.00" },
    { id: 9, name: "Cow Legs", price: "35.00" },
    { id: 10, name: "Ox Tail", price: "35.00" },
    { id: 11, name: "Goat Head", price: "35.00" },
    { id: 12, name: "Beef", price: "35.00" },
  ];

  return (
    <div className="bg-light min-vh-100">
      <PamhofuNavbar />
      {/* 1. TOP BANNER SECTION */}
      <div className="position-relative w-100 overflow-hidden" style={{ height: '450px', backgroundColor: '#000' }}>
        {/* PLACEHOLDER: Replace with your actual banner image */}
        <img 
          src= {MeatBanner} 
          alt="Premium Meat Selection" 
          className="w-100 h-100 object-fit-cover opacity-75"
        />
      </div>

      {/* 2. PRODUCT GRID SECTION */}
      <div className="container py-5">
        <div className="row g-4">
          {products.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-3">
              <div className="card h-100 border-0 rounded-0 shadow-sm p-3">
                {/* Price Tag */}
                <h5 className="fw-bold mb-3">${item.price}</h5>
                
                {/* PLACEHOLDER: Product Image Box */}
                <div className="bg-white border d-flex align-items-center justify-content-center mb-3" style={{ height: '200px' }}>
                  <span className="text-muted text-uppercase tracking-wider small">Image</span>
                </div>

                {/* Product Name */}
                <h5 className="card-title text-secondary mb-3">{item.name}</h5>

                {/* Order Row */}
                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-sm text-white px-3" style={{ backgroundColor: '#3f4095' }}>
                    Order
                  </button>
                  {/* The Yellow Accent Box */}
                  <div style={{ width: '40px', height: '18px', backgroundColor: '#fcc419' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CALL TO ACTION - BOTTOM RECIPE BANNER */}
      <div className="mt-5 position-relative overflow-visible py-5" style={{ backgroundColor: '#3f4095' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 text-center text-md-start">
              <h1 className="text-white fw-black display-4 m-0" style={{ letterSpacing: '2px', lineHeight: '1.1' }}>
                TRY OUR TASTY <br /> NEW RECIPES
              </h1>
            </div>
            
            {/* The Floating Pot Image */}
            <div className="col-md-5 position-relative">
              <div className="recipe-image-wrapper">
                {/* PLACEHOLDER: Replace with your transparent pot image */}
                <img 
                  src= {Pot} 
                  alt="Delicious Recipe" 
                  className="img-fluid position-absolute bottom-0 end-0 d-none d-md-block"
                  style={{ transform: 'translateY(40%)', width: '450px', zIndex: '10' }}
                />
                {/* Mobile version of the pot image */}
                <img 
                  src={Pot} 
                  alt="Delicious Recipe" 
                  className="img-fluid d-md-none mt-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Added some custom spacing at the very bottom to allow for the floating pot height */}
      <div style={{ height: '50px' }}></div>
    <Footer />

      
      
    </div>
    
  );
};

export default Recipes;