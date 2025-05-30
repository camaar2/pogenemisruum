import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Digi_toendite_uurija1_leht.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on digitaalse tõendite ahel (Evidence Chain)?",
    content: `
Digitaalse tõendite ahel on dokumenteeritud protsess, mis tagab, et
forensilised tõendid on usaldusväärsed ja kohtus kasutatavad. See hõlmab:
- Süsteemide ja seadmete staatuse kindlustamist (puutumatus)
- Operatsioonide detailselt dokumenteerimist
- Järgnevate sammude järjekorra järgimist
`
  },
  {
    id: 2,
    title: "Tõendite konfiskeerimine",
    content: `
Esimene samm on sekkuda nii, et tõendid ei muutuks:
- Lahutage seade võrgust või lülitage see välja turvalisel viisil
- Tagage, et keegi ei pääse seadmele juurde ilma autoriseerimiseta
- Dokumenteerige konfiskeerimise aeg, koht ja osapooled
`
  },
  {
    id: 3,
    title: "Järelduse ahela vormi täitmine",
    content: `
Kirjalik vorm, mis fikseerib kõik konfiskeerimistoimingud:
- Konfiskeeritavate seadmete kirjeldus (tüüp, seerianumber)
- Kes, kus ja millal toimet teostas
- Allkirjad ja tunnistajad
`
  },
  {
    id: 4,
    title: "Digitaalse salvestusseadme arestimine",
    content: `
Aresti all olevate objektide turvaline hoiustamine:
- Märgiste ja kinnitusmehhanismide kasutamine, et vältida manipuleerimist
- Seadmete pakendamine ja keti hoidmine kuni laborisse viimiseni
`
  },
  {
    id: 5,
    title: "Forenseerilise kujutise loomine",
    content: `
Bititasandiline kloon originaalseadmest:
- Kujuta seadmest täpne koopiad, mitte originaali
- Kasuta write-blocker’it, et vältida muutusi
- Kontrollsumma (hash) nende sarnasuslikkuse tõendamiseks
`
  },
  {
    id: 6,
    title: "Analüüs laboris",
    content: `
Kloonil põhinev detailne uurimine:
- Failisüsteemi läbivaatamine, logide analüüs
- Vigade, pahavara või pettuste tuvastamine
- Dokumenteeritud tulemused ja järeldused forensilisse raportisse
`
  }
];

export default function Digi_toendite_uurija1_leht() {
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
        <button onClick={() => navigate('/digi_toendite_uurija1')}>
          Alusta ahela järjestamist
        </button>
      </div>
    </div>
  );
}