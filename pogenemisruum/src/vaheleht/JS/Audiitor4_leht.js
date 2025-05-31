import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
{
    id: 1,
    title: "Mis on kvartaalne sissetungitestimine?",
    content: `
- **Kvartaalne sissetungitestimine (pentest)** tähendab, et iga kolme kuu tagant kutsutakse turvaspetsialistid prooviks süsteemi „rünnata“.  
- • Nemad proovivad leida haavatavusi ja turvaauke, enne kui pahatahtlikud häkkerid suudavad.  
- • See aitab tagada, et teie süsteemid on iga väike periood kontrollitud ja turvalisus püsib ajakohane.`
},
{
    id: 2,
    title: "Mida teeb pidev logimonitooring?",
    content: `
- **Pidev logimonitooring** tähendab seda, et süsteemi genereeritud andmed (logid) vaadatakse reaalajas üle.  
- • Logid on nimekiri kõigist tegevustest (näiteks kasutaja sisselogimine, failide avamine, võrguliiklus).  
- • Monitoorimine tuvastab ebatavalisi mustreid (nt korduvad ebaõnnestunud sisselogimised või ootamatult suur andmeliiklus), mis võivad viidata turvarikkumisele.  
- • Kui midagi kahtlast ilmneb, annab süsteem kohe märku, et turvameeskond saaks kiirelt reageerida.`
},
{
    id: 3,
    title: "Miks andmete varundamine ja audit pole siin esmane?",
    content: `
- **Andmete varundamine** tähendab, et tehakse koopiad failidest ja infohulgast juhuks, kui midagi katki läheb või rikutakse.  
- • **Audit** on üldine ülevaatus, kus vaadatakse lahti protsessid ja süsteemid, et tuvastada laiemad riskid ja nõrkused.  
- • Kuigi mõlemad on pikaajaliselt väga tähtsad (tagavad, et kaotatakse võimalikult vähe andmeid ja üldine turvasituatsioon paraneb), ei aita nad kohe tuvastada ja ennetada aktiivseid rünnakuid või häireid.  `
},
{
    id: 4,
    title: "Mis on üldine auditi läbiviimine?",
    content: `
- **Üldine audit** on põhjalik ülevaatus, kus kontrollitakse kogu organisatsiooni protsesse ja süsteeme laiemalt.  
- • Selle käigus vaadatakse, kas ettevõtte reeglid ja parimad praktikad on täidetud (näiteks kas serverid, tarkvara ja tööprotsessid vastavad standarditele).  
- • Audit annab üldise pildi turvalisusest, kuid ei toeta reaalajas turvaintsidentide avastamist. `  
  },
  {
    id: 5,
    title: "Miks andmete varundamine pole siin esmane?",
    content: `
- **Andmete varundamine** tähendab, et tehakse koopiad olulistest failidest ja andmebaasidest juhuks, kui originaalid rikutakse või kustutatakse.  
- • Varukoopiad võimaldavad süsteemi taastada, kui andmed on kaotsi läinud (nt riistvara rikke või pahavara tõttu).  
- • Kuigi varundamine on tähtis andmete säilitamiseks, ei aita see reaalajas tuvastada turvaohtusid ega peatada aktiivseid rünnakuid. `  
  },
  {
    id: 6,
    title: "Mis on turvahäirete logi analüüs?",
    content: `
- **Turvahäirete logi analüüs** tähendab varasemate logifailide ehk sündmuskirjete ülevaatamist.  
- • Logid on kronoloogiline nimekiri kõigist tegevustest (näiteks kasutajate sisselogimised, failide avamised ja võrguliiklus).  
- • Logi analüüs võimaldab järele vaadata, mis juhtus, ja selgitada välja, kas varem on olnud turvarikkumisi (post-mortem analüüs).  
- • Kuid see ei toeta reaalajas jälgimist ega rünnakute ennetamist.`
  }
];

export default function Audiitor4Leht() {
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
        <button onClick={() => navigate('/audiitor4')}>
          Alusta soovituste valimist
        </button>
      </div>
    </div>
  );
}
