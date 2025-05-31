import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
    {
      id: 1,
      title: "Mis on TLS?",
      content: `
  - **TLS (Transport Layer Security)** on justkui turvaline ümbrik, mis paneb sinu veebi- või meilisaadetise ümber luku, nii et keegi ei saa teel sisu lugeda ega muuta.  
  - • Kui näed veebiaadressi alguses “https://”, tähendab see, et TLS hoiab sinu veebisaate, näiteks paroolid või pangatehingud, krüptituna.  
  - • Kujuta ette, et saadad sõpradele salasõnumi – paned selle lukustatud ümbrikusse ja ainult saaja, kellel on õige võti, saab seda lugeda. TLS toimib täpselt nii arvutite vahel.  
  - • Näited:  
    – E-posti kaudu saadetud sõnumid (SMTP TLS)  
    – Veebilehtede külastamine (HTTPS kone)  
    – Failiedastus (FTP üle TLS ehk FTPS)  
  - • Kui TLS puudub, liigub info “avatult” üle interneti (nagu postkaart), mida saab pealt kuulata või võltsida.  
  `
    },
    {
      id: 2,
      title: "Mis on AES?",
      content: `
  - **AES (Advanced Encryption Standard)** on parooliga lukustatud kast, kus sama võti avab ja sulgeb selle kasti.  
  - • See on sümmeetriline krüptimine: nii saatmisel kui vastuvõtmisel kasutatakse ühte ja sama “võtit” ehk salajast koodi.  
  - • Kujuta ette, et sul on üks tugev metallist kast ja võtmetega juhe. Kui paned sinna salajase paberi (sinu pangakonto andmed), peab saaja teadma sama võtme, et kasti avada ja sõnumit lugeda.  
  - • Sobib andmete salvestamiseks ja jagamiseks turvaliselt, näiteks:  
    – Failid kõvakettal või USB-mälul  
    – Andmebaaside saladuslikud kirjed  
    – Pilves hoiustatavad dokumendid  
  - • Kui kasutad AES-i, veendu, et „võti“ on piisavalt pikk ja keeruline (nt 256 bitti), sest liiga lühike võti oleks nagu nõrk lukk, mida saab kergesti murda.  
  `
    },
    {
      id: 3,
      title: "Mis on RSA?",
      content: `
  - **RSA** on postkast, millel on kaks erinevat võtit:  
    1. **Avalik võti** – seda saab jagada kõigile (nagu postkasti avaus, kuhu igaüks saab kirja saata).  
    2. **Privaatne võti** – ainult sa ise või usaldatud isik omab seda (nagu ainus võti, millega avad postkasti ja võtad kirjad välja).  
  - • RSA on asümmeetriline krüptimine: üks võti krüpteerib (sulgeb) ja teine võti dekrüpteerib (avab).  
  - • Kui keegi tahab saata sulle salateate, kasutab ta sinu avalikku võtit. Ainult sina, kes tead privaatvõtme salakoodi, saad kasti avada ja kirja lugeda.  
  - • Sobib võtmevahetuseks ja digitaalallkirjade loomiseks:  
    – **Võtmevahetus**: saadad sõbrale avaliku võtme, tema saadab sulle enda avaliku võtme – nii saate krüpteerida sõnumeid, mida ainult kumbki teist saab avada.  
    – **Digitaalallkiri**: kui edastad dokumenti, saad seda “allkirjastada” privaatvõtmega – vastuvõtja kontrollib seda avaliku võtmega, et sa tõesti selle dokument saatsid (kui digiallkiri klapib, dokument on ehtne ning seda pole muudetud).  
  - • Kui RSA privaatvõti kaotsi läheb või lekib, kaotad ligipääsu oma kirjadele ja keegi teine võib sinu nime all pahandusi teha, seega peab privaatvõti olema rangelt hoitud.  
  `
    }
  ];

export default function Arhitekt4Leht() {
  const navigate = useNavigate();

  return (
    <div className="tutorial-page">
      {tutorialSections.map(sec => (
        <section key={sec.id} className="tutorial-section">
          <h2>{sec.title}</h2>
          <div className="tutorial-content">
            <ReactMarkdown>
              {sec.content.trim()}
            </ReactMarkdown>
          </div>
        </section>
      ))}
      <div className="tutorial-footer">
        <button onClick={() => navigate('/arhitekt4')}>
          Alusta seoste kokkupanemist
        </button>
      </div>
    </div>
  );
}
