import { useState } from 'react';
import { Container, Row, Col, Nav, Card } from 'react-bootstrap';
import beefChuck from '../assets/productImages/beefChuck.jpg';
import beefBrisket from '../assets/productImages/beefBrisket.jpg';
import beefLoin from '../assets/productImages/beefLoin.jpg';
import beefRibs from '../assets/productImages/beefRibs.jpg';
import beefFlank from '../assets/productImages/beefFlank.jpg';
import beefRound from '../assets/productImages/beefRound.jpg';
import goatFlank from '../assets/productImages/goatFlank.jpg';
import goatLegs from '../assets/productImages/goatLegs.jpg';
import goatLoin from '../assets/productImages/goatLoin.jpg';
import goatRibs from '../assets/productImages/goatRibs.jpg';
import goatShoulder from '../assets/productImages/goatShoulder.jpg';
import goatNeck from '../assets/productImages/goatNeck.jpg';
import porkBelly from '../assets/productImages/porkBelly.jpg';
import porkJowl from '../assets/productImages/porkJowl.jpg';
import porkLegs from '../assets/productImages/porkLegs.jpg';
import porkLoin from '../assets/productImages/porkLoin.jpg';
import porkRibs from '../assets/productImages/porkRibs.jpg';
import porkTrotters from '../assets/productImages/porkTrotters.jpg';

const ProductSection = () => {
  // Set initial tab to 'beef'
  const [activeTab, setActiveTab] = useState('beef');

  // Updated product data based on your specific requirements
  const products = [
    // BEEF PRODUCTS
    { id: 1, name: 'Chuck', desc: 'Versatile cut from the shoulder, perfect for pot roasts.', category: 'beef', img: beefChuck },
    { id: 2, name: 'Rib', desc: 'Rich, flavorful, and tender; home of the ribeye steak.', category: 'beef', img: beefRibs },
    { id: 3, name: 'Loin', desc: 'The source of the most tender cuts like filet mignon.', category: 'beef', img: beefLoin },
    { id: 4, name: 'Round', desc: 'Lean and economical, great for roasting or jerky.', category: 'beef', img: beefRound },
    { id: 5, name: 'Brisket', desc: 'Tougher cut made tender through slow cooking.', category: 'beef', img: beefBrisket },
    { id: 6, name: 'Plate and Flank', desc: 'Deep beefy flavor, ideal for fajitas or stir-fry.', category: 'beef', img: beefFlank },

    // GOAT MEAT PRODUCTS
    { id: 7, name: 'Legs', desc: 'Meaty and lean, ideal for roasting whole.', category: 'goat', img: goatLegs },
    { id: 8, name: 'Loin', desc: 'Tender and juicy, perfect for quick chops.', category: 'goat', img: goatLoin },
    { id: 9, name: 'Rib', desc: 'Succulent and flavorful, great for BBQ.', category: 'goat', img: goatRibs },
    { id: 10, name: 'Shoulder', desc: 'Best for slow-braising or stews.', category: 'goat', img: goatShoulder },
    { id: 11, name: 'Breast and Flank', desc: 'Thin and flavorful, great for rolling.', category: 'goat', img: goatFlank },
    { id: 12, name: 'Neck', desc: 'Rich in collagen, provides amazing depth to soups.', category: 'goat', img: goatNeck },

    // PORK PRODUCTS
    { id: 13, name: 'Loin', desc: 'The leanest and most tender part of the pig.', category: 'pork', img: porkLoin },
    { id: 14, name: 'Belly', desc: 'Rich, fatty, and used for bacon or pork belly burnt ends.', category: 'pork', img: porkBelly },
    { id: 15, name: 'Leg', desc: 'Often cured into hams or roasted whole.', category: 'pork', img: porkLegs },
    { id: 16, name: 'Spare Ribs', desc: 'Classic BBQ cut with a balance of meat and fat.', category: 'pork', img: porkRibs },
    { id: 17, name: 'Jowl', desc: 'Incredibly flavorful, often used for guanciale.', category: 'pork', img: porkJowl },
    { id: 18, name: 'Trotters', desc: 'Smoky and salty, perfect for flavoring beans or greens.', category: 'pork', img: porkTrotters },
  ];

  // Logic to filter products based on the selected tab
  const filteredProducts = products.filter(p => p.category === activeTab);

  return (
    <Container className="py-5" style={{ fontFamily: 'Arial, sans-serif' }}>
      
      {/* 1. THE TAB NAVIGATION */}
      <Nav 
        variant="pills" 
        activeKey={activeTab} 
        onSelect={(k) => setActiveTab(k)}
        className="mb-5 border border-dark p-0 rounded-0 overflow-hidden"
      >
        <Nav.Item className="flex-fill text-center m-0">
          <Nav.Link 
            eventKey="beef" 
            className={`rounded-0 py-3 fw-bold border-end border-dark ${activeTab === 'beef' ? 'bg-primary text-white' : 'bg-light text-muted'}`}
            style={activeTab === 'beef' ? { backgroundColor: '#44438E' } : {}}
          >
            BEEF
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="flex-fill text-center m-0">
          <Nav.Link 
            eventKey="goat" 
            className={`rounded-0 py-3 fw-bold border-end border-dark ${activeTab === 'goat' ? 'bg-primary text-white' : 'bg-light text-muted'}`}
            style={activeTab === 'goat' ? { backgroundColor: '#44438E' } : {}}
          >
            GOAT MEAT
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="flex-fill text-center m-0">
          <Nav.Link 
            eventKey="pork" 
            className={`rounded-0 py-3 fw-bold ${activeTab === 'pork' ? 'bg-primary text-white' : 'bg-light text-muted'}`}
            style={activeTab === 'pork' ? { backgroundColor: '#44438E' } : {}}
          >
            PORK
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* 2. THE PRODUCT GRID */}
      <Row className="g-4">
        {filteredProducts.map((product) => (
          <Col md={6} lg={4} key={product.id}>
            <Card className="border-1 rounded-0 p-3 h-100 shadow-sm border-secondary">
              <Row className="g-0 align-items-center">
                
                {/* Product Image Placeholder */}
                {/* Product Image Placeholder */}
                <Col xs={4}>
                  <div 
                    className="border d-flex align-items-center justify-content-center overflow-hidden"
                    style={{ aspectRatio: '1/1' }}
                  >
                    {product.img ? (
                      <img 
                        src={product.img} 
                        alt={product.name} 
                        className="img-fluid w-100 h-100" 
                        style={{ objectFit: 'cover' }} 
                      />
                    ) : (
                      <div className="text-muted small text-center p-1">
                        {product.name} <br/> NO IMAGE
                      </div>
                    )}
                  </div>
                </Col>

                {/* Product Details */}
                <Col xs={8} className="ps-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <h6 className="fw-bold mb-1 text-uppercase">{product.name}</h6>
                    <small className="text-muted">▼</small>
                  </div>
                  <p className="text-muted mb-2" style={{ fontSize: '13px', lineHeight: '1.2' }}>
                    {product.desc}
                  </p>
                  <a 
                    href="#" 
                    className="text-dark fw-bold small text-decoration-underline"
                    style={{ fontSize: '11px', letterSpacing: '0.5px' }}
                  >
                    VIEW DETAILS
                  </a>
                </Col>

              </Row>
            </Card>
          </Col>
        ))}
      </Row>

    </Container>
  );
};

export default ProductSection;