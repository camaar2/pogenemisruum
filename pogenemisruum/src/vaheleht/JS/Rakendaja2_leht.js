import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
{
    id: 1,
    title: "HTTPS liikluse olulisus",
    content: `
- **HTTPS** on nagu salaja kirjutatud kiri: see krüpteerib andmed sinu arvuti ja veebiserveri vahel, nii et keegi kolmas ei saa neid lugeda ega muuta.  
- • Kui külastad veebilehte ilma HTTPS-ita (kasutades HTTP), liigub iga sinu sisestatud info (nt paroolid või kaartide numbrid) “avatult” üle interneti.  
- • HTTPS tagab, et keegi teel sinu ja serveri vahel ei saa andmeid pealt kuulata ega sõnumeid võltsida.  
- • Kujuta ette, et saadad postisaadetise tavalise postiga (HTTP) – keegi võib sisu lugeda või paberit muul viisil muuta. HTTPS on nagu kinnine ümbrik, mida ainult saatja ja saaja saavad avada.  
- • Lubades ainult HTTPS-i (st keelates HTTP), veendume, et kogu veebiliiklus on krüptitud ja keegi ei saa hiilida lugema või muutma sinu saadetud infot.`
},
{
    id: 2,
    title: "Sissetulevate ühenduste piiramine",
    content: `
- • Iga arvuti või server, mis on internetti ühendatud, saab teateid teistelt masinatelt. Kui lubad kõik ühendused, võib ründaja proovida otse sinu arvutiga rääkida.  
- **Tundmatud sissetulevad ühendused** peavad olema keelatud, et hoida ründajad eemal – lase läbi ainult need IP-aadressid, mida sa tead ja usaldad.  
- **Blokeeri kõik peale lubatu**: kujuta, et majja on kaks ust. Kui oled lahti jätnud mõlemad, saab igaüks sisse tulla. Kui lased sisse ainult sõprade nimekirjas olevate inimeste nimedest koosneva nimekirja, hoiavad ustel olevad turvamehed ülejäänud eemale.  
- **Logi igat katset**: kui keegi proovib sinuga ühendust luua, tee sellest kirje (log) – siis saad hiljem vaadata, kes ja millal siia ligi üritas pääseda.  
- **Teavita turvatiimi**: kui mõni tundmatu IP-aadress üritab pidevalt ühendust luua, saadab süsteem kohe teate turvameeskonnale, kes saab uurida, kas see on oht või lihtsalt eksitus.  
- • See on nagu maja turvalukkude valik – sul on nimekiri inimestest, kellel on õigused majja siseneda. Kui keegi nimekirjas ei ole, ei saa ta uksi avada. Samuti pead vaatama, kes uksele koputab (logima), ja kui keegi on kahtlane, helistama turvameeskonnale (teavitama).`
},
{
    id: 3,
    title: "Miks mitte lubada kõike?",
    content: `
- • Kui valid **kõigi ühenduste lubamise**, on see nagu jätta oma maja uks lahti – keegi võib sisse minna ja vaadata su kommikarpe või varastada telekat.  
- • Tulemüür (või ruuteri ACL-id) on nagu turvamees ukse ees: ta küsib, kes sa oled, ja laseb sisse ainult need, keda sa usaldad. Kui aga oled lubanud kõigil ukse taga seista, läheb see turvamees ära magama.  
- • Ilma tulemüürita või ACL-ideta saavad ründajad hõlpsasti proovida üle võtta süsteemi – näiteks sisestada pahavara, lugeda andmeid või rikkuda faile.  
- • Kujuta ette, et su maja ees pole ust – möödakäijad võivad igal ajal sisse kõndida ega pea isegi koputama. Sama juhtub arvutiga, kui lubad iga IP-aadressil su serveriga rääkida.  
- • Seetõttu tuleb valida rangelt reeglid, millistele aadressidele lubad siseneda – muidu läheb süsteem haavatavaks kõigile pahatahtlikele katsetele.`
},
{
    id: 4,
    title: "FTP liikluse riskid",
    content: `
- **FTP** (File Transfer Protocol) on vana viis faili saatmiseks arvutite vahel, ent see kannab andmeid üle “lahtiselt” – see tähendab, et paroolid ja failid liiguvad ilma krüpteerimata.  
- • Kui kasutad FTP-d, näevad ründajad võrgus liikuvat kasutajanime ja salasõna, nagu lugemata tekstisõnumit.  
- • Pahatahtlik isik võib “kinni püüda” selle FTP-liikluse ja varastada tundlikke faile (näiteks pildid, dokumendid, andmebaasifailid).  
- • Turvaline alternatiiv on **SFTP** (Secure FTP) või **FTPS**, mis mõlemad krüpteerivad kogu andmeedastuse – nii nagu saadaksid privaatsõnumi turvalise ümbriku sees.  
- • See on nagu postkaardi saatmine ilma ümbrikuta – igaüks teel saab lugeda, mida sa kirjutad. Kui aga paned kirja ümbrikusse, saab lugeda vaid inimene, kellel on õige ümbrikulahti saamiseks võti.  
- • Seega, kui sinu süsteemis on vaja faile edasi saata, ära kasuta FTP-d, sest see võib põhjustada tundlike andmete lekkimist. Kasuta alati turvalist varianti nagu SFTP, kus kõik liiklus on suletud krüpteeritud kasti sees.`
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

