import { useState } from 'react';
import { Container, Row, Col, Nav, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { products } from '../data/products'; // Use the external data source

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState('beef');

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
            className={`rounded-0 py-3 fw-bold border-end border-dark ${activeTab === 'beef' ? 'text-white' : 'bg-light text-muted'}`}
            style={activeTab === 'beef' ? { backgroundColor: '#43428D' } : {}}
          >
            BEEF
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="flex-fill text-center m-0">
          <Nav.Link 
            eventKey="goat" 
            className={`rounded-0 py-3 fw-bold border-end border-dark ${activeTab === 'goat' ? 'text-white' : 'bg-light text-muted'}`}
            style={activeTab === 'goat' ? { backgroundColor: '#43428D' } : {}}
          >
            GOAT MEAT
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="flex-fill text-center m-0">
          <Nav.Link 
            eventKey="pork" 
            className={`rounded-0 py-3 fw-bold ${activeTab === 'pork' ? 'text-white' : 'bg-light text-muted'}`}
            style={activeTab === 'pork' ? { backgroundColor: '#43428D' } : {}}
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

                <Col xs={8} className="ps-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <h6 className="fw-bold mb-1 text-uppercase">{product.name}</h6>
                    <small className="text-muted">▼</small>
                  </div>
                  <p className="text-muted mb-2" style={{ fontSize: '13px', lineHeight: '1.2' }}>
                    {product.desc}
                  </p>
                  
                  {/* CHANGED: Link to the dynamic route using product.slug */}
                  <Link 
                    to={`/product/${product.slug}`} 
                    className="text-dark fw-bold small text-decoration-underline"
                    style={{ fontSize: '11px', letterSpacing: '0.5px' }}
                  >
                    VIEW DETAILS
                  </Link>
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