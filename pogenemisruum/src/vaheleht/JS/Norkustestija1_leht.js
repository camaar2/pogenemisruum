import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
{
    id: 1,
    title: "Mis on sihtsüsteemi kaardistamine?",
    content: `
- **Sihtsüsteemi kaardistamine** tähendab avalikus ruumis kättesaadava info kogumist, et mõista sihtmärgi ülesehitust ja nõrkusi.  
- • See on nagu kaardistamine – me otsime, millised “masinad” ja “teenused” on internetis nähtavad.  
- Näiteks:  
- • Avalike serverite ja teenuste leidmine (nt veebiserverid, e-posti teenused) – server on arvuti, mis hostib veebilehte või e-posti.  
- • DNS-i (domeeninimede süsteem) ja WHOIS-i (domeeni omanikuteabe) päringud – DNS on nagu interneti telefoniraamat, mis ütleb, milline IP-aadress kuulub konkreetsele veebilehele; WHOIS näitab domeeni omaniku ja registripidaja infot.  
- • Subdomeenide (nt shop.example.com on subdomeen saidile example.com) ja võrgutopoloogia uurimine – vaadeldakse erinevaid alamvõrke ja ühendatud seadmeid, et teada saada, kus asuvad erinevad osad sihtmärgis.  
    `
},
{
    id: 2,
    title: "Avalik serverite info ja WHOIS",
    content: `
- • **Avalik serverite info** annab ülevaate sihtmärgi IP-aadressidest ja teenustest (nt veebiserverid, e-posti serverid). IP-aadress on arvuti “aadress” internetis.  
- • **WHOIS** andmebaas näitab domeeni registreerimise ja halduse infot, näiteks omaniku nime, registreerija ja kontaktandmed.  
- • WHOIS’i kasutamine on nagu kontrollida, kellele veebileht kuulub ja millal see registreeriti.  
    `
},
{
    id: 3,
    title: "Subdomeenide ja avalike auditite olulisus",
    content: `
- **Subdomeenide otsing** paljastab lisateenuseid ja alamvõrke, mida sihtmärk kasutab (nt blog.example.com või shop.example.com). Iga alamdomeen võib viidata eraldi teenusele või serverile.  
- **Avalikud turvaanalüüsid ja auditid** on eelnevalt tehtud uuringud, mis on kättesaadavad internetis. Need näitavad, kas varem on leitud haavatavusi või nõrkusi.  
- • Kui keegi on juba kirjutanud, et “example.com” serveril oli viga, võid selle info põhjal teada, et see koht on juba kaitsmisel.  
    `
},
{
    id: 4,
    title: "Tehnilised auditid kui andmeallikas",
    content: `
- **Tehnilised auditid** (näiteks pentestide või turvatestide raportid) sisaldavad detailset loetelu leitud nõrkustest ja soovitustest, kuidas neid parandada. Pentest tähendab, et turvaspetsialistid proovivad kontrollitud viisil sihtsüsteemi “rünnata”, et leida haavatavusi.  
- • See on nagu lasta headele häkkeritele proovida siseneda, et näha, kust võib sisse pääseda.  
- • Kui kombineerida tehniliste auditite andmed teiste allikatega (nt avalikud analüüsid, WHOIS info ja sihtsüsteemi kaardistamine), annab see põhjaliku ülevaate sihtsüsteemi turvalisusest.  
- • Algajale võiks selgitada, et tehniline audit on samm, kus spetsialistid katsetavad süsteemi, et näha, mis töötab õigesti ja mis vajab parandust.  
    `
    }

];

export default function Norkustestija1Leht() {
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
        <button onClick={() => navigate('/norkustestija1')}>
          Alusta allikate valimist
        </button>
      </div>
    </div>
  );
}
