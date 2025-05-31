import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
{
    id: 1,
    title: "Prioriteetide tähendused",
    content: `
**Kõrge prioriteet** (High): oht, mis nõuab viivitamatut reageerimist, näiteks:
- • 0-day haavatavus – turvaauk, millele pole veel parandust tehtud.  
- • Lunavara levik – pahavara, mis krüpteerib andmed ja nõuab lunaraha.
      
**Keskmine prioriteet** (Medium): oht, mida saab hallata tavapäraste kaitsemeetmetega, näiteks:
- • Port-skaneerimine – ründaja proovib läbi mitme pordi leida avatud teenuseid.  
- • DDoS-rünnak – liiga suur hulk liiklust, mis võib teenuse kättesaamatuks muuta.
      
**Madal prioriteet** (Low): oht, millega tegeletakse rutiinsel viisil, näiteks:
- • Phishing-kampaania jälgimine – e-kirjad, mis üritavad kasutajatelt paroole varastada.  
- • DNS-kirjete analüüs – et leida võltsitud või kahtlasi domeene ja seeläbi tuvastada pahatahtlik tegevus.`
},
      
{
    id: 2,
    title: "Prioriseerimise protsess",
    content: `
  Analüütik hindab iga tuvastatud ohu mõju ja tõenäosust.  
  Prioriteet määratakse vastavalt riskiskoorile:
  - • **High**: kõrge mõju + kõrge tõenäosus  
  - • **Medium**: mõõdukas mõju või tõenäosus  
  - • **Low**: madal mõju ja madal tõenäosus`
  },
  {
    id: 3,
    title: "Näited ohtudest",
    content: `
- • **High**: uus lunavara tüvi (pahavara, mis lukustab andmed ja nõuab lunaraha), 0-day haavatavus (turvaauk, millele pole veel lahendust), SQL Injection (veebivormi kaudu sisestatav pahatahtlik kood, mis pääseb otse andmebaasi).  
- • **Medium**: port-skaneerimine (ründaja proovib leida avatud ühendusi ja häkkida seeläbi), DDoS rünnak (liigne võrguliiklus, mis ülekoormab serveri ja teeb teenuse kättesaamatuks), serveri avatud port 445 (port, mida võib kasutada pahatahtlikuks ligipääsuks).  
- • **Low**: phishing-kampaania (petturlik e-kiri, mis üritab kasutajatelt paroole varastada), Telnet port (vana ja turvamata viis, mille kaudu keegi võib kaugühendust luua), DNS kirjed (valed või pahatahtlikud domeeni sätted, mis võivad suunata kasutaja pahavaralistele saitidele).`
  }
  
];

export default function KuberturbeOhuanaluutik3Leht() {
  const navigate = useNavigate();

  return (
    <div className="tutorial-page">
      {tutorialSections.map(sec => (
        <section key={sec.id} className="tutorial-section">
          <h2>{sec.title}</h2>
          <div className="tutorial-content">
            {}
            <ReactMarkdown>{sec.content}</ReactMarkdown>
          </div>
        </section>
      ))}
      <div className="tutorial-footer">
        <button onClick={() => navigate('/kuberturbe_ohuanaluutik3')}>
          Alusta prioriseerimist
        </button>
      </div>
    </div>
  );
}
