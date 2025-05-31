import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: 'Andmekaitseameti teavitamine',
    content: `
**Teavitamine andmekaitseametile** on õiguslik kohustus teatud rikkumiste korral,
et vältida sanktsioone ja näidata koostöövalmidust.
`
  },
  {
    id: 2,
    title: 'Mõjutatud isikute informeerimine',
    content: `
**Mõjutatud isikute informeerimine** tagab läbipaistvuse ja võimaldab kannatanutel võtta vajalikke kaitsemeetmeid.
`
  },
  {
    id: 3,
    title: 'Miks mitte eitada või varjata',
    content: `
**Rikkumise varjamine või eitamine** kahjustab usaldust ja võib suurendada õiguslikku vastutust ning mainekahju.
`
  }
];

export default function TurvapoliitikaEestvedaja4Leht() {
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
        <button onClick={() => navigate('/turvapoliitika_eestvedaja4')}>
          Alusta rikkumisele reageerimist
        </button>
      </div>
    </div>
  );
}
