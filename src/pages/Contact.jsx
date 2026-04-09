import React from 'react';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactBanner from '../assets/ContactBanner.webp'
import PamhofuNavbar from '../Components/navbar';
import Footer from '../Components/Footer';

const ContactPage = () => {
  return (
    <div div className="bg-light min-vh-100">
      <PamhofuNavbar />
      {/* 1. TOP BANNER SECTION */}
    <div className="position-relative w-100 overflow-hidden" style={{ height: '450px', backgroundColor: '#000' }}>
        {/* PLACEHOLDER: Replace with your actual banner image */}
        <img 
        src= {ContactBanner} 
        alt="Premium Meat Selection" 
        className="w-100 h-100 object-fit-cover opacity-75"
        />
    </div>

      <div className="row g-4">
        {/* Left Column: Contact Methods & Map */}
        <div className="col-md-5">
          <div className="row g-2 mb-3">
            {/* Phone Tile */}
            <div className="col-6">
              <div className="p-4 text-center bg-light rounded shadow-sm d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '140px' }}>
                <Phone size={32} color="#434190" fill="#434190" />
                <span className="mt-2 fw-medium text-secondary">Phone</span>
              </div>
            </div>
            {/* Whatsapp Tile */}
            <div className="col-6">
              <div className="p-4 text-center bg-light rounded shadow-sm d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '140px' }}>
                <MessageCircle size={32} color="#434190" fill="#434190" />
                <span className="mt-2 fw-medium text-secondary">Whatsapp</span>
              </div>
            </div>
            {/* Email Tile */}
            <div className="col-6">
              <div className="p-4 text-center bg-light rounded shadow-sm d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '140px' }}>
                <Mail size={32} color="#434190" fill="#434190" />
                <span className="mt-2 fw-medium text-secondary">Email</span>
              </div>
            </div>
            {/* Abbatoir Tile */}
            <div className="col-6">
              <div className="p-4 text-center bg-light rounded shadow-sm d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '140px' }}>
                <div style={{ position: 'relative' }}>
                   {/* Simplified Abbatoir Icon representation */}
                  <MapPin size={32} color="#434190" />
                </div>
                <span className="mt-2 fw-medium text-secondary">Abbatoir</span>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="rounded overflow-hidden shadow-sm" style={{ height: '220px', backgroundColor: '#e9ecef' }}>
             <div className="h-100 d-flex align-items-center justify-content-center border">
                <p className="text-muted m-0">[ INTERACTIVE MAP VIEW ]</p>
             </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="col-md-7 ps-md-5">
          <h2 className="fw-bold mb-1" style={{ fontSize: '2.5rem' }}>Get In Touch</h2>
          <p className="text-muted mb-4">Send us a short message, and we will get back to you</p>

          <form>
            <div className="mb-3">
              <label className="form-label small fw-bold">Name</label>
              <input type="text" className="form-control border-secondary border-opacity-25" />
            </div>
            
            <div className="mb-3">
              <label className="form-label small fw-bold">Email</label>
              <input type="email" className="form-control border-secondary border-opacity-25" />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Subject</label>
              <input type="text" className="form-control border-secondary border-opacity-25" />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold">Message</label>
              <textarea className="form-control border-secondary border-opacity-25" rows="4"></textarea>
            </div>

            <button 
              type="submit" 
              className="btn w-100 py-2 fw-bold text-white shadow-sm" 
              style={{ backgroundColor: '#434190', borderRadius: '25px' }}
            >
              Send Now
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;