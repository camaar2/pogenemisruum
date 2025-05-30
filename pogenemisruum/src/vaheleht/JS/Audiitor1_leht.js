import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Audiitor1_leht.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on riskianalüüs auditeerimisel?",
    content: `
Riskianalüüs auditeerimisel on protsess, kus hinnatakse organisatsiooni
infosüsteemide ja protsesside haavatavusi ja võimalikku kahju.
See aitab kindlaks teha, kus on kõige kriitilisemad ohukohad.
`
  },
  {
    id: 2,
    title: "Miks valida asjakohased riskid?",
    content: `
• Asjakohased riskid mõjutavad otseselt äritegevust ja infoturvet.
• Ebavajalike riskide välja jätta aitab keskenduda õigetele meetmetele.
• Õigeid riske tuvastades saab koostada tõhusama auditiaruande.
`
  },
  {
    id: 3,
    title: "Kuidas leida organisatsiooni riskid?",
    content: `
1. Kaardista süsteemid ja protsessid (serverid, võrgud, kasutajad).
2. Analüüsi haavatavused (nt TLS versioonid, tarkvarauuendused).
3. Koguge infot varasematest intsidentidest ja normidest.
4. Määrake riskide asjakohasus (tõenäosus vs mõju).
`
  },
  {
    id: 4,
    title: "Auditiaruande kokkuvõte",
    content: `
Aruandes sisalduvad tuvastatud riskid ja soovitused:
- Riskide kirjeldusega peatükid
- Soovitused kaitsemeetmete rakendamiseks
- Järgmised sammud ja jälgimine
`
  }
];

export default function Audiitor1_leht() {
  const navigate = useNavigate();

  return (
    <div className="tutorial-page">
      {tutorialSections.map(sec => (
        <section key={sec.id} className="tutorial-section">
          <h2>{sec.title}</h2>
          <div className="tutorial-content">
            {sec.content.trim().split('\n').map((line, i) =>
              line.trim() ? <p key={i}>{line.trim()}</p> : <br key={i} />
            )}
          </div>
        </section>
      ))}
      <div className="tutorial-footer">
        <button onClick={() => navigate('/audiitor1')}>
          Alusta riskide analüüsi
        </button>
      </div>
    </div>
  );
}