import React from 'react';
import PamhofuNavbar from "../Components/navbar.jsx"; 
import MeatBanner from '../assets/banner-meat.webp';
import Pot from '../assets/meatpot.png';
import Footer from '../components/Footer.jsx';
import MeatWholesaleSection from '../Components/MeatWholesaleSection.jsx';
import WhatsAppButton from '../Components/WhatsAppButton.jsx';
import Chatbot from '../Components/Chatbot.jsx';


const OurMeat = () => {

  return (
    <div className="min-vh-100">
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

      <MeatWholesaleSection/>


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

      {/* 4. Chatbot */}
      <Chatbot/>

    <Footer />

      
      
    </div>
    
  );
};

export default OurMeat;