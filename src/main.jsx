import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OurMeat from './pages/OurMeat.jsx';
import Recipes from './pages/Recipes.jsx';
import ContactPage from './pages/Contact.jsx';
import ServicesPage from './pages/Services.jsx';
import ProductSection from './Components/ProductSection.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import WhatsAppButton from './Components/WhatsAppButton';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/OurMeat" element={<OurMeat />}/>
        <Route path="/Recipes" element={<Recipes />}/>
        <Route path="/Contact" element={<ContactPage />}/>
        <Route path="/Services" element={<ServicesPage />}/>
        <Route path="/" element={<ProductSection />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
    
  </StrictMode>,
)
