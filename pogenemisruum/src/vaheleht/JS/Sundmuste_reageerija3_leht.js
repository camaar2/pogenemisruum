import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Intsidendi teavitamine",
    content: `
Esimene samm on **teavitada turvameeskonda** võimalikust intsidentist.  
Kiire teadlikkus võimaldab kohest reageerimist ja minimeerib kahju.
`
  },
  {
    id: 2,
    title: "Intsidenti hindamine ja prioriseerimine",
    content: `
Pärast esmast teadet tuleb **intsidenti hinnata** (ulatus, mõju, tõsidus)  
ja seada **prioriteet**, et suunata ressursid õigesti.
`
  },
  {
    id: 3,
    title: "Kriisimeeskonna kutsumine",
    content: `
Kui intsident on hinnatud kõrgeks, kutsutakse kokku **kriisijuhtimise meeskond**,  
kes koordineerib kommunikatsiooni ja tehnilisi samme.
`
  },
  {
    id: 4,
    title: "Tehniline analüüs ja vastumeetmed",
    content: `
Viimane etapp on **täpsemad tehnilised analüüsid**, digitaalne kohtuekspertiis  
ja **vastumeetmete** rakendamine (parandused, tõkestus, taastamine).
`
  }
];

export default function SundmusteReageerija3Leht() {
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
        <button onClick={() => navigate('/sundmuste_reageerija3')}>
          Alusta tegevuste järjestamist
        </button>
      </div>
    </div>
  );
}
