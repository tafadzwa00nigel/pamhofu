import { useState } from 'react';
import { Container, Row, Col, Nav, Card } from 'react-bootstrap';

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState('fresh');

  // Sample data to simulate your "What's Fresh", "New Arrivals", etc.
  const products = [
    { id: 1, name: 'Premium Ribeye', desc: 'Marbled to perfection, cultivated for flavor.', category: 'fresh' },
    { id: 2, name: 'Sirloin Strip', desc: 'Lean, tender, and ethically sourced.', category: 'fresh' },
    { id: 3, name: 'Signature Wagyu', desc: 'The gold standard of cultivated beef.', category: 'new' },
    { id: 4, name: 'Tenderloin Filet', desc: 'Buttery texture with a clean finish.', category: 'fresh' },
    { id: 5, name: 'Bison Blend', desc: 'A robust, gamey profile for the bold.', category: 'special' },
    { id: 6, name: 'Dry-Aged Medallion', desc: 'Deep flavor profile, aged 21 days.', category: 'special' },
  ];

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
            eventKey="fresh" 
            className={`rounded-0 py-3 fw-bold border-end border-dark ${activeTab === 'fresh' ? 'bg-dark text-white' : 'bg-light text-muted'}`}
          >
            BEEF
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="flex-fill text-center m-0">
          <Nav.Link 
            eventKey="new" 
            className={`rounded-0 py-3 fw-bold border-end border-dark ${activeTab === 'new' ? 'bg-dark text-white' : 'bg-light text-muted'}`}
          >
            GOAT MEET
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="flex-fill text-center m-0">
          <Nav.Link 
            eventKey="special" 
            className={`rounded-0 py-3 fw-bold ${activeTab === 'special' ? 'bg-dark text-white' : 'bg-light text-muted'}`}
          >
            PORK
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* 2. THE PRODUCT GRID (3x2 as per wireframe) */}
      <Row className="g-4">
        {products.map((product) => (
          <Col md={6} lg={4} key={product.id}>
            <Card className="border-1 rounded-0 p-3 h-100 shadow-sm border-secondary">
              <Row className="g-0 align-items-center">
                
                {/* Product Image Placeholder */}
                <Col xs={4}>
                  <div 
                    className="bg-light border d-flex align-items-center justify-content-center text-muted fw-bold text-center"
                    style={{ aspectRatio: '1/1', fontSize: '10px' }}
                  >
                    PRODUCT <br/> IMAGE
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