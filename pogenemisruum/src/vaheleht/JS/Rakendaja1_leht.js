import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
    {
        id: 1,
        title: "Mis on ruuteri ACL-id?",
        content: `
    - **Access Control List (ACL)** on nimekiri reeglitest, mis ütlevad, millised arvutid või võrgud (IP-aadressid) tohivad ruuteri kaudu liikuda.  
    - • Ruuter on seade, mis suunab andmepakette sinu koduvõrgu ja interneti vahel.  
    - • Kujuta ette, et ruuter on väravalvur ja ACL on tema "kellel lubatud" nimekiri. Näiteks võib ACL öelda, et IP-aadress 192.168.1.10 tohib siseneda, aga 203.0.113.5 peab tagasi pöörduma.  
    - • ACL-id peavad silmas, et ainult lubatud sõbrad (arvutid) pääseksid läbi ukse, ülejäänud blokeeritakse.  
    - • See on esimene kaitseliin, sest kui ACL ei luba halba aadressi läbi, siis ei saa ründaja sinu sisevõrku ligi.`
      },
      {
        id: 2,
        title: "Mis on tulemüür?",
        content: `
    - **Tulemüür** on tarkvara või riistvara seade, mis kontrollib kogu sissetulevat ja väljaminevat võrguliiklust (andmepakette).  
    - • Tulemüür kasutab reegleid (näiteks ACL-e), et otsustada, millist liiklust lubada ja millist blokeerida.  
    - **Port** on nagu "ukseava" arvutil või serveril – näiteks port 80 kasutatakse veebilehtede kuvamiseks ja port 25 e-posti saatmiseks.  
    - • Kui tulemüür näeb paketti, mis üritab porti 22 (kaugjuurdepääs SSH) kasutada, kuid reeglid keelavad selle, siis tulemüür ei lase paketti läbi.  
    - • Tulemüür on nagu turvamees hoonetel – ta vaatab, kas sissetuleval liiklusel on lubatud pilet (õiged portid ja IP), ja laseb vaid lubatud liikluse edasi.  
    - • Tulemüür on oluline, sest see hoiab pahatahtlikud programmid ja ründed eemal, blokeerides kättesaamatu võrgu liikluse.`
      },
      {
        id: 3,
        title: "Mis on IDS/IPS?",
        content: `
    - **Intrusion Detection System (IDS)** tuvastab võrgus või arvutis kahtlased või pahatahtlikud tegevused, saates turvameeskonnale teate.  
    - **Intrusion Prevention System (IPS)** ei tee ainult teateid, vaid võib aktiveerida ka reegleid, et kohe rünnakule lõpu teha (näiteks blokeerida kahtlane IP).  
    - **Mustrid** (patterns) ja **allkirjad** (signatures) on etalonid, kuidas teadaolevad ründeviisid käituvad (näiteks pahavara koodijärjendid või ebatavaline võrgu liiklus).  
    - • Kujuta ette, et IDS on nagu valvekaamera, mis märgib, kui keegi üritab siseneda keelatud piirkonda, ja tegevusele järgnevalt teatab turvamehele. IPS on nagu automaatne uks, mis suletakse, kui valvekaamera märkab sissetungijat.  
    - • IDS/IPS töötab reaalajas, seega kui keegi proovib sinu võrgus sees mingit ründeprotsessi käivitada, annab IDS kohe teada ja IPS võib iseseisvalt selle tegevuse lõpetada.`
      },
      {
        id: 4,
        title: "Mis on VPN-ühendus?",
        content: `
    - **VPN (Virtual Private Network)** loob turvalise krüpteeritud “toru” sinu arvuti ja sihtvõrgu (näiteks töövõrgu) vahel üle avaliku interneti.  
    - • Kui kasutad VPN-i, saad juurdepääsu sisevõrgu ressursidele (failiserverid, printerid) nii, et ühendus on kaitstud krüpteeringuga ja keegi kolmas ei saa sinu andmeid lugeda.  
    - **Krüpteerimine** tähendab, et sinu saadetud andmed muudetakse loetamatuks koodiks, mida ainult VPN-serveri ja sinu arvuti vaheline võti lahti saab pakkida.  
    - • VPN on nagu telefoniühendus, kus lisad nagu magamistoa ustesse luku – isegi kui keegi näeb, et sa helistad, ei saa keegi kuulata, mida räägid.  
    - • VPN on eriti kasulik, kui oled avalikus WiFi-võrgus (nt kohvikus), sest see takistab võrguründajaid lugemast sinu meile või paroole.`
      },
      {
        id: 5,
        title: "Miks tugevdada lõppseadmeid?",
        content: `
    - **Lõppseadmed** on arvutid, sülearvutid ja serverid, mida inimesed igapäevaselt kasutavad.  
    - • Kui need seadmed pole kaitstud, võivad ründajad seadmesse tõmmata viirusi või varastada andmeid.  
    - **Paroolide haldus ja viirusetõrje**:  

        - • **Paroolid** peaksid olema pikad ja keerulised (vähemalt 8 tähemärki, suured ja väikesed tähed, numbrid ja sümbolid).  
        - • **Viirusetõrje** tarkvara skaneerib faile ja otsib pahavara, kustutades või pannes kõrvale kahtlased failid.  

    - **Tarkvarauuenduste regulaarne paigaldus**:  

        - • Arendajad parandavad turvaauke uute värskendustega.  
        - • Kui sa neid värskendusi ei installi, jääb su seade haavatavaks ja ründajad saavad haavu ära kasutada.  
    - **Kasutajate ligipääsuõiguste piiramine**:  

        - • Iga kasutaja saab kasutada ainult vähimat vajalikku õiguste hulka. Näiteks tavaline kasutaja ei peaks omama administraatori õigusi.  
        - • Nii ei saa pahavara, mis jõuab tavalise kasutaja kontole, teha suuri muudatusi süsteemis (nt eemaldada turvaprogramme).  
    - See on nagu maja turvamine – vaja on panna tugev uks, aknalukk, installida alarm ja mitte jätta võtmeid tänavale vedelema, et sissetungijad ei pääseks kergelt sisse.`
      }
];

export default function Rakendaja1Leht() {
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
        <button onClick={() => navigate('/rakendaja1')}>
          Alusta võrgu kaitset
        </button>
      </div>
    </div>
  );
}
