import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturbe_ohuanaluutik1_leht.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on 0-day rünne?",
    content: `
0-day rünne (tuntud ka kui “päevi null” rünne) kasutab ära turvaauku, mille vastu 
veel pole avalikult teadaolevat korrigeerivat plaastrit. See tähendab, et rünnak 
võib alata kohe pärast haavatavuse avastamist, enne kui tarkvaratootja jõuab välja anda 
fikseeriva uuenduse. Analüütik peab:
- Jälgima CERT-hoiatuseid ja turvafirmade blogisid  
- Uurima, kas on leitud malli­kood või PoC (Proof of Concept)  
- Koordineerima intsidentide reageerimismeeskonnaga plaastri rakendamiseks  
`
  },
  {
    id: 2,
    title: "Mis on ohuteabe kogumine (Threat Intelligence)?",
    content: `
Ohuteabe kogumine hõlmab andmete ja signaalide kogumist erinevatest allikatest, et ennustada 
või tuvastada ohtusid enne, kui need realiseeruvad. Peamised sammud on:
1. **Allika identifitseerimine** – nt CERT, turvafirmade blogid, foorumid, sotsiaalmeedia  
2. **Andmete normaliseerimine** – erinevate formaatide (STIX, JSON) viimine ühtsele kujule  
3. **Analüüs ja korrelatsioon** – mustrite otsimine, IOC-de (Indicators of Compromise) koondamine  
4. **Teadete koostamine** – hoiatused, raportid, dashboard’id  
`
  },
  {
    id: 3,
    title: "Küberturbe ohuanalüütiku igapäevatöö",
    content: `
1. **Häirete jälgimine** – SIEM-i ja EDR-i logid, IDS/IPS sündmused  
2. **IOC-de uuendamine** – mustade IP-de, domeenide, failisignatuuride andmebaasid  
3. **Tõrgete tuvastus** – vale-positiivsete vähendamine ja tõeliste intsidentide tõstmine  
4. **Koostöös meeskondadega** – intsidentide reageerimine, patch management, juhtumiuuringud  
5. **Raportid ja brief’id** – juhtkonnale kokkuvõtted ning soovitused riskide maandamiseks  
`
  },
  {
    id: 4,
    title: "Ohuteabe tüübid",
    content: `
- **Strategiline** – laiaulatuslikud trendid ja riskihinnangud (juhtkonnale)  
- **Taktikaline** – rünnemeetodid, tööriistad, haavatavused (tehnilistele tiimidele)  
- **Operatiivne** – konkreetsete intsidentide IOC-d, aktiivsed kampaaniad  
- **Tehniline** – failisignatuurid, IP/aadressid, domeenid, C2-serverid  
`
  },
  {
    id: 5,
    title: "Näited ohtlikest stsenaariumitest",
    content: `
- **Ransomware kampaania**, mis levib 0-day kitsiku kaudu – lukustab süsteemid ja nõuab lunaraha  
- **Supply chain rünne** – pahavara peidetakse tarkvarauuendusse  
- **Sotsiaal-insenerlus** – petusõnumid, mis suunavad lingile, mis installib trooja  
- **APT-grupid** (Advanced Persistent Threat) – sihitud, pikaajalised ründed kriitilistele sihtmärkidele  
`
  }
];

export default function Kuberturbe_ohuanaluutik1_leht() {
  const navigate = useNavigate();

  return (
    <div className="tutorial-page">
      {tutorialSections.map(sec => (
        <section key={sec.id} className="tutorial-section">
          <h2>{sec.title}</h2>
          <div className="tutorial-content">
            {sec.content
              .trim()
              .split('\n')
              .map((line, i) =>
                line.trim() ? <p key={i}>{line.trim()}</p> : <br key={i} />
              )}
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
