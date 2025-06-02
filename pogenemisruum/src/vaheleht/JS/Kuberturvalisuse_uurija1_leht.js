import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: 'Mis on haavatavuste prioriseerimine?',
    content: `
- Haavatavuste prioriseerimine on protsess, kus me vaatame iga turvaauku ja otsustame:  
- • Kui suur on selle viga  
- • Kui tõenäoline on, et keegi seda ära kasutab  
- Eesmärk on alustada kõige ohtlikumatest aukudest, et vähendada riski kõige kiiremini.  
    `
  },
  {
    id: 2,
    title: 'Mis on CVSS ja kuidas see toimib?',
    content: `
- **CVSS** (Common Vulnerability Scoring System) annab igale haavatavusele hinde (0–10). See hindamine koosneb kolmest osast:  
- **Baasmõõtmed** (Base Metrics):  
  - • Kirjeldavad haavatavuse tehnilisi omadusi, nt:  
    - • Kui lihtne on ründajal ligi pääseda (ligipääsu vektor)  
    - • Kas on vaja kasutajaõigusi  
    - • Kui suur mõju on konfidentsiaalsusele, terviklikkusele ja kättesaadavusele  
- **Keskkonnamõõtmed** (Environmental Metrics):  
  - • Arvestavad, kuidas konkreetne haavatavus mõjutab sinu organisatsiooni. Näiteks:  
    - Kui haavatavus on teie ettevõttes kasutatava riistvara või tarkvara kohta, võib skoor tõusta 
- **Ajutised mõõtmed** (Temporal Metrics):  
  - Hinnates praegust olukorda:  
    - • Kas on olemas juba avalikuks saanud tööriist (Proof of Concept), mis näitab, kuidas seda auku ära kasutada  
    - • Kas on juba lahendus või parandustööriist, mis aitab seda viga kõrvaldada  
- Kõik need andmed kombineeritakse, et anda haavatavusele lõplik **CVSS-skoor**, mis aitab võrrelda, millised augud vajavad kiiret tähelepanu  
    `
  },
  {
    id: 3,
    title: 'Buffer overflow haavatavus (OpenSSL näide)',
    content: `
- **Buffer overflow** tähendab, et programm üritab kirjutada rohkem andmeid, kui mäluplokki (buffer) mahub.  
- • Näiteks **OpenSSL 3.0.2** buffer overflow (CVSS 9.8) lubab ründajal panna süsteemis jooksma oma pahakoodi.  
- • See on **kriitiline**, sest võimaldab kaugkäivitatavaid rünnakuid (RCE).  
- • Seetõttu tuleb seda haavatavust **viivitamatult peatada ja parandada**.  
    `
  },
  {
    id: 4,
    title: 'Info-disclosure haavatavus (Apache Tomcat näide)',
    content: `
- **Info-disclosure** tähendab, et ründaja saab ligipääsu tundlikule infole ilma, et ta saaks koodi käivitada.  
- • Näiteks **Apache Tomcat** info-disclosure (CVSS 4.3) ei luba koodi kirjutada, aga võib paljastada konfiguratsioonifailide sisu või muid salvestatud andmeid.  
- • Praegu pole selle vastu avalikku eksplooti (exploit), seega võib oodata ametlikku parandust.  
- • Siiski tasub silm peal hoida, sest ründajad võivad seda infot hiljem ära kasutada.  
    `
  },
  {
    id: 5,
    title: 'Use-after-free haavatavus (Adobe Reader näide)',
    content: `
- **Use-after-free** juhtub siis, kui programm üritab kasutada mäluplokki pärast seda, kui see on vabastatud.  
- • See võib viia koodi täitmiseni ilma loata (RCE).  
- • Näiteks **Adobe Reader** use-after-free (CVSS 8.2) on nähtud päris ründekampaaniates, kus pahatahtlikud PDF-id põhjustavad süsteemi ülevõtmise.  
- • Kuna selliseid ründeid on juba kasutatud, on see haavatavus **kõrge prioriteediga** ja tuleb kiirelt kontrolli alla saada.  
    `
  },
  {
    id: 6,
    title: 'Konfiguratsiooni-põhised ohud (Legacy Telnet)',
    content: `
- **Legacy Telnet** on vanamoodne ühendusviis, mis ei krüpteeri andmeid.  
- • Kui keegi sellega ühendub, liiguvad paroolid ja kõik muu selges tekstis.  
- Kuigi sellel puudub ametlik CVE, on see **konfiguratsioonipõhine oht**:  
  - • Volitamata isik saab lihtsalt sisse logida  
  - • Kes kuuleb ja näeb võrguliiklust, võib parooli pealt kuulata  
- Selle vastu on soovitatav kas **Telnet välja lülitada** või asendada see turvalise **SSH**-ühendusega.  
    `
  },
  {
    id: 7,
    title: 'Kriitiline privileegide tõstmise viga (PrintNightmare)',
    content: `
- **PrintNightmare** on Windowsi trükiserveri viga (CVSS 8.8), mis võimaldab ründajal omandada kõrgeid õigusi kohalikul masinal.  
- • Kui ründajal õnnestub selle kaudu pääseda, võib ta teha peaaegu kõike, mida administraator saaks teha.  
- Seda viga skännitakse juba massiliselt ja aktiivselt(kontrollitakaw internetis palju arvuteid, et leida, kus seda viga veel ei ole korda tehtud), seega tuleks:  
  - • **Ruttu paigaldada** pakutav turvapaik  
  - • Vajadusel lisada täiendavaid kaitsemeetmeid (nt piirata, kes saavad teenuseid kasutada, rakendada Process Protection Level)  
- Kuna see on juba väga levinud rünnak, on see **väga tähtis prioriteet** – miski, mida ei tohiks päeva jooksul edasi lükata.  
    `
  },
  {
    id: 8,
    title: 'IoT-seadmete standardkonfiguratsioonid',
    content: `
- **IoT-kaamera** või muu nutiseade võib tulla tehase­seadistusega, kus on kõvakodeeritud vaikekonto ja -parool (näiteks CVE-2024-10001, CVSS 9.0).  
- • See tähendab, et ründaja saab kohe sisse logida kasutades vaikekontosid.  
- • Pärast sisselogimist võib ta salvestusi üle võtta või liikuda koduvõrku.  
- Selliste seadmete puhul on oluline:  
  - • Vaheta kohe vaikekontode paroolid  
  - • Halda turvaseadeid (nt uuenda püsivarasid, lülita välja kasutud teenused)  
  - • Kontrolli regulaarselt, et seadet pole varem avalikult nähtud (nt Interneti otsingumootorites)  
    `
  }
];

export default function KuberturvalisuseUurija1Leht() {
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
        <button onClick={() => navigate('/kuberturvalisuse_uurija1')}>
          Alusta mängu
        </button>
      </div>
    </div>
  );
}
