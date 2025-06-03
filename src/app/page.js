'use client';
import Image from "next/image";
import color from "./images/color.jpeg";
import { useState, useEffect, useRef } from "react";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showBioModal, setShowBioModal] = useState(false);
  const [showPressModal, setShowPressModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const mainRef = useRef(null);

  // Debug useEffect
  useEffect(() => {
    console.log('Menu or Modal state changed:', {
      isMobileMenuOpen,
      isModalOpen,
      showModal,
      showBioModal,
      showPressModal
    });

    if (isMobileMenuOpen || isModalOpen) {
      console.log('Attempting to disable scroll');
      try {
        disableBodyScroll(mainRef.current, {
          reserveScrollBarGap: true,
          allowTouchMove: (el) => {
            // Allow touch move on modal content
            return el.closest('.modal-content') !== null;
          }
        });
        console.log('Scroll disabled successfully');
      } catch (error) {
        console.error('Error disabling scroll:', error);
      }
    } else {
      console.log('Attempting to enable scroll');
      try {
        enableBodyScroll(mainRef.current);
        console.log('Scroll enabled successfully');
      } catch (error) {
        console.error('Error enabling scroll:', error);
      }
    }

    return () => {
      console.log('Cleanup: enabling scroll');
      if (mainRef.current) {
        enableBodyScroll(mainRef.current);
      }
    };
  }, [isMobileMenuOpen, isModalOpen, showModal, showBioModal, showPressModal]);

  // Debug toggle function
  const toggleMobileMenu = () => {
    console.log('Toggle menu clicked, current state:', isMobileMenuOpen);
    if (!isModalOpen) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  // Debug modal handlers
  const handleModalOpen = (modalType) => {
    console.log('Opening modal:', modalType);
    setIsModalOpen(true);
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
    
    setTimeout(() => {
      console.log('Closing mobile menu after timeout');
      setIsMobileMenuOpen(false);
    }, 500);
  };

  const handleModalClose = () => {
    console.log('Closing all modals');
    setIsModalOpen(false);
    setShowModal(false);
    setShowBioModal(false);
    setShowPressModal(false);
  };

  return (
    <div className="page">
      <main className="main" ref={mainRef}>
        <div className="navbar-container">
          <div className="navbar-inner">
            <div className="button-container-left">
              <div className="button">
                <a href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQGQPXle-Fi-YAAAAZckTHkomglSSWe1Wy8GypdDSeuk9HjHvBAaxeLdUpsRD-VDLQZqW48UzkDW0qKVqurWZEzrCTAxTy85ILWsZrSnK23AlIMH9jtkvGA3F3mR9PekC212Gbs=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fmichiko-mcgivney%2F" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
              <div className="button">
                <a href="mailto:mem355@cornell.edu">Mail</a>
              </div>
            </div>

            <div className="right-nav">
              <div className="button-container-right">
                <div className="button mobile-menu-button" onClick={() => handleModalOpen('bio')}>
                  <span>About Me</span>
                </div>
                <div className="button mobile-menu-button">
                  <span>Portfolio</span>
                </div>
                <div className="button mobile-menu-button" onClick={() => handleModalOpen('press')}>
                  <span>Press</span>
                </div>
                <div className="button mobile-menu-button">
                  <span>CV</span>
                </div>
              </div>
              <button 
                className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle Menu"
                style={{ display: 'flex' }}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>

            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
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
            <button className="close-button" onClick={handleModalClose}>
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
            <button className="close-button" onClick={handleModalClose}>
              ✕
            </button>
            <div className="modal-content">
              <h1>About Me</h1>
              <p className="bio-text">As the Head of Marketing for Support Women DJs, I drive brand growth through strategic, scrappy, and creative marketing. A builder at heart, I craft and scale high-impact campaigns that generate growth and conversions. With a detail-oriented and efficient approach, I've secured partnerships with Armada Music, Spotify, Equinox, and Glowbar, executed successful social media strategies, and elevated SWDJ's presence. By blending storytelling with data-driven insights, I create compelling narratives that captivate, convert, and position SWDJ for long-term success.</p>
            </div>
          </div>
        </div>
      )}

      {showPressModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={handleModalClose}>
              ✕
            </button>
            <div className="modal-content">
              <h1>Press</h1>
              <a href="https://daily-beat.com/support-women-djs-24-hour-femme-dj-marathon/" className="press-text">Feature 1</a>
              <a href="https://ra.co/events/2132685" className="press-text">Feature 2</a>
            </div>
          </div>
        </div>
      )}
    </div>  
  );
}
