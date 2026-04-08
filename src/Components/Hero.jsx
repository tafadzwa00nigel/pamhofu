import { Container, Button } from 'react-bootstrap';
// 1. IMPORT the video so Vite tracks it
import meatVideo from '../assets/videos/MEAT.mp4';

const Hero = () => {
  return (
    <section className="position-relative overflow-hidden w-100" style={{ height: '600px' }}>
      
      <video
        autoPlay
        loop
        muted
        playsInline
        className="position-absolute w-100 h-100"
        style={{ objectFit: 'cover', zIndex: 1, top: 0, left: 0 }}
      >
        {/* 2. Use the imported variable meatVideo */}
        <source src={meatVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div 
        className="position-absolute w-100 h-100" 
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.45)', 
          zIndex: 2, 
          top: 0, 
          left: 0 
        }} 
      />

      <Container fluid className="h-100 d-flex flex-column justify-content-center align-items-center text-center text-white mw-100">
        <h1 
          className="fw-bold text-uppercase mb-3" 
          style={{ fontSize: '42px', letterSpacing: '3px', fontFamily: 'Arial, sans-serif' }}
        >
          Premium Cultivated Meats
        </h1>

        <p 
          className="mb-5 mx-auto" 
          style={{ fontSize: '18px', maxWidth: '800px', fontWeight: '300', opacity: 0.9 }}
        >
          The future of protein, crafted with cellular precision. 
          Experience the finest cuts, ethically sourced.
        </p>

        <Button 
          variant="light" 
          className="rounded-0 px-5 py-3 text-uppercase fw-bold border-0"
          style={{ 
            fontSize: '15px', 
            letterSpacing: '2px',
            backgroundColor: '#f8f9fa',
            color: '#000'
          }}
        >
          Browse Our Collection
        </Button>
      </Container>
    </section>
  );
};

export default Hero;