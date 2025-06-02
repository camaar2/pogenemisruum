import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
{
    id: 1,
    title: "Võrgu segmentimine",
    content: `
- **Võrgu segmentimine** tähendab, et jagame suuri võrke väiksemateks osadeks (subnetid või VLAN-id), et hoida eri seadmed ja teenused eraldi.  
- • Kujuta ette, et sinu maja on suur ja saad panna iga toa eraldi turvaukse taha. Kui peaks keegi sisse murdma ühte tuppa, ei pääse ta automaatselt teistesse tubadesse. Sama kehtib võrgu kohta: kui pahavara satub ühte segmenti, ei saa ta lihtsalt teistesse liikuda.  
- **Subnet** (alamvõrk) on võrgu alamgrupp väiksemas mõõtkavas, millel on oma IP-vahemik (nt 192.168.1.x võib olla üks alamvõrk ja 192.168.2.x teine).  
- **VLAN** (Virtual LAN) on tarkvara abil loodud eraldus, mis jagab füüsilise võrgu mitmeks loogiliseks osaks ilma, et peaksid kaableid ümber tõstma.  
- • Võrgusegmendi saab panna eraldi „ruumi“ või „õue“, kus on ainult teatud seadmed (nt printerid eraldi, tööarvutid eraldi). See piirab pahavara liikumist ja hoiab kriitilised serverid turvalisemad.  
- • Samuti saab kehtestada eraldi reeglid (tulemüür või ACL), mis lubavad või keelavad liiklust iga segmendi vahel – nii saad kontrollida täpselt, kes ja millal millisesse ossa ligi pääseb.`
},
{
    id: 2,
    title: "Kahefaktoriline autentimine (2FA)",
    content: `
- **2FA (kahefaktoriline autentimine)** nõuab kasutajalt kahte erinevat tõendit (faktorit), et tõestada oma identiteeti.  
- • Esimene faktor on see, mida sa tead (parool või PIN). Teine on see, mis sul on (nt mobiiltelefon, millele saadetakse SMS-kood või kasutad autentimisrakendust).  
- • Kui sisened pangakontole, ei piisa ainult paroolist – peale selle peab veebisait saatma su telefonile koodi, mille sisestad teisel ekraanil. Nii ei saa keegi sisse, isegi kui tal on su parool, sest tal pole SMS-koodi.  
- • 2FA sobib igale kontole (e-post, pangandus, töövõrk), sest see vähendab riski, et keegi logib sisse ainult sinu parooli varastades.  
- • Teine faktor võib olla ka sõrmejälg (biomeetria) või riistvara võti (USB-seade), mis koos parooliga teeb kontole ligi pääsemise palju raskemaks pahatahtlikel isikutel.  
- • Kokkuvõttes aitab 2FA hoida sinu andmed turvalisemad, sest pahatahtlikel isikutel peab olema nii parool kui ka juurdepääs füüsilisele seadmele või koodigeneraatorile.`
}
];

export default function Rakendaja4Leht() {
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
        <button onClick={() => navigate('/rakendaja4')}>
          Alusta teadmiste kontrolli
        </button>
      </div>
    </div>
  );
}