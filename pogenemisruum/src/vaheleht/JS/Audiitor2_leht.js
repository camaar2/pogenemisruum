import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
{
    id: 1,
    title: "Mis on pilve turvalahendus?",
    content: `
    - • **Pilve turvalahendus** tähendab, et kasutatakse pilvepõhiseid tööriistu ja teenuseid, mis aitavad kaitsta andmeid ja süsteeme.  
    -  Need teenused võivad pakkuda:
    - • **Reaalajas jälgimist** – pilv kogub andmeid ja annab kohe teada kahtlasest tegevusest.  
    - • **Sissetungituvastust** – tuvastatakse katsed ebaseaduslikult süsteemi siseneda.  
    - • **Kaitset teenusena (SaaS)** – turvalahendus on kättesaadav veebis, pole vaja ise tarkvara installida.  
    - • **Automaatset skaleerimist** – kaitse suudab vajadusel käsitleda suuremat koormust ilma täiendava seadistamiseta.`
},
{
    id: 2,
    title: "Miks on regulaarne sissetungitestimine oluline?",
    content: `
    - **Regulaarne sissetungitestimine (pentest)** aitab leida turvaauke enne, kui ründajad neid avastavad.  
    - • See tähendab, et turvaeksperdid proovivad kontrollitud viisil süsteemi sisse murda, et näha, kus on probleemid.  
    - • Regulaarne pentest tagab, et teie kaitsemeetmed jäävad ajakohaseks ja töökindlaks, vähendades riski päris rünnakute puhul.`
},
{
    id: 3,
    title: "Miks töötajate koolitus ei ole esmane?",
    content: `
    - • Kuigi **töötajate koolitus** on oluline, ei lahenda see tehnilisi nõrkusi siis, kui süsteeme värskendatakse või parandatakse (hooldustööde ajal).  
    - • Sel ajal on kõige kriitilisem ajutine kaitse taastamine, näiteks turvavärskenduste paigaldamine või ajutised kaitsemeetmed.`
},
{
    id: 4,
    title: "Andmete krüpteerimine ja juurdepääsu kontroll",
    content: `
    - **Andmete krüpteerimine** tähendab, et muudetakse info kujule, mida saab lugeda ainult õige võtmega. See hoiab andmed kaitstud ka siis, kui keegi võõras neile ligi saab.  
    - **Juurdepääsu kontroll** tähendab, et määratakse, kes tohib andmeid näha või muuta. Ainult volitatud kasutajad saavad andmetele ligi.  
    - • Need meetmed aitavad pikaajaliselt riske vähendada, kuid kiirel hooldusajal (kui tehakse süsteemiuuendusi) on esmased kaitsemeetmed sellised infrastruktuurilised lahendused nagu tulemüürid, võrgu segmentimine ja varukoopiate kasutamine.`
  }
  
];

export default function Audiitor2Leht() {
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
        <button onClick={() => navigate('/audiitor2')}>
          Alusta turvameetmete valimist
        </button>
      </div>
    </div>
  );
}