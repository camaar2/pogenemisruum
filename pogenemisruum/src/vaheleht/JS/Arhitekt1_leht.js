import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Arhitekt1_leht.css';

const tutorialSections = [
  {
    id: 1,
    title: "Süsteemide riskide tuvastamine üldiselt",
    content: `
Süsteemide riskide tuvastamine on protsess, mille käigus hinnatakse erinevate IT-komponentide
haavatavusi ja ohukohti. Selle eesmärk on:
- Mõista, millised komponendid on kriitilisemad ettevõtte toimimiseks
- Hindada võimalike rünnakute mõjusid ja tõenäosust
- Prioriseerida kaitsemeetmeid ressursside optimaalseks kasutamiseks
`
  },
  {
    id: 2,
    title: "Miks on veebiserver riskantne komponent?",
    content: `
Veebiserverid on sageli avalikkusele avatud ja töötavad standardsete portidega, mistõttu:
- Neid skannitakse ja testitakse pidevalt automatiseeritud tööriistadega
- Tuntud rünnemeetodid hõlmavad SQL injection'i, XSS-i ja brauseripõhiseid haavatavusi
- Turvariskide vähendamiseks kasutatakse tulemüüre, sisendi valideerimist ja regulaarselt uuendusi
`
  },
  {
    id: 3,
    title: "Andmebaasi kaitse tähtsus",
    content: `
Andmebaasid hoiavad konfidentsiaalseid ja ärikriitilisi andmeid:
- Andmeleke võib põhjustada finants- ja mainekahju
- Juhtumipiiralamise meetmed: juurdepääsuõiguste range haldus, krüpteerimine ja auditilogid
- Tavalised tööd: SQL päringute turvalisus, turvaliste ühenduste kasutamine
`
  },
  {
    id: 4,
    title: "E-posti serveri turvariskid",
    content: `
E-posti serverid on ründevektor petusõnumite ja pahavaraga:
- Phishing-sõnumid võivad petta kasutajat klikkima pahatahtlikule lingile
- Kitevad manusfailid võivad sisaldada pahavara või skripte
- Kaitseks kasutatakse spamifiltreid, manuse kontrolli ja teavitusprotokolle
`
  },
  {
    id: 5,
    title: "Riskide prioriseerimise põhimõtted",
    content: `
Riskide prioriseerimine aitab keskenduda kõige olulisematele ohukohtadele:
1. Hinnake iga riski tõenäosust ja mõju kombineeritult
2. Määrake kriitilisus: kõrge, keskmine või madal
3. Rakendage esmased kaitsemeetmed kõrge kriitilisusega riskidele
4. Jälgige ja uuendage riskiarvestust regulaarselt
`
  }
];

export default function Arhitekt1_leht() {
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
        <button onClick={() => navigate('/arhitekt1')}>
          Alusta riskide tuvastamist
        </button>
      </div>
    </div>
  );
}