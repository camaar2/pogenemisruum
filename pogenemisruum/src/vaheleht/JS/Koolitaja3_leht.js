import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on õngitsuskirjade simulatsioon?",
    content: `
Simulatsioonis saadetakse töötajatele kontrollitud õngitsuskirju, et hinnata
organisatsiooni turvateadlikkust ja avastada haavatavaid lülisid.
`
  },
  {
    id: 2,
    title: "Miks valida sihtsuunatud spear-phishing?",
    content: `
**Spear-phishing** on spetsiaalselt konkreetsete isikute või osakondade vastu
suunatud rünnak, mis põhineb sihtmärgi kohta kogutud infol.
See annab realistlikuma situatsiooni ja aitab tõhusamalt tuvastada riske.
`
  },
  {
    id: 3,
    title: "Õngituskampaania üldine lähenemine",
    content: `
- **Mass-kampaania** annab ülevaate üldisest teadlikkusest, kuid ei pruugi tuua esile kõrge riskiisikutega indiviide.
- **Spear-phishing** võimaldab keskenduda olulisematele sihtmärkidele ja pikendada rünnitsüklit personaalse emotsionaalse ahvatlusega.
`
  }
];

export default function Koolitaja3Leht() {
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
        <button onClick={() => navigate('/koolitaja3')}>
          Alusta simulatsiooni valikut
        </button>
      </div>
    </div>
  );
}
