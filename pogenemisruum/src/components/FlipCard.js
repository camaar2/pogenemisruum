import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FlipCard.css';

export default function FlipCard({ frontImg, backText, navigateTo }) {
  const navigate = useNavigate();

  const frontSrc = process.env.PUBLIC_URL + `/${frontImg}`;

  return (
    <div className="flip-card" onClick={() => navigate(navigateTo)}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={frontSrc} alt={backText} />
        </div>
        <div className="flip-card-back">
          <p>{backText}</p>
        </div>
      </div>
    </div>
  );
}
