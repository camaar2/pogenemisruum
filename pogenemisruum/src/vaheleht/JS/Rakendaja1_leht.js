import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/rakendaja1_leht.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on ruuteri ACL-id?",
    content: `
**Access Control List (ACL)** on reeglistik, mis määrab, millised IP-aadressid 
või võrgud võivad ruuterist läbi liikuda. See on esimene kaitseliin võrguliiklusele.
`
  },
  {
    id: 2,
    title: "Mis on tulemüür?",
    content: `
**Tulemüür** filtreerib võrguliiklust määratud reeglite alusel,
lubades või blokeerides porte, protokolle ja IP-aadresse.
`
  },
  {
    id: 3,
    title: "Mis on IDS/IPS?",
    content: `
**Intrusion Detection/Prevention System (IDS/IPS)** tuvastab või blokeerib
tundmatuid või pahatahtlikke rünnakuid reaalajas mustrite ja allkirjade alusel.
`
  },
  {
    id: 4,
    title: "Mis on VPN-ühendus?",
    content: `
**VPN (Virtual Private Network)** loob krüpteeritud tunneli avalikus võrgus,
tagades turvalise kaugjuurdepääsu sisevõrguressurssidele.
`
  },
  {
    id: 5,
    title: "Miks tugevdada lõppseadmeid?",
    content: `
Lõppseadmete (töölauad, serverid) turvalisus on kriitiline:
- Paroolide haldus ja viirusetõrje
- Tarkvarauuenduste regulaarne paigaldus
- Kasutajate ligipääsuõiguste piiramine
`
  }
];

export default function Rakendaja1_leht() {
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
        <button onClick={() => navigate('/rakendaja1')}>
          Alusta võrgu kaitset
        </button>
      </div>
    </div>
  );
}