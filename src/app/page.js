'use client';
import Image from "next/image";
import color from "./images/color.jpeg";
import { useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showBioModal, setShowBioModal] = useState(false);
  const [showPressModal, setShowPressModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleModalOpen = (modalType) => {
    closeMobileMenu();
    switch(modalType) {
      case 'mail':
        setShowModal(true);
        break;
      case 'bio':
        setShowBioModal(true);
        break;
      case 'press':
        setShowPressModal(true);
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="page">
      <main className="main">
        <div className="header">
          <div className="button-container">
            <div className="button-container-left">
              <div className="button">
                <a href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQGQPXle-Fi-YAAAAZckTHkomglSSWe1Wy8GypdDSeuk9HjHvBAaxeLdUpsRD-VDLQZqW48UzkDW0qKVqurWZEzrCTAxTy85ILWsZrSnK23AlIMH9jtkvGA3F3mR9PekC212Gbs=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fmichiko-mcgivney%2F" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
              <div className="button" onClick={() => handleModalOpen('mail')}>
                <span>Mail</span>
              </div>
            </div>
            <div className="button-container-right">
              <div className="button" onClick={() => handleModalOpen('bio')}>
                <span>About Me</span>
              </div>
              <div className="button">
                <span>Portfolio</span>
              </div>
              <div className="button" onClick={() => handleModalOpen('press')}>
                <span>Press</span>
              </div>
              <div className="button">
                <span>CV</span>
              </div>
            </div>
            <div className="hamburger-menu" onClick={toggleMobileMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <button className="close-button" onClick={closeMobileMenu}>✕</button>
          <div className="mobile-menu-content">
            <div className="button" onClick={() => handleModalOpen('bio')}>
              <span>About Me</span>
            </div>
            <div className="button">
              <span>Portfolio</span>
            </div>
            <div className="button" onClick={() => handleModalOpen('press')}>
              <span>Press</span>
            </div>
            <div className="button">
              <span>CV</span>
            </div>
          </div>
        </div>

        <div className="parent">
        <div className="img-container">
              <Image 
                src={color} 
                className="image" 
                alt="logo" 
                width={300} 
                height={300}
                quality={100}
                priority
              />
        </div>
        <div className="container">
          <div className="body">
            <h1>
              <span>Michiko McGivney</span>
            </h1>
            <p>Michiko is a former Division 1, four-year letter winner student-athlete at Cornell University, where she played softball and developed the discipline, teamwork, and resilience that fueled her career in marketing.</p>
            <p>With 8+ years of experience in brand strategy, public relations, business development, digital marketing, and partnerships, Michiko brings a mix of creativity and strategic execution to everything that she does.</p>
            <div className="button-container-spc">
          <div className="button-spc">
            <span>View CV</span>
          </div>
          <div className="button-spc" onClick={() => handleModalOpen('mail')}>
            <span>Contact</span>
          </div>
          
          </div>
          </div>
        
        </div>
        </div>  
        
       
      </main>
      
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={() => setShowModal(false)}>
              ✕
            </button>
            <div className="modal-content">
              <p>email@example.com</p>
            </div>
          </div>
        </div>
      )}

      {showBioModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={() => setShowBioModal(false)}>
              ✕
            </button>
            <div className="modal-content">
              <h1>Bio</h1>
              <p>As the Head of Marketing for Support Women DJs, I drive brand growth through strategic, scrappy, and creative marketing. A builder at heart, I craft and scale high-impact campaigns that generate growth and conversions. With a detail-oriented and efficient approach, I've secured partnerships with Armada Music, Spotify, Equinox, and Glowbar, executed successful social media strategies, and elevated SWDJ's presence. By blending storytelling with data-driven insights, I create compelling narratives that captivate, convert, and position SWDJ for long-term success.</p>
            </div>
          </div>
        </div>
      )}

      {showPressModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={() => setShowPressModal(false)}>
              ✕
            </button>
            <div className="modal-content">
              <h1>Press</h1>
              <p>Press content will go here.</p>
              <p>Press content will go here.</p>
            </div>
          </div>
        </div>
      )}
    </div>  
  );
}
