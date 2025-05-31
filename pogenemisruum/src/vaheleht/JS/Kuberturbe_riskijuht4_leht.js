import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "IP blokeerimine tulemüüris",
    content: `
**IP-aadressi blokeerimine** tulemüüri reeglites on esimene samm operatiivses reageerimises.
See peatab pahavara ühendused ja annab aega olukorra hindamiseks.
`
  },
  {
    id: 2,
    title: "Teavitamine ja eskaleerimine",
    content: `
Pärast blokeerimist **teavita turvameeskonda** ja eskaleeri juhtum vastavalt protseduuridele.
Koostöös saab analüütik uurida rünnet süvitsi.
`
  },
  {
    id: 3,
    title: "Miks mitte serveri taaskäivitus?",
    content: `
Serveri **taaskäivitamine** võib ajutiselt peatada rünnaku, kuid ei lahenda juurpõhjust.
Tuleb rakendada turvameetmed ja uurida süvitsi.
`
  },
  {
    id: 4,
    title: "Ebakohane radikaalsus",
    content: `
**Kõigi ühenduste sulgemine** ja süsteemi lammutamine on ülemäära radikaalne.
Tuleb säilitada teenuste kättesaadavus ja valida proportsionaalsed meetmed.
`
  }
];

export default function KuberturbeRiskijuht4Leht() {
  const navigate = useNavigate();

  return (
    <div className="tutorial-page">
      {tutorialSections.map(sec => (
        <section key={sec.id} className="tutorial-section">
          <h2>{sec.title}</h2>
          <div className="tutorial-content">
            <ReactMarkdown>
              {sec.content.trim()}
            </ReactMarkdown>
          </div>
        </section>
      ))}
      <div className="tutorial-footer">
        <button onClick={() => navigate('/kuberturbe_riskijuht4')}>
          Alusta operatiivset reageerimist
        </button>
      </div>
    </div>
  );
}
