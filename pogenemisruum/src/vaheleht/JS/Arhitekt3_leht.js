import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
    {
      id: 1,
      title: "Mis on Perimeter tsoon?",
      content: `
  - **Perimeter** on võrgu "välispiir", kus asuvad seadmed, mis on otse ühendatud internetiga.  
    - Kujuta ette, et Perimeter on nagu maja esivärav – see on esimene punkt, kus kontrollitakse, kes sisse ja välja pääseb.  
  - • Näiteks **VPN Gateway** on Perimeter-seade, mis lubab ainult usaldatud kasutajatel (näiteks kontoritöötajad) turvaliselt sisevõrku siseneda, samal ajal hoides ära teadmata külaliste ligipääsu.  
  - • Perimeter tsoon on koht, kus sinu küberturvamehed (tulemüürid, VPN-id, IDS/IPS) seisavad valvuritena “värava” juures, et lubada vaid lubatud liiklust edasi sisevõrku.`
    },
    {
      id: 2,
      title: "Mis on DMZ tsoon?",
      content: `
  - **DMZ (Demilitarized Zone)** on isoleeritud alavõrk, kus paigutatakse avalikud teenused (nt veebiserverid, DNS resolverid).  
    - Kujuta ette, et DMZ on nagu maja eesaias asuv abihoone – külalised (interneti kasutajad) saavad sinna turvaliselt ligi, aga nad ei pääse otse elutubadesse (sisevõrku).  
  - • Avalikud teenused nagu **veebiserver** asuvad DMZ-is, et kui keegi ründab seda veebiserverit, ei pääse ta otse sinu siseandmebaasi või sisemiste serveriteni.  
  - • DMZ tsoon on turvaline tsoon “esikorrusel”, kus külalised saavad olla, aga nad ei saa otse minna “sisehoovi” (Internal Net).`
    },
    {
      id: 3,
      title: "Mis on Internal Net?",
      content: `
  - **Internal Net** (sisemine võrk) sisaldab usaldusväärseid ressursse, mida saavad kasutada ainult organisatsiooni töötajad, näiteks **andmebaasid**, **LDAP serverid** ja failiserverid. 

    - Kujuta ette, et Internal Net on maja magamistoad ja kontoriruumid, kuhu pääsevad ainult pereliikmed ja kutsetud külalised.  
  - • Need ressursid ei tohiks olla otse internetis nähtavad, sest ründaja ei pääse sisemistesse failidesse ega kasutajate andmetele ligi.  
  - • Internal Net on turvaline siseala, kuhu pääseb vaid siis, kui oled juba üle Perimeter-i ja DMZ-i, näiteks VPN-i või siseõige kaardiga.`
    },
    {
      id: 4,
      title: "Miks on segajad olulised?",
      content: `
  - **Segajad** on komponendid, mis ei kuulu selle etapi ülesannete hulka ja mis tuleb hoida eraldi, sest need ei aita turvatsooni ülesande täitmisel.  
    - Näiteks **arenduskeskkonna VM-id** (virtuaalmasinad), mis on mõeldud testimiseks, ei peaks olema tootmissegmendi ehk turvalise laadungiga serverite seas.  
  - • Kujuta ette, et kui maja eesaias (DMZ) on mitu ebavajalikku mööblieset, takistavad meie liikumist ja suurendavad riski – seetõttu viid need kõrvale või teise ruumi.  
  - • Segajad aitavad selgelt eristada, millised seadmed või teenused kuuluvad konkreetsele tsoonile ja millised mitte, nii et sa ei segaks testkeskkust (arendus) live-teenustega (tootmine).`
    }
  ];

export default function Arhitekt3Leht() {
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
        <button onClick={() => navigate('/arhitekt3')}>
          Alusta segmentimist
        </button>
      </div>
    </div>
  );
}
