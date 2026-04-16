import 'bootstrap/dist/css/bootstrap.min.css'; // Essential Bootstrap CSS
import './App.css'; // Any custom global styles
import PamhofuNavbar from "./Components/navbar.jsx"; 
import Hero from "./Components/Hero"; 
import ProductSection from "./Components/ProductSection";
import Footer from './Components/Footer.jsx';
import WhatsAppButton from './Components/WhatsAppButton';
import AboutSection from './Components/AboutUs.jsx';

function App() {
  return (
    <div className="pamhofu-wrapper">
      {/* 1. Navigation Bar */}
      <PamhofuNavbar />

      <main>
        {/* 2. Hero Section with Video Background */}
        <Hero />

        {/* 3. Product Grid with Tabs */}
        <ProductSection />

        {/* 5. About Us */}
        <AboutSection/>

         {/* 4. Loating whatsapp button */}
        <WhatsAppButton/>

      
        
        <Footer />
      </main>
    </div>
  );
}

export default App;