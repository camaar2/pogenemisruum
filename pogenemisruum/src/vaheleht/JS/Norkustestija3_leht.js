import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
{
    id: 1,
    title: "Mis on XSS (Cross-Site Scripting)?",
    content: `
- **XSS** on haavatavus, kus ründaja sisestab pahatahtliku JavaScripti koodi veebirakenduse sisendväljade kaudu, mis seejärel täidetakse ohvri brauseris.  
- • Kui veebisaidil lubatakse kasutajal sisestada teksti ja seda teksti kuvatakse teistele kasutajatele ilma puhastamata, võib ründaja sinna panna koodi, mis käivitub kellegi teise arvutis.  
- • Näiteks kui kommentaarivälja kirjutatud kood näidatakse teistele kasutajatele, võib see varastada sinu küpsiseid (väike andmefail, mis lubab veebilehtedel kasutaja ja tema seaded „meelde jätta“) või kuvada võltssisu.`  
},
{
    id: 2,
    title: "Miks HTML-sisestus on ohtlik?",
    content: `
- • Kui rakendus lubab sisendis HTML-i ilma puhastamata, saavad ründajad sisestada skripte, mis röövivad sessiooniküpsiseid või manipuleerivad lehte.  
- • Kujuta ette veebilehte, mis näitab otse sellelt lehelt saadud teksti. Kui sinna lisada kood, mis ütleb brauserile “saada minu salasõna ründajale”, siis brauser täidab seda koodi ja saadab salasõna pahatahtlikule lehele.  
- • Seetõttu tuleb HTML-i sisend alati puhastada või keelata, et kood ei saaks otse brauseris käivituda.`  
},
{
    id: 3,
    title: "XSS näide",
    content: `
-  \`\`\`html
    <script>alert('XSS')</script>
    \`\`\`  
- • Kui see kood sisestatakse kommentaarivälja ja veebileht näitab selle täpselt nii, nagu see sisestati, siis iga kord, kui keegi selle kommentaari loeb, kuvab brauser hüpikakna.  
-  \`<script>\` ... \`</script>\` on HTML-i märgend, mis ütleb brauserile käivitada sisemine JavaScript. Kui kasutaja sisestab selle koodi enda nime asemel, näitab veebisait seda kui koodi, mitte lihtsalt teksti.  
- • Selline lihtne näide näitab, et ründaja saab panna oma sõnumisse koodi, mis töötab teise kasutaja arvutis.`  
},
{
    id: 4,
    title: "Miks teised rünnakud ei sobi?",
    content: `
- **SQL Injection** nõuab andmebaasi sisendit ja ei tööta brauseripõhises HTML-i käivitamises.  
- • SQL Injection tähendab, et ründaja sisestab andmebaasi käskluse, aga see juhtub serveri poolel, mitte otse kasutaja brauseris. XSS on sarnane, kuid töötab kliendipoolsel (brauseri) tasemel.  
- **Path Traversal** mõjutab serveri failisüsteemi, mitte kliendipoolset skriptimist.  
- • Path Traversal tähendab, et ründaja proovib pääseda serveri failidele ligi, näiteks sisestades aadressiribale kausta nime, et lugeda serveris olevaid faile. See juhtub serveris, XSS aga juhtub kasutaja arvutis.  
- **Tühine sisend** ei demonstreeri haavatavust.  
- • Tühine sisend on näiteks lihtsalt tekst või number, mis ei põhjusta brauseri käitumist ega tekita turvariski. XSS-näites peab sisend olema spetsiaalne koodimärgend, mis brauseris täidetakse.`  
    }
];

export default function Norkustestija3Leht() {
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
        <button onClick={() => navigate('/norkustestija3')}>
          Alusta XSS valikut
        </button>
      </div>
    </div>
  );
}
