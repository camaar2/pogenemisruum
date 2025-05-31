import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on 0-day rünne?",
    content: `
0-day rünne (tuntud ka kui “null päeva” rünne) kasutab ära turvaauku, mille vastu 
veel pole avalikult teadaolevat korrigeerivat lahendust. See tähendab, et rünnak 
võib alata kohe pärast haavatavuse avastamist, enne kui tarkvaratootja jõuab välja anda 
haavatatavust fikseeriva uuenduse. Analüütik peab:
- **Jälgima CERT-hoiatusi ja turvafirmade blogisid** 
- **Kontrollima, kas on olemas näidisprogramm või demo, mis näitab, kuidas seda turvaauku saab ära kasutada**  
- **Tegema koostööd turvameeskonnaga, et paigaldada vajalik tarkvarauuendus**
`
  },
  {
    id: 2,
    title: "Mis on ohuteabe kogumine (Threat Intelligence)?",
    content: `
Ohuteabe kogumine tähendab erinevatest allikatest info kokku viimist ja töötlemist nii, 
et saaksime ohtusid märgata juba enne, kui need reaalselt toimuvad.
Peamised sammud on:
1. **Infoallikate leidmine** – nt CERT (ametlikud hoiatusteated), turvafirmade blogid, foorumid, sotsiaalmeedia  
2. **Andmete normaliseerimine** – erinevate formaatide (STIX, JSON) viimine ühtsele kujule  
3. **Analüüs ja korrelatsioon** – mustrite otsimine, IOC-de (Indicators of Compromise) koondamine  
4. **Hoiatuste ja raportite koostamine** – hoiatused, raportid, visuaalsed kokkuvõtted 
`
  },
  {
    id: 3,
    title: "Küberturbe ohuanalüütiku igapäevatöö",
    content: `
1. **Häirete jälgimine** – Jälgitakse logisid ja süsteemiteateid (SIEM, EDR, IDS/IPS), et leida esimesi märke rünnakust  
2. **Ohtude näitajate uurimine** – Hoitakse ajakohasena nimekirja kahtlastest IP-aadressidest, domeenidest ja failidest, et kiiresti ründeid tuvastada  
3. **Tõrgete tuvastus** – Vähendatakse väärhäireid ning tõstetakse esile tõeliselt ohtlikud sündmused, et reageerijad saaksid keskenduda olulisemale  
4. **Koostöö meeskondadega** – Tehakse koostööd reageerimis- ja hooldusmeeskondadega, et rünnak peatada, uuendused paigaldada ja juhtumit uurida.  
5. **Juhtkonna raportid** – Koostatakse lühikesed ülevaated praegustest ohtudest ja soovitustest, et juhtkond saaks teha põhjendatud otsuseid  
`
  },
  {
    id: 4,
    title: "Ohuteabe tüübid",
    content: `
- **Strateegiline** – annab ülevaate pikemas perspektiivis toimuvast ja suurematest riskidest (sihitud juhtkonnale)  
- **Taktikaline** – selgitab, milliseid ründemeetodeid ja tööriistu ründajad kasutavad ning milliseid haavatavusi nad sihivad (sihitud IT-tiimidele)  
- **Operatiivne** – toob välja konkreetsete sündmuste märgid ja aktiivsed ründekampaaniad (abi kiireks vahetuks reageerimiseks)  
- **Tehniline** – sisaldab täpseid koode ja aadresse, nt failide signatuurid, IP-aadressid, domeenid ja käsuviipserverid (kõige täpsem info tarkvarasüsteemide kaitseks)  
`
  },
  {
    id: 5,
    title: "Näited ohtlikest stsenaariumitest",
    content: `
- **Lunaraha­varaga rünnak** – kurjategijad kasutavad tundmatut turvaauku (0-day), et levida võrku, krüpteerida failid ja nõuda lunaraha süsteemide lukust vabastamiseks  
- **Tarnete ahela rünnak** – pahavara varjatakse tavapärase tarkvarauuenduse sisse, nii et kui organisatsioon uuendab, installitakse koos tarkvaraga ka kahjustav programm 
- **Sotsiaal-insenerlus** – manipuleeritakse inimesi avama linki, manust või muud pahavara, näiteks petusõnumi teel saadetud e-kirja kaudu 
- **APT-grupid** (Advanced Persistent Threat) – keerukad ja sihitud rühmitused, kes tegutsevad pika aja jooksul, jälgides ja rünnates kriitilisi sihtmärke, et varastada olulist infot või kahjustada süsteeme  
`
  }
];

export default function KuberturbeOhuanaluutik1Leht() {
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
        <button onClick={() => navigate('/kuberturbe_ohuanaluutik1')}>
          Alusta mängu
        </button>
      </div>
    </div>
  );
}
