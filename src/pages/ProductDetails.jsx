import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Table, Card } from 'react-bootstrap';
import { products } from '../data/products';
import PamhofuNavbar from '../Components/navbar';

const ProductDetails = () => {
  const { slug } = useParams();

  // 1. DATA RETRIEVAL: Find the product that matches the URL slug
  const product = products.find((p) => p.slug === slug);

  // 2. ERROR HANDLING: If the slug doesn't exist
  if (!product) {
    return (
      <Container className="py-5 text-center" style={{ minHeight: '60vh' }}>
        <PamhofuNavbar/>
        <h2 className="fw-bold mb-4">PRODUCT NOT FOUND</h2>
        <p className="text-muted mb-4">The cut you are looking for doesn't seem to exist in our inventory.</p>
        <Button 
          as={Link} to="/" 
          variant="dark" 
          className="rounded-0 px-5 py-3 fw-bold"
          style={{ backgroundColor: '#43428D', border: 'none' }}
        >
          BACK TO ALL PRODUCTS
        </Button>
      </Container>
    );
  }

  // 3. RELATED PRODUCTS LOGIC: Filter products in the same category (excluding current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <Container className="py-5" style={{ fontFamily: 'Arial, sans-serif' }}>
      
      {/* BREADCRUMBS & BACK BUTTON */}
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <small className="text-muted text-uppercase" style={{ letterSpacing: '1px' }}>
          Products &gt; {product.category} &gt; <span className="text-dark fw-bold">{product.name}</span>
        </small>
        <Link to="/" className="text-dark fw-bold small text-decoration-none">
          ← BACK TO SHOP
        </Link>
      </div>

      <Row className="g-5">
        {/* LEFT SIDE: VISUAL FOCUS */}
        <Col lg={6}>
          <div className="border border-dark p-2 bg-white shadow-sm">
            <img 
              src={product.img} 
              alt={product.name} 
              className="img-fluid w-100" 
              style={{ objectFit: 'cover', minHeight: '400px' }}
            />
          </div>
        </Col>

        {/* RIGHT SIDE: DATA & SPECS */}
        <Col lg={6}>
          <Badge 
            className="rounded-0 px-3 py-2 mb-3 text-uppercase" 
            style={{ backgroundColor: '#43428D', letterSpacing: '1px' }}
          >
            Premium {product.category}
          </Badge>
          
          <h1 className="display-4 fw-bold mb-3 text-uppercase" style={{ letterSpacing: '-1px' }}>
            {product.name}
          </h1>

          <p className="lead text-muted mb-4" style={{ lineHeight: '1.6' }}>
            {product.details}
          </p>

          {/* COOKING GUIDE TABLE */}
          <div className="mb-5">
            <h6 className="fw-bold text-uppercase border-bottom border-dark pb-2 mb-3">Specs & Recommendations</h6>
            <Table bordered className="rounded-0 shadow-sm">
              <tbody>
                <tr>
                  <td className="bg-light fw-bold text-uppercase small" style={{ width: '35%' }}>Best For</td>
                  <td className="small">{product.category === 'beef' ? 'Grilling, Roasting' : 'Slow Braising, Stewing'}</td>
                </tr>
                <tr>
                  <td className="bg-light fw-bold text-uppercase small">Grade</td>
                  <td className="small">A-Grade / Hormone Free</td>
                </tr>
                <tr>
                  <td className="bg-light fw-bold text-uppercase small">Butcher Notes</td>
                  <td className="small">Hand-cut daily for maximum freshness.</td>
                </tr>
              </tbody>
            </Table>
          </div>

          <Button 
            variant="dark" 
            className="w-100 rounded-0 py-3 fw-bold shadow"
            style={{ backgroundColor: '#43428D', border: 'none', letterSpacing: '2px' }}
          >
            INQUIRE ABOUT THIS CUT
          </Button>
        </Col>
      </Row>

      {/* RELATED PRODUCTS SECTION */}
      {relatedProducts.length > 0 && (
        <div className="mt-5 pt-5 border-top border-dark">
          <h4 className="fw-bold text-uppercase mb-4">You Might Also Like</h4>
          <Row className="g-4">
            {relatedProducts.map((p) => (
              <Col md={4} key={p.id}>
                <Card as={Link} to={`/product/${p.slug}`} className="text-decoration-none border border-secondary rounded-0 h-100 shadow-sm">
                  <Card.Img variant="top" src={p.img} className="rounded-0" style={{ height: '180px', objectFit: 'cover' }} />
                  <Card.Body className="p-3 bg-light">
                    <h6 className="fw-bold text-dark text-uppercase mb-1">{p.name}</h6>
                    <small className="text-muted text-uppercase" style={{ fontSize: '10px' }}>VIEW DETAILS →</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        
      )}
    </Container>
    
  );
};

export default ProductDetails;