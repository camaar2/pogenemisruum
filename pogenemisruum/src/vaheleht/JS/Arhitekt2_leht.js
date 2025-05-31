import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
    {
      id: 1,
      title: "Paroolivahetus standardid",
      content: `
  - • Paroolivahetus iga **90 päeva** tagant on tavaline soovitus, et vähendada **brute-force** rünnakute mõju.  
    - **Brute-force rünnak** tähendab seda, et pahatahtlik tarkvara või inimene proovib järjest erinevaid paroole, kuni leiab õige.  
    - Kujuta ette, et keegi proovib su koduukse avada, proovides igat võimalikku võtme varianti – kui vahetad parooli sageli, on raskem õiget võtit leida.  
  - • Liiga pikk intervall (nt **10 aastat**) jätab parooli liiga kaua muutmata ja annab ründajal aega proovida tuhandeid paroole.  
    - Kui kasutad sama parooli nii kaua, on see nagu unustaksid oma värava lukku vahetada – keegi, kes on selle varasemalt varastanud, saab ikka sisse.`
    },
    {
      id: 2,
      title: "Andmete krüpteerimine",
      content: `
  - **Andmete krüpteerimine** tähendab, et muudad tundlikud andmed saladuseks (koodiks), mida saab lugeda ainult õige võtmega.  
    - Kujuta seda kui sa kirjutaksid salakeeles paberile või suled ümbriku, mille luku avamiseks on vaja õiget võtit - kui keegi võõras näeb seda, näeb ainult segast teksti.  
  - • **AES-256** on laialdaselt kasutatav ja tugev krüptoskeem (nagu väga turvaline lukk), mida usaldavad pangad ja valitsused.  
    - Kui salvestad või saadad andmeid (nt pangakonto numbreid või terviseandmeid), krüpteerib AES-256 need nii, et ilma võtmeta ei saa keegi neist aru.  
  - • Kui kirjutad pangakonto numbri paberi peale ja saadad selle e-kirjas, võib keegi kolmas isik selle pealt lugeda – aga kui paned paberile kirja salakirja, ei saa keegi aru, mis seal kirjas on, kuni saadad neile "võtme" (dekodeerimisvõtme).`
    },
    {
      id: 3,
      title: "Mitmetasemeline ligipääsusüsteem",
      content: `
  - **Mitmetasemeline ligipääsusüsteem** tähendab, et erinevatel inimestel on erinevad õigused ja nad pääsevad ligi ainult sellele, mida nad vajavad.  
    - Kujuta ette, et kontorimajas on mitu ust: üks uks on üldine fuajee, teine viib direktoriruumi, kolmas IT-serveriruumini. Iga töötaja saab ukse avada ainult oma võtmega.  
  - Näiteks:  
        - **Tööline** võib kirjutada kirju ja avada oma töölaua kaustu,  
        - **Juht** näeb ka aruandeid ja eelarvestamisandmeid, kuid ei saa muuta serveri seadeid,  
        - **IT-administraator** pääseb serveriruumi, hallates tarkvara ja võrguühendust.  
  - • Kui ründaja saab kätte ühe konto (nt tööline), ei pääse ta automaatselt direktori või serveriruumi juurde, sest iga “tuba” (süsteemiosa) on lukustatud eraldi “võtmega”.  
  - • See on nagu maja, kus iga tuba on eraldi lukuga. Kui kannad töökaarti toa “A” jaoks, ei saa sa toas “B” asuvasse magamistuppa kolida, sest seal on teine võti.`
    },
    {
      id: 4,
      title: "Kaksikautentimine administraatori kontodel",
      content: `
  - **Kahefaktoriline või multifaktoriline autentimine (MFA)** nõuab kahte (või enamat) eraldi “tõestust” sinu isikutõestuseks, enne kui saad sisse logida.  
        - Esimene faktor on see, mida sa tead (parool, PIN).  
        - Teine faktor on see, mis sul on (näiteks mobiiltelefon, kus kuvatakse SMS-kood või autentimisrakenduse kood).  
  - • Kujuta seda ette kui sularaha automaati: pärast pangakaardi sisestamist (esimene faktor) palub seade sisestada PIN-koodi (teine faktor). Ainult siis saab raha välja võtta.  
  - • Kui ründajal on su parool (esimene faktor), kuid tal pole su telefoni (teine faktor), ei saa ta administraatorikonto abil süsteemi üle võtta.`
    },
    {
      id: 5,
      title: "Turvaprotokollide täiendav krüpteerimine",
      content: `
  - **TLS (Transport Layer Security)** on protokoll, mis krüpteerib kogu interneti-andmeedastuse sinu arvuti ja veebiserveri vahel.  
    - Kui näed veebiaadressi ees “https://”, siis sinu brauser kasutab TLS-i (varem SSL-i), et varjata saadetud paroole, pangatehinguid ja isikuandmeid.  
  - • **Tugevad krüptosuvandid** nagu **ECDHE** (võtit vahetav meetod) ja **AES-GCM** (andmete krüpteerimise skeem) tagavad, et isegi kui ründaja püüab andmeid pealt kuulata, ei saa nad saata ega muuta ühtegi paketti.  
  - • Kujuta ette kui sa paned kirjad väga turvalisse, keerulisse masinasse, mis lisab igale sõnumile eraldi lukud – kui keegi püüab sõnumit vaadata või muuta, jääb see kohe rikutuks ja saad selle kohe avastada.  
  - • TLS on nagu turvamees interneti “tänaval” – ta veendub, et ainult sina ja veebisait, kellega suhtled, näete teie vestlust. Kui keegi üritab vahele hiilida, katkestab turvamees otsekohe kõne.`
    },
    {
      id: 6,
      title: "Mida vältida?",
      content: `
  - • **Paroolivahetus iga 10 aasta tagant** on ebapiisav, sest keegi võib su parooli juba mitu korda ära kasutada või kräkkinud variante veebis jagada.    
  - • **Tarkvarauuenduste vältimine** (näiteks jätta telefon või arvuti “värskendamata”) nõrgestab turvasüsteeme, sest iga uuendus parandab avastatud haavatavusi.  
    - Arvutimaailmas on uuendused nagu raviplaanid – kui sa neid ei kasuta, jäävad haavad avatud ja tervist rikkuda (ründajad võivad neid ära kasutada).  
  - • **Võrguliikluse filtreerimise puudumine** tähendab, et kõik liiklus pääseb läbi – ka need andmepaketid, mis püüavad võtta su süsteemi üle.  
    - See on nagu maja ukse lahti tegemine – keegi võib ilma kutsumata sisse tulla, sest sa ei ole paigaldanud “Mitte siseneda” märki ega turvameest ukse taha kutsunud.`
    }
  ]
  ;

export default function Arhitekt2Leht() {
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
        <button onClick={() => navigate('/arhitekt2')}>
          Alusta standardite jaotamist
        </button>
      </div>
    </div>
  );
}