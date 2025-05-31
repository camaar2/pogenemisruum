import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on phishing?",
    content: `
- **Phishing** on küberrünnak, kus ründaja saadab petliku sõnumi (nt e-kiri), et kasutaja klõpsaks lingil või sisestaks isikuandmeid ja paroole.  
  - • Kujuta ette, et saadad e-kirja oma pangast, aga tegelikult on see võlts – kui klikid kontojuurdepääsu lingil, võib ründaja saada su parooli ja siseneda sinu pangakontole.`
  },
  {
    id: 2,
    title: "Miks on paroolide korduvkasutamine ohtlik?",
    content: `
    - • Kui sama parooliga on kaitstud mitu kontot, võib ühe konto kompromiteerimine anda ründajale ligipääsu kõigile kontodele (nt e-post, sotsiaalmeedia, internetipank).  
    - • Kui ründaja saab teada su parooli ühes kohas, proovib ta seda sama parooli kasutada ka mujal – see on nagu võtaksid sama võtme nii koju- kui ka autosse saamiseks, ning kui varas selle võtme leiab, pääseb ta mõlemasse.`
  },
  {
    id: 3,
    title: "Kuidas hoida paroole turvaliselt?",
    content: `
    - • Kasuta **unikaalseid ja keerulisi paroole** igal kontol: väldi lihtsaid sõnu ja lisa suured tähed, väiketähed, numbrid ja sümbolid (nt “Kass!2025**”).  
  - • **Paroolihaldur** (nt KeePass, Bitwarden) aitab meelde jätta eri paroole: paroolihaldur salvestab kõik su paroolid ühte kaitstud ja lukustatud „kasti“.  
  - • Paroolihaldur on nagu tugev turvalukk, kuhu kogud kõik oma võtmed (paroolid) – sa pead meenutama vaid ühe peavõtit (peaparooli), ülejäänud paroolid tulenevad turvalisest rakendusest.`
  },
  {
    id: 4,
    title: "Mis on kahefaktoriline autentimine (2FA)?",
    content: `
    - • **2FA (kahefaktoriline autentimine)** nõuab lisaks paroolile veel teist tõestusviisi, näiteks SMS-iga saadetud ühekordset koodi või autentimisrakenduse (Google Authenticator) koodi.  
  - • Kui logid pangakontole, sisestad esmalt paroooli (esimene faktor) ja seejärel saadetakse telefonile kood, mille sisestad eraldi (teine faktor).  
  - • See tähendab, et isegi kui ründaja teab su parooli, ei saa ta sisse, sest tal pole su telefoni.`
  },
  {
    id: 5,
    title: "Mis on pahavara?",
    content: `
    -  **Pahavara** (malware) on tarkvara, mis on loodud sinu arvutit kahjustama, andmeid varastama või süsteemi üle võtma (näiteks viirused ja nuhkvara).  
  - • Pahavara on nagu varas, kes siseneb sinu koju ja varastab raha või lõikab juhtmed läbi – arvutis varastab paroolid, lindistab ekraani, krüpteerib faile (lunavara) või avab tagaukse ründajale.  
  - • **Kaitsmiseks**: kasuta ajakohast viirusetõrjet, ära ava tundmatuid manuseid, laadi tarkvara alla ainult usaldusväärsetest allikatest.`
  }
]
;

export default function Koolitaja1Leht() {
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
        <button onClick={() => navigate('/koolitaja1')}>
          Alusta teadmiste hindamist
        </button>
      </div>
    </div>
  );
}
