import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Viirusetõrje paigaldamine",
    content: `
**Viirusetõrje** on esimene samm: install paigaldab põhifailid ja taustteenused,
mis skaneerivad pahavara.
`
  },
  {
    id: 2,
    title: "Reaalajas skaneerimise lubamine",
    content: `
**Reaalajas skaneerimine** jälgib sisse- ja väljaminevat faile jooksvalt,
et vältida pahavara levikut.
`
  },
  {
    id: 3,
    title: "Turvabaasi värskendamine",
    content: `
**Turvabaas** sisaldab pahavara allkirju ja mustreid.
Uuendamine tagab, et uusimad ohud on tuvastatavad.
`
  },
  {
    id: 4,
    title: "Manuste blokeerimine",
    content: `
**Tundmatud manusfailid** võivad kätkeda pahavara.
Manuste blokeerimine vähendab rünnakupinda.
`
  }
];

export default function InfoturbeJuht2Leht() {
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
        <button onClick={() => navigate('/infoturbe_juht2')}>
          Alusta turvatarkvara paigaldust
        </button>
      </div>
    </div>
  );
}
