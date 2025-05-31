import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Viirusetõrje tarkvara",
    content: `
**Viirusetõrje tarkvara** skaneerib süsteemi pahatahtlike programmide (viirused, troojalased) suhtes,
blokeerides või eemaldades need enne täitmist.
`
  },
  {
    id: 2,
    title: "Tulemüür",
    content: `
**Tulemüür** filtreerib võrguliiklust, lubades volitatud ühendused (nt HTTPS, SSH)
samal ajal blokeerides kahtlased või tundmatud pordinumbrid.
`
  },
  {
    id: 3,
    title: "Andmete varundussüsteem",
    content: `
**Andmete varundussüsteem** loob regulaarseid koopiad kriitilistest andmetest,
et tagada andmete taastamine rikke või rünnaku korral.
`
  },
  {
    id: 4,
    title: "Sissetungituvastussüsteem (IDS)",
    content: `
**IDS** jälgib võrgu- ja süsteemilogi tulemustes ebatavalist või pahatahtlikku tegevust,
teavitades turvaoperatsioonikeskust võimalike ohtude korral.
`
  }
];

export default function Rakendaja3Leht() {
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
        <button onClick={() => navigate('/rakendaja3')}>
          Alusta tööriistade valikut
        </button>
      </div>
    </div>
  );
}