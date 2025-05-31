import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Võrgu segmentimine",
    content: `
**Võrgu segmentimine** jagab võrgu eraldi osadeks (subnetid või VLAN-id),
et takistada pahavara levikut ja piirata ligipääsu kriitilistele ressurssidele.
`
  },
  {
    id: 2,
    title: "Kahefaktoriline autentimine (2FA)",
    content: `
**2FA** nõuab kahte erinevat autentimistegurit (nt parool + SMS-kood),
et tugevdada kontode turvalisust ja vähendada volitamata ligipääsu riski.
`
  }
];

export default function Rakendaja4Leht() {
  const navigate = useNavigate();

  return (
    <div className="tutorial-page">
      {tutorialSections.map(sec => (
        <section key={sec.id} className="tutorial-section">
          <h2>{sec.title}</h2>
          <div className="tutorial-content">
            <ReactMarkdown>
              {sec.content}
            </ReactMarkdown>
          </div>
        </section>
      ))}

      <div className="tutorial-footer">
        <button onClick={() => navigate('/rakendaja4')}>
          Alusta teadmiste kontrolli
        </button>
      </div>
    </div>
  );
}