import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
{
    id: 1,
    title: "Tehniline paigaldus",
    content: `
 - **Tehniline paigaldus** tähendab turvarakenduste ja -instrumentide paigaldamist arvutisse või serverisse.  
 - • Nende seadistamine (konfigureerimine) tagab, et tööriistad töötavad õigesti ja aitavad ohtusid õigel ajal tuvastada.  
 - • See samm on oluline, et kaitseprogrammid saaksid operatsioonikeskkonnas tuvastada ja vältida rünnakuid.`
      }
      ,
  {
    id: 2,
    title: "Töötajate koolitus",
    content: `
- • **Töötajate koolitus** seab aluse turvateadlikkusele ja protseduuride järgimisele.
- • Regulaarne koolitus aitab vältida inimlikke vigu ja tugevdab organisatsiooni küberkaitset.
`
  },
  {
    id: 3,
    title: "Sissetungitesti läbiviimine",
    content: `
- • **Sissetungitest (pentest)** simuleerib reaalseid ründeid, et tuvastada haavatavusi ja kontrollida kaitsemehhanismide toimimist.  
- • Aitab leida nõrkusi, mida saab enne päris ründeid parandada, et tugevdada turvalahendusi.`
  },
  {
    id: 4,
    title: "Mis on koormustest serveril?",
    content: `
- **Koormustest** ehk stressitest mõõdab, kuidas server või teenus töötab pingelistes tingimustes (nt kui palju kasutajaid korraga ligi pääseb).  
- • Seda tehakse tavaliselt spetsiaalse tööriistaga, mis tekitab kunstlikku liiklust (nt sadu või tuhandeid samaaegseid päringuid).  
- • Eesmärk on näha, kas server kannatab koormust või jookseb kokku (nt muutub äärmiselt aeglaseks või läheb täiesti maha).  
- • Turvameetmete elluviimiseks ei ole koormustest esmane, sest see ei tuvasta haavatavusi ega rünnakuid, vaid pigem jõudlusküsimusi.`
  },
  {
    id: 5,
    title: "Mis on lihtne hooldusleping?",
    content: `
- **Hooldusleping** on kokkulepe teenusepakkujaga, mis tagab, et süsteeme ja tarkvara hoitakse ajakohasena (nt tarkvaravärskendused, seadmete remondid).  
- • Lihtne hooldusleping võib hõlmata regulaarseid kontrollkäike, kiiret reageerimist probleemide korral ning vajalikke uuendusi.  
- • Kuigi hooldusleping aitab hoida süsteemi üldist tervist ja stabiilsust, ei anna see üksinda garantiid, et turvaaugud ise on otseselt parandatud – selleks on vaja eraldi turvavärskendusi ja teste. `
  },
  {
    id: 6,
    title: "Mis on rakenduse funktsionaaltest?",
    content: `
- **Funktsionaaltest** kontrollib, et tarkvararakendus teeb seda, mida kasutaja ootab (nt nupuvajutused, andmete sisestamine).  
- • Tavaliselt pannakse paika test stsenaariumid, kus vaadatakse, kas lehekülg avaneb, vormi täitmine saadab andmed õigesti jne.  
- • Funktsionaaltest ei tegele turvalisusega ega haavatavustega, vaid keskendub sellele, et rakendus töötaks korrektselt.`
  },
  
];

export default function Audiitor3Leht() {
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
        <button onClick={() => navigate('/audiitor3')}>
          Alusta sammude valimist
        </button>
      </div>
    </div>
  );
}