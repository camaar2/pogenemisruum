import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "INFO, WARNING ja ERROR logide tähendus",
    content: `
**INFO** annab teada süsteemi normaalsetest tegevustest.  
**WARNING** hoiatab ebatavalisest tegevusest, mis võib viidata riskile.  
**ERROR** tähistab tõsist viga või turvalünka, mis vajab kohest tähelepanu.
`
  },
  {
    id: 2,
    title: "Sisselogimiskatsete kaitse",
    content: `
Korduvad ebaõnnestunud SSH sisselogimised (ERROR) võivad viidata murtud parooli  
või automatiseeritud rünnakule. Jälgi hoolega.
`
  },
  {
    id: 3,
    title: "Faili muutuste jälgimine",
    content: `
Ebatavalised failimuutused süsteemifailides (/etc/passwd) on tõend võimalikust  
ohujõust või pahatahtlikust tarkvarast. Kiire reageerimine on oluline.
`
  }
];

export default function KuberturbeRiskijuht3Leht() {
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
        <button onClick={() => navigate('/kuberturbe_riskijuht3')}>
          Alusta logianalüüsi
        </button>
      </div>
    </div>
  );
}
