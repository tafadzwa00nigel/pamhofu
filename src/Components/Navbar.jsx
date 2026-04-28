import { Navbar, Nav, Container, Button } from 'react-bootstrap';
// 1. Import your logo from the assets folder
import logo from '../assets/logo.webp'; 

const PamhofuNavbar = () => {
  return (
    <Navbar bg="white" expand="lg" className="py-3 border-bottom sticky-top w-100">
      <Container fluid className="px-lg-5 w-100 mw-100">
        
        {/* 1. BRAND - Now using the WebP logo */}
        <Navbar.Brand 
          href="#" 
          className="m-0 p-0 d-flex align-items-center"
        >
          <img
            src={logo}
            alt="Pamhofu Logo"
            height="75" // Adjust height to fit your design
            className="d-inline-block align-top"
            style={{ objectFit: 'contain' }}
          />
        </Navbar.Brand>

        {/* Mobile Toggle Button */}
        <Navbar.Toggle aria-controls="pamhofu-nav" />

        <Navbar.Collapse id="pamhofu-nav" className="justify-content-between">
          
          {/* 2. LINKS - Centered */}
          <Nav className="mx-auto text-uppercase" style={{ fontSize: '0.85rem', fontWeight: '600' }}>
            <Nav.Link href="/" className="px-3 text-dark">Home</Nav.Link>
            <Nav.Link href="/OurMeat" className="px-3 text-dark">Our Meat</Nav.Link>
            <Nav.Link href="/Services" className="px-3 text-dark"> Services</Nav.Link>
            <Nav.Link href="/Recipes" className="px-3 text-dark">Recipes</Nav.Link>
            <Nav.Link href="/Contact" className="px-3 text-dark">Contact</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PamhofuNavbar;