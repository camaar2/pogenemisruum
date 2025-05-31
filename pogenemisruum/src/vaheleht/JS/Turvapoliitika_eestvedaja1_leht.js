import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
{
    id: 1,
    title: "Mis on GDPR?",
    content: `
- **GDPR (General Data Protection Regulation)** on Euroopa Liidu üldmäärus, mis sätestab reeglid, kuidas ettevõtted ja organisatsioonid peavad isikuandmeid koguma, kasutama ja hoidma.  
- • Isikuandmed on info, mis ütleb, kes sa oled (nt nimi, e-posti aadress, telefoninumber). GDPR tagab, et sul on õigus teada, milliseid andmeid sinu kohta hoitakse ja kuidas neid kasutatakse.  
- Peamised punktid:  
-    1. **Õigus teabele** – sul peab olema lihtne aru saada, miks ja millal sinu andmeid kogutakse.  
-   2. **Õigus juurdepääsule ja parandusele** – saad ise kontrollida, mis andmed sinu kohta on ja parandada neid, kui need on valed.  
-   3. **Õigus andmete kustutamisele** – vajadusel saad paluda, et sinu andmed kustutataks.  
-   4. **Õigus andmete üleandmisele** – saad nõuda, et su andmed kantakse üles tööriista, mida teises süsteemis saab kasutada.  
- • GDPR on nagu kodanikuõiguste seadus, mis ütleb, et sinu isikuandmed peavad olema turvaliselt kaitstud ja sa võid ise kontrollida, mida sinust teatakse.`
},
{
    id: 2,
    title: "Mis on NIS2 direktiiv?",
    content: `
- **NIS2 (Network and Information Security)** on Euroopa Liidu direktiiv, mis kohustab valdkondlikke ettevõtteid (nt energia, transport, tervishoid, digiteenused) tugevdama oma küberturbe taset.  
- • NIS2 on kui maanteeohutuse eeskirjad, aga arvutimaailmas – ettevõtted peavad tagama, et nende süsteemid ei langeks küberrünnakute ohvriks.  
- Peamised nõuded:  
-    1. **Riskihindamine ja turvameetmed** – ettevõtted peavad uurima, kus on haavatavused (näiteks vananenud tarkvara) ja kujundama sobivad kaitsemeetmed (nt tulemüürid ja turvaskaneerimine).  
-    2. **Intsidentide teavitamine** – kui rünnak või rikkumine juhtub, tuleb sellest teavitada pädevat asutust (riiklikku tsiviilkaitset) kindla ajaraami jooksul (nt 24–72 tundi).  
-    3. **Parandamise ja taastamise plaan** – peab olema kirjas, kuidas ettevõte taastub peamisest rünnakust ja tagab, et teenused tagasi tööle hakkavad.  
-    4. **Koolitus ja teadlikkus** – töötajad peavad mõistma, kuidas ära tunda ründeid ja milline on nende roll kriisiolukorras.  
- • Kokkuvõte: NIS2 aitab vähendada suurt klassi ettevõtteid küberohtude eest kaitsmiseks ja tagab kiire reageerimise juhul, kui midagi läheb valesti.`
},
{
    id: 3,
    title: "Miks ei kehti ISO 27001 standard?",
    content: `
- **ISO 27001** on rahvusvaheline standard, mis kirjeldab, kuidas luua ja hallata efektiivset infoturbe juhtimissüsteemi (ISMS).  
- • See on nagu maantee ohutusstandardid autotööstusele – ettevõtted saavad järgida juhiseid, kuidas hoida oma andmed ja süsteemid turvaliselt, aga see pole seadus.  
- Peamine erinevus:  
-    1. **ISO 27001 on vabatahtlik** – ettevõte võib otsustada, kas ta soovib järgida standardi nõudeid ja saada sertifikaadi.  
-    2. **ISO 27001 ei ole seadus** – see tähendab, et pole trahvimist või jõustamist otseselt seadusandlikult. Mõnel juhul võivad valitsusasutused või kliendid nõuda ISO 27001 sertifikaati, aga see põhineb kokkuleppel (nt lepingul), mitte iseenesest.  
-    3. **Õiguslikult kohustuslikud on reeglid** – näiteks GDPR ja NIS2, mis on nõudmised, mille rikkumisel võib määrata trahvi (nt GDPR-i rikkumise korral kuni 20 miljonit eurot või 4 % ettevõtte aastakäibest).  
- • Kokkuvõte: ISO 27001 on kasulik raamistik ja näitab, et ettevõte võtab infoturvet tõsiselt, aga see ei sunni ettevõtet ise paigaldama turvameetmeid – see on pigem hea tava, mitte kohustus.`
},
{
    id: 4,
    title: "Põllumajanduse toetuste seadus",
    content: `
- **Põllumajanduse toetuste seadus** reguleerib, kuidas põllumehed ja maaomanikud saavad Riigilt või Euroopa Liidult toetusi.  
- • See on pigem põllumajanduse rahastamise eeskiri, mis ütleb, kes saab toetust, millal ja kui palju.  
-  Peamine punkt: see seadus ei sisalda konkreetseid küberturbe nõudeid – see ei ütle, kuidas organisatsioonid peaksid kaitsma oma infosüsteeme või isikuandmeid.`
}
];

export default function TurvapoliitikaEestvedaja1Leht() {
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
        <button onClick={() => navigate('/turvapoliitika_eestvedaja1')}>
          Alusta nõuete valideerimist
        </button>
      </div>
    </div>
  );
}
