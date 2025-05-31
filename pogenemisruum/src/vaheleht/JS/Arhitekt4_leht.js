import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on TLS?",
    content: `
**TLS (Transport Layer Security)** on protokoll, mis krüpteerib andmed edastusel,
tagades konfidentsiaalsuse ja terviklikkuse.
Sobib stsenaariumiteks: e-posti transport ja veebiliiklus (HTTPS).
`
  },
  {
    id: 2,
    title: "Mis on AES?",
    content: `
**AES (Advanced Encryption Standard)** on sümmeetriline krüpteerimisalgoritm,
kui kasutatakse sama võtit andmete krüpteerimiseks ja dekrüpteerimiseks.
Sobib andmete säilitamiseks (failid, andmebaasid).
`
  },
  {
    id: 3,
    title: "Mis on RSA?",
    content: `
**RSA** on asümmeetriline krüptosüsteem, mis kasutab avalikku ja privaatset võtit.
Sobib võtmevahetuseks ja digitaalallkirjade loomisel.
`
  },
  {
    id: 4,
    title: "Miks on mõned stsenaariumid distractorid?",
    content: `
Mõned stsenaariumid, nagu logifaili anonüümimine või arhiivi kokkupakkimine, 
ei vaja krüpteerimispoliitika kontekstis.
Need tuleb jätta väljapoole krüptostsenaariumide jaotust.
`
  }
];

export default function Arhitekt4Leht() {
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
        <button onClick={() => navigate('/arhitekt4')}>
          Alusta seoste kokkupanemist
        </button>
      </div>
    </div>
  );
}
