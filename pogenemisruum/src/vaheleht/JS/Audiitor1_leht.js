import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on riskianalüüs auditeerimisel?",
    content: `
  • Riskianalüüs auditeerimisel on protsess, kus hinnatakse organisatsiooni infosüsteemide ja protsesside **haavatavusi** ja võimalikku **kahju**.  
  • See aitab kindlaks teha, kus on kõige kriitilisemad ohukohad.`
  },
  {
    id: 2,
    title: "Miks valida asjakohased riskid?",
    content: `
  - • **Asjakohased riskid** mõjutavad otseselt äritegevust ja infoturvet.  
  - • **Ebavajalike riskide** välja jätmine aitab keskenduda õigetele meetmetele.  
  - • **Õigeid riske** tuvastades saab koostada tõhusama auditiaruande.`
  },
  {
    id: 3,
    title: "Kuidas leida organisatsiooni riskid?",
    content: `
1. **Kaardista süsteemid ja protsessid**: kirjelda kõiki servereid, võrke ja kasutajaid.  
2. **Analüüsi haavatavusi**: vaata üle kasutatav tarkvara (näiteks TLS-versioonid ja uuenduste staatus).  
3. **Kogu infot**: uurige varasemaid turvaintsidente ja kohaldatavaid standardeid.  
4. **Määra riskide asjakohasus**: hinnake iga riski tõenäosust ja võimalikku kahju.`
  },
  {
    id: 4,
    title: "Auditiaruande kokkuvõte",
    content: `
  Aruandes sisalduvad tuvastatud riskid ja soovitused:
  - • **Aruande metoodika** – lühike ülevaade kasutatud hindamisviisidest ja allikatest  
  - • **Piirangud ja erandid** – asjaolud, mis võisid auditi tulemusi mõjutada  
  - • **Riskide kirjeldusega peatükid**  
  - • **Soovitused kaitsemeetmete rakendamiseks**  
  - • **Prioriteetsed tegevused ja ajakava** – millised sammud on kõige kiiremad ja kes nende eest vastutab  
  - • **Järgmised sammud ja jälgimine**`
  }
  
];

export default function Audiitor1Leht() {
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
        <button onClick={() => navigate('/audiitor1')}>
          Alusta riskide analüüsi
        </button>
      </div>
    </div>
  );
}