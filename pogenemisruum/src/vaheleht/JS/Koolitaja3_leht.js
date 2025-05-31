import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
    {
      id: 1,
      title: "Mis on õngitsuskirjade simulatsioon?",
      content: `
  - **Õngitsuskirja simulatsioon** ehk kontrollitud petukirjade test on meetod, kus turvameeskond saadab töötajatele spetsiaalselt loodud võltskirju.  
  - • **Eesmärk** on näha, kas töötajad klikivad kahtlastel linkidel või sisestavad oma paroole, ilma et reaalseid andmeid ohustataks.    
  - • Kui keegi saadab sinu kontorisse kirja, mis näeb välja nagu see oleks pärit pangast, aga tegelikult on see kolmanda osapoole loodud ja testimiseks mõeldud, saad teada, millised töötajad on eriti ettevaatlikud ja millised vajavad täiendavat koolitust.  
  - • **Tulemuseks** saadakse nimekiri haavatavatest lülidest (need töötajad, kes klikivad), et neile saata täiendavat teavitust ja koolitust.`
    },
    {
      id: 2,
      title: "Miks valida sihtsuunatud spear-phishing?",
      content: `
  - **Spear-phishing** on õngitsuskirjade alamliik, kus ründaja lähtub konkreetse inimese või osakonna kohta kogutud infost (nt nimi, ametipositsioon, hiljutine projekt).  
  - • **Mõte on see, et** kirjad tunduvad palju töökindlamad: näiteks saadetakse juhatuse liikmele kiri “ABC Krediidiasutuselt”, mis viitab just tema viimasel majanduskoosolekul mainitud kontole.  
  - • **Eelis masskampaania ees:** mass-õngitsus saadab identse kirja tuhandetele inimestele korraga, nii et kui sõnum sind ei puuduta või arusaadavalt mitte asjakohane, võivad paljud seda ignoreerida. Spear-phishingu puhul tundub kiri personaalsem ja ahvatlevam, mistõttu töötaja võib reageerida kiiremini ja tahtmatult riskida.  
  - • **Eesmärk on tuvastada eelkõige kallimaid sihtmärke** (nt finantsjuht, IT-administraator), kes omavad suuremaid õigusi, et õpitu põhjal kohandada täiendavad turvameetmed.`
    },
    {
      id: 3,
      title: "Õngituskampaania üldine lähenemine",
      content: `
  - **Mass-kampaania** tähendab, et saadad identse petukirja (nt pangateavituse või Microsofti turvateate) kõigile töötajatele korraga.  
        - **Eelis:** kiire ülevaade, kui hästi kogu meeskond tunneb ära ilmse petukirja (nt vale logo, pahatahtlik link).  
        - **Puudus:** ei pruugi märgata neid töötajaid, kellel on kõrgem risk (nt need, kes töötavad rahanduse või IT-valdkonnas).  
    - • **Spear-phishing (sihtsuunatud kampaania)** tähendab, et saad korrektseks tunduvat kirja konkreetsele osakonnale või isikule, mis põhineb eelnevalt kogutud infol (nt keegi tõestas, et töötab IT-osakonnas ja vastutab serverite eest).  
        - **Eelis:** realistlikum pettuse stsenaarium. Näiteks saadetakse IT-administraatorile kiri “Helsingi peaarhiiv küsib serverilogide edastamist”, mis näib täpselt sobivat tema igapäevatööga.  
        - **Puudus:** eeldab rohkem eeltööd – ründaja peab uurima iga sihtmärgi kohta eraldi.  
    - • Kui laseksid koolis ette panna kõigile ühtse viktoriini, näeksid vaid üldist taset. Kui aga valiksid mõned õpilased eraldi testile konkreetsete küsimustega, näed paremini, kes valdkonnas hästi orienteerub ja kes vajaks täiendavat tuge.  
    - • **Valik** sõltub eesmärgist: kas soovid kiirelt näha, kuidas kirjaga üldiselt hakkama saadakse (mass), või testid konkreetseid kõrge riskiga isikuid (spear).`
    },
    {
      id: 4,
      title: "Kuidas õngitsuskirju ära tunda?",
      content: `
- • **Saatja aadress:** kontrolli, kas domeen pärast “@” on õige (nt “@sinu-pank.ee”) või mõni väike tähevea-võltsing (nt “@sinu-pankk.ee”).

    - Kui lendad Peterburi, ei saa keegi sulle saata kirja “Pekingi lennufirmast” ja küsida sinu passinumbrit – see on vale saatja.  
- • **Lingid ja URL-id:** liigu kursoriga lingi kohale ilma klõpsamata; vaata aadressiribale, kas see viib tõesti “https://www.sinu-pank.ee/…”, mitte “http://evil.example.com”.

    - Kui kaart näitab, et selle kasvuhoone aadress on hoopis kõrvalmajas, ei tasu sinna kõndima hakata.  
- • **Kahtlane sisu ja toon:** kui kiri kisendab “KIIRUSTA! KLÕPSA KOHE!” või sisaldab hüüumärke ning ähvardab kontolukustusega, on tõenäoliselt tegu petuskeemiga. 

    - Kui kaupluse turvamüüja hüüab sulle kõrvalt, et pead kohe ostma, sest “ainult täna on imekombel kogu kaup -50%”, siis ilmselt on see reklaam – aga kui keegi ähvardab sul kohe pangakonto ära anda, peaks olema ettevaatlik.  
- • **Manused:** kui tegemist on .exe-, .zip- või .docm-failiga, lase pahavara-tarkvaral esmalt skaneerida, enne kui avad. 

    - Ära ava pakki, mille ümbrik näeb välja kahjustatud – võid endale saada pahavara ja lõhkuda oma arvuti.  
- • Kui kirjas on midagi ootamatut (nt “Anname sulle hüvitist” või “Tõesta oma identiteeti kohe”), sea endale reegel:  
    1. Kontrolli saatjat  
    2. Ära klõpsa lingile kohe, vaata lingi täispikka aadressi  
    3. Kui oled kahtleval seisukohal, küsi abi IT-osakonnalt või tee otsing internetis, et näha, kas see kiri on tõesti tuntud ettevõtte saadetud.`
    }
  ];

export default function Koolitaja3Leht() {
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
        <button onClick={() => navigate('/koolitaja3')}>
          Alusta simulatsiooni valikut
        </button>
      </div>
    </div>
  );
}
