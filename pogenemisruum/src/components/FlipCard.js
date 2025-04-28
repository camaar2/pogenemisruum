import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FlipCard.css';

function FlipCard({ frontImg, backText, navigateTo }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo);
  };

  return (
    <div className="flip-card" onClick={handleClick}>
      <div className="flip-card-inner">
        {/* Front side (image) */}
        <div className="flip-card-front">
          <img src={frontImg} alt="front" />
        </div>

        {/* Back side (text) */}
        <div className="flip-card-back">
          <p>{backText}</p>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
