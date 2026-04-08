import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const PamhofuNavbar = () => {
  return (
    <Navbar bg="white" expand="lg" className="py-3 border-bottom sticky-top w-100">
      {/* Changing to 'fluid' is step one. 
        Added 'mw-100' and 'w-100' to ensure it ignores Bootstrap's default max-width constraints.
      */}
      <Container fluid className="px-lg-5 w-100 mw-100">
        
        {/* 1. BRAND - Pinned Left */}
        <Navbar.Brand 
          href="#" 
          className="fw-bold m-0" 
          style={{ 
            fontSize: '1.8rem', 
            letterSpacing: '-1.5px', 
            fontFamily: 'Arial, sans-serif' 
          }}
        >
          PAMHOFU
        </Navbar.Brand>

        {/* Mobile Toggle Button */}
        <Navbar.Toggle aria-controls="pamhofu-nav" />

        <Navbar.Collapse id="pamhofu-nav" className="justify-content-between">
          
          {/* 2. LINKS - Centered using mx-auto */}
          <Nav className="mx-auto text-uppercase" style={{ fontSize: '0.85rem', fontWeight: '600' }}>
            <Nav.Link href="#home" className="px-3 text-dark">Home</Nav.Link>
            <Nav.Link href="#meat" className="px-3 text-dark">Our Meat</Nav.Link>
            <Nav.Link href="#services" className="px-3 text-muted">
              Services <small>▼</small>
            </Nav.Link>
            <Nav.Link href="#recipes" className="px-3 text-dark">Recipes</Nav.Link>
            <Nav.Link href="#about" className="px-3 text-dark">About Us</Nav.Link>
            <Nav.Link href="#contact" className="px-3 text-dark">Contact</Nav.Link>
          </Nav>

          {/* 3. BUTTON - Pinned Right */}
          <div className="d-flex align-items-center justify-content-end">
            <Button 
              variant="outline-dark" 
              className="rounded-0 px-4 py-2 fw-bold"
              style={{ border: '2px solid black', letterSpacing: '1px' }}
            >
              SHOP NOW
            </Button>
          </div>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PamhofuNavbar;