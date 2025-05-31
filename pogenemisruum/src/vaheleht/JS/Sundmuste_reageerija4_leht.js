import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Hosti isoleerimine",
    content: `
**Hosti isoleerimine** tähendab nakatunud masina eraldamist võrgu segmentidest,
et vältida pahavara või ründekäikude levikut teistele seadmetele.
`
  },
  {
    id: 2,
    title: "IP-aadressi blokeerimine",
    content: `
**Pahatahtliku IP-aadressi blokeerimine** tulemüüri või IDS/IPS reeglites
peatab ründava liikluse ja takistab edasist juurdepääsu.
`
  },
  {
    id: 3,
    title: "Kasutajakontode kompromisside käsitlemine",
    content: `
**Kompromiteeritud kasutajakontode lukustamine** piirab volitamata ligipääsu,
muutes vajalikuks parooli lähtestamise ja juurdepääsu kontrolli.
`
  },
  {
    id: 4,
    title: "Süsteemide paroolipoliitika ajakohastamine",
    content: `
**Paroolide ajakohastamine** haavatavates süsteemides tagab, et varasemalt lekkinud
krediendid ei anna enam juurdepääsu kompromiteeritud seadmetele.
`
  },
  {
    id: 5,
    title: "Miks mitte kustutada logisid?",
    content: `
Logifailide **kustutamine** kahjustab kohtuekspertiisi ja intsidendi analüüsi,
mis on kriitiline juurpõhjuste tuvastamiseks.
`
  },
  {
    id: 6,
    title: "Miks mitte taaskäivitada koheselt?",
    content: `
**Süsteemide kohene taaskäivitamine** võib kaotada mälust kogutavaid tõendeid,
vajalik on esmalt koguda digitaalset tõendusmaterjali.
`
  }
];

export default function SundmusteReageerija4Leht() {
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
        <button onClick={() => navigate('/sundmuste_reageerija4')}>
          Alusta meetmete valimist
        </button>
      </div>
    </div>
  );
}
