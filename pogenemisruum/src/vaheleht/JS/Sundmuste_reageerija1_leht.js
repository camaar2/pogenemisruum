import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on intsidendi prioriseerimine?",
    content: `
**Intsidentide prioriseerimine** on protsess, kus hinnatakse turvaohtude või intsidentide
kriitilisust, määrates, millised olukorrad nõuavad **viivitamatut reageerimist**.
`
  },
  {
    id: 2,
    title: "Miks massiline andmeleke kriitiline?",
    content: `
**Massiline andmeleke** võib avalikustada tuhandeid või miljoneid isikuandmeid,
suuren­dades raha- ja **mainekahju riski** drastiliselt.
`
  },
  {
    id: 3,
    title: "Ründegrupi tegevus rahvusvahelisel tasandil",
    content: `
Rahvusvahelise **APT-grupi** tegevus näitab keerukust ja püsivat ohtu,
mistõttu nõuab **kõrget reageerimise prioriteeti** ja koostööd eri riikide vahel.
`
  },
  {
    id: 4,
    title: "Tsentraliseeritud serveri rünnak",
    content: `
Tsentraliseeritud serveri rünnak võib mõjutada paljusid kasutajaid või teenuseid,
ohustades ärikriitiliste komponentide **kättesaadavust**.
`
  },
  {
    id: 5,
    title: "Siseministeeriumi infosüsteemi rünnak",
    content: `
Riigiasutuse infosüsteemi rünnak võib ohustada riiklikku julgeolekut,
seades selle **automaatse prioriteediga kõrgeimale tasemele**.
`
  }
];

export default function SundmusteReageerija1Leht() {
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
        <button onClick={() => navigate('/sundmuste_reageerija1')}>
          Alusta prioritiseerimist
        </button>
      </div>
    </div>
  );
}
