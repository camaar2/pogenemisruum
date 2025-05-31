import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Saatja domeeni kontrollimine",
    content: `
Phishing-kirjade tuvastamisel on esimene samm kontrollida saatja domeeni.  
Ametlikel teavituspostkasti aadressidel on õige domeen (nt **@amazon.com**).  
Falsifitseeritud domeenid (nt **amazzon.com**) viitavad petuskeemile.
`
  },
  {
    id: 2,
    title: "Sõnumi sisu ja toon",
    content: `
Kahtlased sõnumid sisaldavad sageli ähvardavat või kiireloomulist tooni:  
"**Kinnitage 24 tunni jooksul**" või "**Vastasel juhul peatame konto**".  
Tõelised teavitused toovad pigem faktid ilma ähvardusteta.
`
  },
  {
    id: 3,
    title: "Linkide ja manusfailide kontroll",
    content: `
Ära klõpsa kahtlastel linkidel ega laadi alla manuseid tundmatutelt domeenidelt.  
Kasuta otse **ametlikku portaali**, mitte e-kirjas olevat linki.
`
  },
  {
    id: 4,
    title: "Vihjete kasutamine",
    content: `
**Vihje** nupp annab lisainfot, mis aitab eristada legitiimseid ja petukirju.  
Kasuta seda, kui sa ei ole kindel, et sõnum on turvaline.
`
  }
];

export default function InfoturbeJuht3Leht() {
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
        <button onClick={() => navigate('/infoturbe_juht3')}>
          Alusta andmepüügi tuvastamist
        </button>
      </div>
    </div>
  );
}
