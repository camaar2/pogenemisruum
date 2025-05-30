import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/norkustestija1_leht.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on sihtsüsteemi kaardistamine?",
    content: `
Sihtsüsteemi kaardistamine on protsess, mille käigus kogutakse avalikult
kättesaadavat informatsiooni, et mõista sihtmärgi struktuuri ja haavatavusi.
See hõlmab:
- Avalike serverite ja teenuste tuvastamist
- DNS ja WHOIS päringute tegemist domeeni andmete saamiseks
- Subdomeenide ja võrgutopoloogia uurimist
`
  },
  {
    id: 2,
    title: "Avalik serverite info ja WHOIS",
    content: `
**Avalik serverite info** annab ülevaate sihtmärgi IP-aadressidest ja teenustest.
**WHOIS** andmebaas sisaldab domeeni registreerimise ja halduse infot, nt omanik,
registreerija ja kontaktid.
`
  },
  {
    id: 3,
    title: "Subdomeenide ja avalike auditite olulisus",
    content: `
**Subdomeenide otsing** paljastab lisateenuseid ja alamvõrke.
**Avalikud turvaanalüüsid ja auditid** annavad eelnevate uuringute tulemusi,
mis võivad viidata tuntud haavatavustele.
`
  },
  {
    id: 4,
    title: "Tehnilised auditid kui andmeallikas",
    content: `
**Tehnilised auditid** (nt pentestide raportid) sisaldavad detailseid
leitud nõrkuste kirjeldusi ja rekomendatsioone.
Kombineerides neid teiste allikatega, saad põhjaliku ülevaate.
`
  }
];

export default function Norkustestija1_leht() {
  const navigate = useNavigate();

  return (
    <div className="tutorial-page">
      {tutorialSections.map(sec => (
        <section key={sec.id} className="tutorial-section">
          <h2>{sec.title}</h2>
          <div className="tutorial-content">
            {sec.content.trim().split('\n').map((line, i) => (
              line.trim() ? <p key={i}>{line.trim()}</p> : <br key={i} />
            ))}
          </div>
        </section>
      ))}
      <div className="tutorial-footer">
        <button onClick={() => navigate('/norkustestija1_leht')}>
          Alusta allikate valimist
        </button>
      </div>
    </div>
  );
}