import 'bootstrap/dist/css/bootstrap.min.css'; // Essential Bootstrap CSS
import './App.css'; // Any custom global styles
import PamhofuNavbar from "./Components/navbar.jsx"; 
import Hero from "./Components/Hero"; 
import ProductSection from "./Components/ProductSection";
import Footer from './Components/Footer.jsx';

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

        {/* 4. Simple Footer Placeholder */}
        <Footer />
      </main>
    </div>
  );
}

export default App;