import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: 'Auditiks vajaliku dokumentatsiooni kogumine',
    content: `
**Turvapoliitika dokumentatsioon** sisaldab kõiki reegleid, protseduure ja vastutusi, mis tagavad organisatsiooni turvalisuse.
`
  },
  {
    id: 2,
    title: 'Juurdepääsukontrollide logid',
    content: `
**Ligipääsukontrollide logid** dokumenteerivad, kes ja millal süsteemidesse sisse logis, mis on auditis oluline.
`
  },
  {
    id: 3,
    title: 'Mittekriitilise info vältimine',
    content: `
**Töötajate isiklikud e-kirjad** ja **kohvikumenüü** ei ole auditiks asjakohased ning täiendavad segajaid.
`
  }
];

export default function TurvapoliitikaEestvedaja3Leht() {
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
        <button onClick={() => navigate('/turvapoliitika_eestvedaja3')}>
          Alusta auditi ettevalmistust
        </button>
      </div>
    </div>
  );
}
