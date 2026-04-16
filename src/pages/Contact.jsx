import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactBanner from '../assets/ContactBanner.webp';
import PamhofuNavbar from '../Components/navbar';
import Footer from '../Components/Footer';

// PLACEHOLDERS: Replace these paths with your actual WebP icons
 import PhoneIcon from '../assets/icons/phone-ico.webp';
import WhatsAppIcon from '../assets/icons/whatsapp-ico.webp';
import EmailIcon from '../assets/icons/email-ico.webp';
import Abattoir from '../assets/icons/abattoir-ico.webp';

const ContactPage = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <PamhofuNavbar />

      {/* 1. TOP BANNER SECTION */}
      <div className="position-relative w-100 overflow-hidden" style={{ height: '400px', backgroundColor: '#000' }}>
        <img 
          src={ContactBanner} 
          alt="Premium Meat Selection" 
          className="w-100 h-100 object-fit-cover opacity-75"
        />
        
      </div>

      {/* 2. MAIN CONTENT SECTION */}
      <div className="container py-5 flex-grow-1">
        <div className="row g-5">
          
          {/* Left Column: Contact Methods & Map */}
          <div className="col-md-5">
            <div className="row g-3 mb-4">
              
              {/* Phone Tile */}
              <ContactTile label="Phone" value="+263 777 000 000" iconSrc={PhoneIcon} />
              
              {/* WhatsApp Tile */}
              <ContactTile label="Whatsapp" value="+263 777 000 000" iconSrc={WhatsAppIcon} />
              
              {/* Email Tile */}
              <ContactTile label="Email" value="sales@pamhofu.com" iconSrc={EmailIcon} />
              
              {/* Abattoir Tile */}
              <ContactTile label="Abattoir" value="Harare, Zimbabwe" iconSrc={Abattoir} />

            </div>

            {/* Map Section */}
            <div className="rounded-4 overflow-hidden shadow-sm border" style={{ height: '300px' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15190.4124976735!2d31.0492!3d-17.8292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a4e704423067%3A0x738b577319987f7d!2sHarare!5e0!3m2!1sen!2szw!4v1713254000000!5m2!1sen!2szw" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="col-md-7">
            <div className="ps-md-4">
              <h2 className="fw-bold mb-2 text-dark" style={{ fontSize: '2.8rem' }}>Get In Touch</h2>
              <p className="text-muted mb-4 fs-5">Send us a message and our team will get back to you within 24 hours.</p>

              <form className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-uppercase text-muted">Full Name</label>
                  <input type="text" className="form-control form-control-lg border-0 bg-white shadow-sm" placeholder="John Doe" />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-uppercase text-muted">Email Address</label>
                  <input type="email" className="form-control form-control-lg border-0 bg-white shadow-sm" placeholder="john@example.com" />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold text-uppercase text-muted">Subject</label>
                  <input type="text" className="form-control form-control-lg border-0 bg-white shadow-sm" placeholder="Order Inquiry" />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold text-uppercase text-muted">Message</label>
                  <textarea className="form-control border-0 bg-white shadow-sm" rows="5" placeholder="Tell us how we can help..."></textarea>
                </div>
                <div className="col-12 mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-lg w-100 py-3 fw-bold text-white shadow" 
                    style={{ backgroundColor: '#434190', borderRadius: '12px' }}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Sub-component for the tiles to keep code clean
const ContactTile = ({ label, value, iconSrc }) => (
  <div className="col-6">
    <div className="p-4 bg-white rounded-4 shadow-sm d-flex flex-column align-items-center justify-content-center border-0 h-100 transition-hover" 
         style={{ minHeight: '160px', transition: 'transform 0.2s' }}>
      <div className="mb-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
        {iconSrc ? (
          <img src={iconSrc} alt={label} className="w-100 h-100 object-fit-contain" />
        ) : (
          <div className="rounded-circle bg-light d-flex align-items-center justify-content-center w-100 h-100">
            {/* Empty space for your .webp icon */}
            <span className="text-muted small">Icon</span>
          </div>
        )}
      </div>
      <h6 className="mb-1 fw-bold text-dark">{label}</h6>
      <p className="small text-muted mb-0 text-center">{value}</p>
    </div>
  </div>
);

export default ContactPage;