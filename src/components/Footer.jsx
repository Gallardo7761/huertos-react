import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../css/Footer.css';

const Footer = () => {
  const [heart, setHeart] = useState('💜');

  useEffect(() => {
    const hearts = ["❤️", "💛", "🧡", "💚", "💙", "💜"];
    const randomHeart = () => hearts[Math.floor(Math.random() * hearts.length)];

    const interval = setInterval(() => {
      setHeart(randomHeart());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <h4 className="footer-title">Datos de Contacto</h4>
        <div className="contact-info">
          <a
            href="https://www.google.com/maps?q=Calle+Cronos+S/N,+Bellavista,+Sevilla,+41014"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLocationDot} className="fa-icon" />
            Calle Cronos S/N, Bellavista, Sevilla, 41014
          </a>
          <a href="mailto:huertoslasaludbellavista@gmail.com">
            <FontAwesomeIcon icon={faEnvelope} className="fa-icon" />
            huertoslasaludbellavista@gmail.com
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <h6 id="devd" className="text-center">
          Made with <span className="heart-anim">{heart}</span> by{' '}
          <a href="https://gallardo.dev" target="_blank" rel="noopener noreferrer">
            Gallardo7761
          </a>
        </h6>
      </div>
    </footer>
  );
};

export default Footer;