import { Container, Button } from 'react-bootstrap';
// 1. IMPORT the video so Vite tracks it
import meatVideo from '../assets/videos/MEAT.mp4';

const Hero = () => {
  return (
    <section className="position-relative overflow-hidden w-100" style={{ height: '400px' }}>
      
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
    </section>
  );
};

export default Hero;