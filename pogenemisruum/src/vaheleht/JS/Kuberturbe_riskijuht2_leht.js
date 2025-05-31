import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Uuenduste allalaadimine",
    content: `
**Lae uuendused alla** on esimene samm: hankige turvapaigad ametlikust allikast,  
kontrollige failide terviklikkust ja digiallkirja enne installimist.
`
  },
  {
    id: 2,
    title: "Uuenduste paigaldamine",
    content: `
**Paigalda uuendused** süsteemi tasemel või rakenduse sees.  
Veenduge, et kõik komponendid uuendatakse vastavalt juhistele.
`
  },
  {
    id: 3,
    title: "Teenuste taaskäivitamine",
    content: `
**Taaskäivita teenused** või kogu süsteem, et rakendada uusi turvakonfiguratsioone  
ja laadida uuendatud moodulid.
`
  },
  {
    id: 4,
    title: "Turvahoiatuste kontrollimine",
    content: `
**Kontrolli turvahoiatusi** seire- ja logisüsteemides, et veenduda, et uuendused  
on edukalt rakendunud ega põhjusta uusi vigu.
`
  }
];

export default function KuberturbeRiskijuht2Leht() {
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
        <button onClick={() => navigate('/kuberturbe_riskijuht2')}>
          Alusta uuenduste järjekorda
        </button>
      </div>
    </div>
  );
}
