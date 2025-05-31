import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Operatsiooniline vs strateegiline info",
    content: `
**Operatsiooniline info** käsitleb igapäevaseid tegevusi ja protseduure, mis on vajalikud süsteemide haldamiseks.  
**Strateegiline info** seab pikaajalised eesmärgid, prioriteedid ja suunised, mis toetavad otsuste tegemist kõrgemal tasemel.
`
  },
  {
    id: 2,
    title: "Taktikaline info",
    content: `
**Taktikaline info** keskendub lühiajalistele tegevustele intsidendi lahendamisel,  
tagades kiire reageerimine ja spetsiifilised juhised meeskondadele.
`
  },
  {
    id: 3,
    title: "Juhtimisinfo roll",
    content: `
**Juhtimisinfo** annab ülevaate protsessidest ja otsuste tegemise raamistikust,  
mitte spetsiifiliselt intsidendi detailidest.
`
  }
];

export default function SundmusteReageerija2Leht() {
  const navigate = useNavigate();

  return (
    <div className="tutorial-page">
      {tutorialSections.map(sec => (
        <section key={sec.id} className="tutorial-section">
          <h2>{sec.title}</h2>
          <div className="tutorial-content">
            <ReactMarkdown>{sec.content}</ReactMarkdown>
          </div>
        </section>
      ))}

      <div className="tutorial-footer">
        <button onClick={() => navigate('/sundmuste_reageerija2')}>
          Alusta kommunikatsiooni harjutust
        </button>
      </div>
    </div>
  );
}
