import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
    {
      id: 1,
      title: "Uuenduste allalaadimine",
      content: `
  - **Uuenduste allalaadimine** tähendab, et võtad ette turvapaigad või tarkvarauuendused otse tarkvaratootja ametlikult veebisaidilt või värskenduskontrolli kaudu.  
      
  - • **Kontrolli failide terviklikkust ja digiallkirja** tähendab, et enne installimist veendud, et allalaaditud fail on puutumata ja ohutu (nagu kontrolliksid kingitusel templimärki, et see pole võlts).  
  - • Miks see oluline on? Kui sa ei kontrolli, võib keegi petta sind laadima alla pahatahtliku faili, mis näeb välja nagu ametlik uuendus, aga tegelikult paigutab sinu arvutisse viiruse.  
  `
    },
    {
      id: 2,
      title: "Uuenduste paigaldamine",
      content: `
  -  **Uuenduste paigaldamine** tähendab, et installeerid allalaaditud tarkvarapaketi või turvapaiga oma arvutisse või serverisse, järgides tootja juhiseid.  
  - • Mõtle, et paned uue koodiga turvaluku oma maja ukse sisse; sa pead võtme õigesti paigaldama, et turvasüsteem hakkaks kohe töötama.  
  - • Paigaldamine võib olla kas automaatne (tarkvara ise käivitab installimise) või käsitsi tehtav, kus pead haldustööriista kaudu vajutama nuppu “Installi” ja järgima ekraanil kuvatavaid samme.  
  - • Veendu, et **kõiki komponendid uuendatakse** – see tähendab, et kui sul on mitu serverit või mitu rakendust, pead igaühel uuenduse samamoodi läbi viima.  
  `
    },
    {
      id: 3,
      title: "Teenuste taaskäivitamine",
      content: `
  - **Teenuse või kogu süsteemi taaskäivitamine** tähendab, et pärast uuenduste paigaldamist lülitad teatud programmiosad (teenused) välja ja käivitad uuesti, et tarkvarasse tehtud muudatused rakenduksid.  
  - • **Teenused** on taustal töötavad programmid (näiteks veebiserver, andmebaas, kujutlev logitöötlus), mille peatad ja alustad uuesti, et nad võtaksid uued failid ja turvaparandused kasutusele.  
  - • Kui uuendusi paigaldad, aga ei taaskäivita teenuseid, võivad vanad komponendid endiselt töötada ja turvapaik jääb rakendamata.`
    },
    {
      id: 4,
      title: "Turvahoiatuste kontrollimine",
      content: `
  - **Turvahoiatuste kontrollimine** tähendab, et vaatad üle seire- ja logisüsteemide kirjed, et veenduda, et äsja installeeritud uuendused töötavad õigesti ning ei tekitanud uusi vigu.  
  - • **Seiresüsteemid** (nt logihaldurid, turvamonitorid) salvestavad kirjeid selle kohta, mis arvutis või serveris toimub (nt kes üritas sisse logida, millised vead ilmusid).  
  - • Kui näed murettekitavaid kirjeid (nt “Teenuse käivitamisel ilmnes viga” või “Palju ebaõnnestunud sisselogimiskatseid”), tuleb kiiresti uurida, miks uuendus valesti töötas, ja vajadusel sekkuda.  
  - • Regulaarne logide ja turvahoiatuste kontrollimine aitab avastada probleeme kohe, enne kui need suuremaks kasvavad.`
    }
  ]
  ;

export default function KuberturbeRiskijuht2Leht() {
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
        <button onClick={() => navigate('/kuberturbe_riskijuht2')}>
          Alusta uuenduste järjekorda
        </button>
      </div>
    </div>
  );
}
