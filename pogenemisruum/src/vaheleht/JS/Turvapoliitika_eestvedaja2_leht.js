import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Andmete krüpteerimine",
    content: `
**Andmete krüpteerimine** kaitseb konfidentsiaalsust, muutes tundlikud andmed loetamatuks volitamata osapooltele.
Selleks kasutatakse krüptovõtmeid (symmeetrilist või asymmeetrilist krüptot).
`
  },
  {
    id: 2,
    title: "Töötajate teadlikkuse tõstmine",
    content: `
**Teadlikkuse tõstmine** hõlmab regulaarselt koolitusi, simulatsioone ja infoturbe juhendamist,
et vähendada inimelementidest tulenevaid riske nagu andmepüük või sotsiaalinsenerlus.
`
  },
  {
    id: 3,
    title: "Ebavajalike tegevuste riskid",
    content: `
**Serveri jahutussüsteem** ja **kontorimööbel** ei too turvakompleksile praktilist kasu ning võivad raisata ressursse.
Fookus tuleks seada nõuetega seotud meetmetele.
`
  }
];

export default function TurvapoliitikaEestvedaja2Leht() {
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
        <button onClick={() => navigate('/turvapoliitika_eestvedaja2')}>
          Alusta vastavusmeetmete valimist
        </button>
      </div>
    </div>
  );
}
