import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "HTTPS liikluse olulisus",
    content: `
**HTTPS** krüpteerib andmed kliendi ja serveri vahel, kaitstes konfidentsiaalsust
ja terviklikkust. Lubades ainult HTTPS-i, väldime paljast mittedränetavat liiklust.
`
  },
  {
    id: 2,
    title: "Sissetulevate ühenduste piiramine",
    content: `
**Tundmatud sissetulevad ühendused** peavad olema keelatud, et takistada
ründajate otsest ligipääsu. Vajalik on lubada vaid volitatud IP-aadresse.

- Blokeeri kõik peale lubatud
- Logi iga katset
- Teavita turvatiimi
`
  },
  {
    id: 3,
    title: "Miks mitte lubada kõike?",
    content: `
**Kõigi ühenduste lubamine** eemaldab tulemüüri kaitsekihi,
mis muudab süsteemi haavatavaks igasugusele pahatahtlikule liiklusele.
`
  },
  {
    id: 4,
    title: "FTP liikluse riskid",
    content: `
**FTP** edastab andmed lahtiselt, ilma krüpteerimata. FTP liini lubamine võib
põhjustada tundlike andmete lekkimist. Kasuta turvalist alternatiivi (SFTP).
`
  }
];

export default function Rakendaja2Leht() {
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
        <button onClick={() => navigate('/rakendaja2')}>
          Alusta tulemüüri reeglite optimeerimist
        </button>
      </div>
    </div>
  );
}

