import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on GDPR?",
    content: `
**GDPR (General Data Protection Regulation)** on EL-i andmekaitse üldmäärus,
mis sätestab reeglid isikuandmete töötlemiseks ja kaitsmiseks.
Fookus on andmesubjekti õigustel ja andmete nõuetekohasel käitlemisel.
`
  },
  {
    id: 2,
    title: "Mis on NIS2 direktiiv?",
    content: `
**NIS2 (Network and Information Security)** on EL-i direktiiv, mis täiendab
ja laiendab varasema NIS direktiivi, kohustades teenusepakkujaid tugevdama
küberturbe meetmeid ja teavitama intsidentidest.
`
  },
  {
    id: 3,
    title: "Miks ei kehti ISO 27001 standard?",
    content: `
**ISO 27001** on rahvusvaheline infoturbe juhtimissüsteemi standard, mitte õigusakt.
Kuigi see on oluline raamistik, ei ole see seaduslikult kohustuslik ilma
riigi või lepingu alusel.
`
  },
  {
    id: 4,
    title: "Põllumajanduse toetuste seadus",
    content: `
See seadus reguleerib põllumajandustoetusi ja ei sisalda
spetsiifilisi küberturbe nõudeid.
`
  }
];

export default function TurvapoliitikaEestvedaja1Leht() {
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
        <button onClick={() => navigate('/turvapoliitika_eestvedaja1')}>
          Alusta nõuete valideerimist
        </button>
      </div>
    </div>
  );
}
