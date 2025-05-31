import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on Perimeter tsoon?",
    content: `
**Perimeter** on võrgu välispiir, kus asuvad seadmed, mis ühenduvad otse avaliku võrguga.
Näiteks VPN Gateway kaitseb sisevõrku ja kontrollib sildade liiklust.
`
  },
  {
    id: 2,
    title: "Mis on DMZ tsoon?",
    content: `
**DMZ (Demilitarized Zone)** on isoleeritud alavõrk, kus avalikud teenused (nt veebiserverid,
DNS resolverid) on eraldi sisevõrgust, et piirata rünnakute levikut.
`
  },
  {
    id: 3,
    title: "Mis on Internal Net?",
    content: `
**Internal Net** sisaldab usaldusväärseid sisemisi ressursse (nt andmebaasid, LDAP serverid),
mis ei peaks olema otse avalikust internetist ligipääsetavad.
`
  },
  {
    id: 4,
    title: "Miks on distractorid olulised?",
    content: `
**Distractorid** on komponendid, mis ei tolle etapi jaoks sobi ja tuleb hoida eraldi.
Näiteks arenduskeskkonna VM-id ei kuulu tootmissegmendi tsoonidesse.
`
  }
];

export default function Arhitekt3Leht() {
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
        <button onClick={() => navigate('/arhitekt3')}>
          Alusta segmentimist
        </button>
      </div>
    </div>
  );
}
