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
  const [isModalClosing, setIsModalClosing] = useState(false);
  
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
    console.log('Starting modal close animation');
    setIsModalClosing(true);
    
    // Wait for animation to complete before removing modal
    setTimeout(() => {
      console.log('Removing modal from DOM');
      setIsModalOpen(false);
      setShowModal(false);
      setShowBioModal(false);
      setShowPressModal(false);
      setIsModalClosing(false);
    }, 500); // Match this with the CSS transition duration
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
                  <a href="/Portfolio_Michiko_McGivney.pdf" target="_blank" rel="noopener noreferrer">
                    <span>Portfolio</span>
                  </a>
                </div>
                <div className="button mobile-menu-button" onClick={() => handleModalOpen('press')}>
                  <span>Press</span>
                </div>
                <div className="button mobile-menu-button">
                  <a href="/Resume_Michiko_McGivney.pdf" target="_blank" rel="noopener noreferrer">
                    <span>CV</span>
                  </a>
                </div>
              </div>
              <button 
                className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle Menu"
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
                  <a href="/portfolio.pdf" target="_blank" rel="noopener noreferrer">
                    <span>Portfolio</span>
                  </a>
                </div>
                <div className="button" onClick={() => handleModalOpen('press')}>
                  <span>Press</span>
                </div>
                <div className="button">
                  <a href="/Resume_Michiko_McGivney.pdf" target="_blank" rel="noopener noreferrer">
                    <span>CV</span>
                  </a>
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
            <p>Michiko is the Head of Marketing at Delirium Entertainment. A former Division 1, four-year letter winner student-athlete at Cornell University, Michiko developed the discipline, teamwork, and resilience that fueled her career in marketing.</p>
            <p>With 8+ years of experience in brand strategy, public relations, business development, digital marketing, and partnerships, Michiko brings a mix of creativity and strategic execution to everything that she does.</p>
            <div className="button-container-spc">
          <div className="button-spc">
            <a href="/Resume_Michiko_McGivney.pdf" target="_blank" rel="noopener noreferrer">
              <span>View CV</span>
            </a>
          </div>
          <div className="button-spc" >
                <a href="mailto:mem355@cornell.edu">Contact</a>
          </div>
          
          </div>
          </div>
        
        </div>
        </div>  
        
       
      </main>
      
      {showModal && (
        <div className={`modal-overlay ${isModalClosing ? 'closing' : ''}`}>
          <div className={`modal ${isModalClosing ? 'closing' : ''}`}>
            <button className="close-button" onClick={handleModalClose}>
              ✕
            </button>
            <div className={`modal-content ${isModalClosing ? 'closing' : ''}`}>
              <p>email@example.com</p>
            </div>
          </div>
        </div>
      )}

      {showBioModal && (
        <div className={`modal-overlay ${isModalClosing ? 'closing' : ''}`}>
          <div className={`modal ${isModalClosing ? 'closing' : ''}`}>
            <button className="close-button" onClick={handleModalClose}>
              ✕
            </button>
            <div className={`modal-content ${isModalClosing ? 'closing' : ''}`}>
              <h1>About Me</h1>
              <p className="bio-text">I'm a former Division 1, four-year letter winner student-athlete at Cornell University, where I played softball and developed the discipline, teamwork, and resilience that fueled my career in marketing. With 8+ years of experience in brand strategy, public relations, business development, digital marketing, and partnerships, I bring a mix of creativity and strategic execution to everything that I do. I'm excited to bring this mindset to a forward-thinking team where I can help sharpen strategy, elevate creative execution, and consistently deliver high-performing, human-centered marketing.</p>
            </div>
          </div>
        </div>
      )}

      {showPressModal && (
        <div className={`modal-overlay ${isModalClosing ? 'closing' : ''}`}>
          <div className={`modal ${isModalClosing ? 'closing' : ''}`}>
            <button className="close-button" onClick={handleModalClose}>
              ✕
            </button>
            <div className={`modal-content ${isModalClosing ? 'closing' : ''}`}>
              <h1>Press</h1>
              <a href="https://daily-beat.com/support-women-djs-24-hour-femme-dj-marathon/" className="press-text">"Support Women DJs 24-Hour Femme DJ Marathon" | Daily Beat, March 2025</a>
              <a href="https://ra.co/events/2132685" className="press-text">"RA Pick: 24 Hour Femme Loop" | Resident Advisor, March 2025</a>
            </div>
          </div>
        </div>
      )}
    </div>  
  );
}
