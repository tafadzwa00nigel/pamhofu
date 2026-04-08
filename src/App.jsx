import 'bootstrap/dist/css/bootstrap.min.css'; // Essential Bootstrap CSS
import './App.css'; // Any custom global styles
import PamhofuNavbar from "./Components/Navbar"; 
import Hero from "./Components/Hero"; 
import ProductSection from "./Components/ProductSection";

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
        <footer className="py-5 mt-5 border-top bg-light">
          <div className="container text-center text-muted">
            <p className="fw-bold text-dark mb-1">PAMHOFU</p>
            <small>© 2026 Premium Cultivated Meats. All Rights Reserved.</small>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;