import React from 'react';
import redMeatBg from '../assets/red-meat-bg.jpg';
import superImg from '../assets/super.webp';
import choiceImg from '../assets/choice.webp';
import commercialImg from '../assets/commercial.webp';
import economyImg from '../assets/economy.webp'; 

const MeatWholesaleSection = () => {
  
  // ==========================================
  // 1. COMPOSITION OF DATA (SEPARATE LISTS)
  // ==========================================

  // Array of your core Beef offer
  const beefData = [
    { grade: 'Super', side: '5.00', fore: '5.20', hind: '5.50' },
    { grade: 'Choice', side: '4.20', fore: '4.40', hind: '4.50' },
    { grade: 'Commercial', side: '3.80', fore: '3.99', hind: '4.20' },
    { grade: 'Economy', side: '3.60', fore: '3.80', hind: '4.00' },
  ];

  // Array of secondary/grouped items
  const specialtyData = [
    { type: 'Rough Offals', item: 'Tripe/Guru', price: '2.00', secondaryPrice: '-' },
    { type: 'Rough Offals', item: 'Casings/Matumbu', price: '2.00', secondaryPrice: '-' },
    { type: 'Rough Offals', item: 'Lungs', price: '2.00', secondaryPrice: '-' },
    { type: 'Rough Offals', item: 'Mazondo', price: '10.00', secondaryPrice: '-' },
    { type: 'Rough Offals', item: 'Heart', price: '3.50', secondaryPrice: '-' },
    { type: 'Rough Offals', item: 'Head', price: '15.00 - 20.00', secondaryPrice: '-' },
    { type: 'Rought Offals', item: 'Oxtail', price: '6.00', secondaryPrice: '-' },
    { type: 'Pork', item: 'Pork', price: '3.80', secondaryPrice: '-' },
  ];

  // (Optional: You could also filter this from one master array)
  const offalsData = specialtyData.filter(item => item.type === 'Rough Offals');
  const porkData = specialtyData.filter(item => item.type === 'Pork');


  const tierImages = [superImg, choiceImg, commercialImg, economyImg];

  const sectionStyle = {
    backgroundImage: `url(${redMeatBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed', // Keep that parallax effect!
    minHeight: '80vh',
    width: '100%',
    padding: '60px 0',
    position: 'relative',
    color: 'white'
  };

  return (
    <section style={sectionStyle} className="container-fluid">
      <div className="container">
        
        {/* Tier Cards Row */}
        <div className="row g-4 mb-5 justify-content-center">
          {tierImages.map((img, index) => (
            <div key={index} className="col-6 col-md-3">
              <img 
                src={img} 
                alt="Meat Grade" 
                className="img-fluid shadow-lg" 
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
          ))}
        </div>

        {/* ==========================================
            2. COMPOSITION OF MAIN BEEF TABLE (STAYS FULL WIDTH)
            ========================================== */}
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-lg-10">
            <div className="table-responsive bg-transparent border-0">
              <table className="table table-borderless wholesale-table align-middle text-center mb-0">
                <thead className="text-uppercase border-bottom border-white border-2">
                  <tr>
                    <th rowSpan="2" className="align-middle fw-bold fs-4 py-3">Grade</th>
                    <th className="py-3 fw-bold fs-5">Side</th>
                    <th className="py-3 fw-bold fs-5">Fore Quarter</th>
                    <th className="py-3 fw-bold fs-5">Hind Quarter</th>
                  </tr>
                </thead>
                <tbody className="fw-normal">
                  {beefData.map((row, idx) => (
                    <tr key={idx} className="border-bottom border-white border-opacity-25">
                      <td className="fw-bold text-start ps-4 py-3 fs-5">{row.grade}</td>
                      <td className="py-3 fs-5 text-end">${row.side}<small className="opacity-75">/kg</small></td>
                      <td className="py-3 fs-5 text-end">${row.fore}<small className="opacity-75">/kg</small></td>
                      <td className="py-3 fs-5 text-end">${row.hind}<small className="opacity-75">/kg</small></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ==========================================
            3. COMPOSITION OF SIDE-BY-SIDE TABLES
            ========================================== */}
        <div className="row g-4 justify-content-center">
          
          {/* A. Offals Table Column */}
          <div className="col-12 col-md-5">
            <div className="bg-transparent border-0">
              <table className="table table-borderless wholesale-table align-middle mb-0">
                <thead className="text-uppercase border-bottom border-white border-2 text-center">
                  <tr>
                    <th colSpan="2" className="py-3 fw-bold fs-4">Rough Offals</th>
                  </tr>
                </thead>
                <tbody className="fw-normal">
                  {offalsData.map((row, idx) => (
                    <tr key={idx} className="border-bottom border-white border-opacity-25">
                      <td className="fw-bold text-start ps-4 py-3 fs-5">{row.item}</td>
                      <td className="py-3 fs-5 text-end">${row.price}<small className="opacity-75">/kg</small></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* B. Pork Table Column */}
          <div className="col-12 col-md-5">
            <div className="bg-transparent border-0">
              <table className="table table-borderless wholesale-table align-middle mb-0">
                <thead className="text-uppercase border-bottom border-white border-2 text-center">
                  <tr>
                    <th colSpan="2" className="py-3 fw-bold fs-4">Pork</th>
                  </tr>
                </thead>
                <tbody className="fw-normal">
                  {porkData.map((row, idx) => (
                    <tr key={idx} className="border-bottom border-white border-opacity-25">
                      <td className="fw-bold text-start ps-4 py-3 fs-5">{row.item}</td>
                      <td className="py-3 fs-5 text-end">${row.price}<small className="opacity-75">/kg</small></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default MeatWholesaleSection;