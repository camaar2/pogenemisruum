import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Süsteemide riskide tuvastamine üldiselt",
    content: `
Süsteemide riskide tuvastamine on protsess, mille käigus hinnatakse erinevate IT-komponentide
haavatavusi ja ohukohti. Selle eesmärk on:
- Mõista, millised komponendid on **kriitilisemad** ettevõtte toimimiseks
- Hinnata võimalike rünnakute mõjusid ja tõenäosust
- Prioriseerida kaitsemeetmeid ressursside optimaalseks kasutamiseks
`
  },
  {
    id: 2,
    title: "Miks on veebiserver riskantne komponent?",
    content: `
Veebiserverid on sageli **avalikkusele avatud** ja töötavad standardsete portidega, mistõttu:
- Neid skanneeritakse ja testitakse pidevalt automatiseeritud tööriistadega
- Tuntud rünnemeetodid hõlmavad **SQL injection'i**, **XSS-i** ja brauseripõhiseid haavatavusi
- Turvariskide vähendamiseks kasutatakse tulemüüre, sisendi valideerimist ja regulaarselt uuendusi
`
  },
  {
    id: 3,
    title: "Andmebaasi kaitse tähtsus",
    content: `
Andmebaasid hoiavad **konfidentsiaalseid** ja ärikriitilisi andmeid:
- Andmeleke võib põhjustada finants- ja mainekahju
- Juhtumi meetmed: juurdepääsuõiguste range haldus, krüpteerimine ja auditilogid
- Tavalised tööd: SQL päringute turvalisus, turvaliste ühenduste kasutamine
`
  },
  {
    id: 4,
    title: "E-posti serveri turvariskid",
    content: `
E-posti serverid on ründevektor **petusõnumite** ja **pahavaraga**:
- Phishing-sõnumid võivad petta kasutajat klikkima pahatahtlikule lingile
- Manusfailid võivad sisaldada pahavara või skripte
- **Kaitseks** kasutatakse spamifiltreid, manuse kontrolli ja teavitusprotokolle
`
  },
  {
    id: 5,
    title: "Riskide prioriseerimise põhimõtted",
    content: `
Riskide prioriseerimine aitab keskenduda kõige olulisematele ohukohtadele:
1. Hinnake iga riski **tõenäosust** ja **mõju** kombineeritult
2. Määrake kriitilisus: **kõrge**, **keskmine** või **madal**
3. Rakendage esmased kaitsemeetmed kõrge kriitilisusega riskidele
4. Jälgige ja uuendage riskiarvestust regulaarselt
`
  },
  {
    id: 6,
    title: "Võrguriistade riskid (lülitid, ruuterid, WAP-id)",
    content: `
- **Lülitid ja ruuterid** võivad olla ründevektoriks, kui kasutusel on vaikekasutajanimi/salasõna või vananenud püsivara  
- **Traadita pääsupunktid (WAP-id)**, kus nõrk WiFi-krüpteering (nt WEP) lubab pahatahtlikel seadmetel võrku ühendada  
- **Halduse portide** (SSH, Telnet) avatus avalikkusele võimaldab ründajal seadet üle võtta  
- **Kaitseks**: muuda vaikeseaded, uuenda püsivara, kasuta SSH (loomine) asemele Telneti keelamist, piiratud ligipääs (ACL-id)`
  },
  {
    id: 7,
    title: "Tööjaamade ja mobiilseadmete riskid",
    content: `
- **USB-seadmed** (mälupulgad, kõvakettad) võivad levitada pahavara (nt autorun)  
- **Mobiilseadmed** (nutitelefonid, tahvelarvutid) võivad pääseda töövõrku VPN-i kaudu ning tuua kaasa pahatahtliku rakenduse või valede õiguste jagamise  
- **Kaitseks**: keela autorun, luba ainult kontrollitud USB-seadmeid (MDM-tarkvara), kehtesta mobiilsidepoliitika ja lubatud rakenduste nimekiri`
  },
  {
    id: 8,
    title: "Pilvekeskkonna riskid",
    content: `
- **IAM-i reeglite valesti konfigureerimine** (liiga lai ligipääs) võib anda ründajale haldusõigused pilvekeskkonnas  
- **Avalikud salvestusämbrid** (nt S3, Blob Storage) võivad sisaldada tundlikke faile, kui pole õigesti seadistatud  
- **Pilvepõhise teenuse logide puudumine** raskendab intsidenti avastamist (nt puuduvad CloudTrail või CloudWatch jäljed)  
- Kaitseks: piiratud minimaalsed IAM-i õigused, andmete krüpteerimine, regulaarne pilvelahenduse skaneerimine, tsentraliseeritud logide hoidmine`
  }
];

export default function Arhitekt1Leht() {
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
        <button onClick={() => navigate('/arhitekt1')}>
          Alusta riskide tuvastamist
        </button>
      </div>
    </div>
  );
}
