import React from 'react';
import '../CSS/Kontakt.css';

function Kontakt() {
  return (
    <div className="kontakt-container">
      <div className="kontakt-left">
        <h2>Kontakteeru Carmeniga</h2>
        <div className="contact-item">
          <a 
            href="https://www.linkedin.com/in/carmen-maar-885b9924b" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img src="/linkedin.png" alt="LinkedIn" className="contact-icon" />
            <span>LinkedIn</span>
          </a>
        </div>
        <div className="contact-item">
          <a href="mailto:camaar@taltech.ee">
            <img src="/hotmail.png" alt="Email" className="contact-icon" />
            <span>Email</span>
          </a>
        </div>
      </div>
      <div className="kontakt-right">
        <h2>Kontakteeru Kristoferiga</h2>
        <div className="contact-item">
          <a 
            href="https://www.linkedin.com/in/kristofer-s%C3%A4%C3%A4lik-401bb424b/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img src="/linkedin.png" alt="LinkedIn" className="contact-icon" />
            <span>LinkedIn</span>
          </a>
        </div>
        <div className="contact-item">
          <a href="mailto:krsaal@taltech.ee">
            <img src="/hotmail.png" alt="Email" className="contact-icon" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Kontakt;
