import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
    {
      id: 1,
      title: "INFO, WARNING ja ERROR logide tähendus",
      content: `
- • **Logifailid** on nagu päevik, kuhu arvuti või server salvestab kronoloogiliselt kõik olulised sündmused (nt „kes sisselogis“, „mis programm käivitati“ või „milline viga tekkis“).  
  - **INFO** annab teada süsteemi igapäevastest ja ootuspärasematest tegevustest, näiteks “veebiserver alustas normaalset tööd” või “kasutaja X sisselogimine õnnestus”.  
    - Kujuta ette, et sinu auto salvestab logiraamatusse iga kord, kui sina käivitad mootori ja lähed tööle – see on INFO.  
  - **WARNING** hoiatab ebatavalisest olukorrast, mis praegu veel ei riku midagi, kuid võib kujuneda probleemiks (nt “kettal on vaba ruumi ainult 10%” või “failiõigused ei ole oodatud kujul”).  
    - Kui auto näitab tahhomeetril madalat kütusetaset, ei pruugi veel midagi juhtuda, kuid see on hoiatus, et pead kiiresti tankima.  
  - **ERROR** tähistab rasket viga või turvariskiga sarnast olukorda, mis vajab kohest tähelepanu (nt “baasühen­dus ebaõnnestus” või “turvapaik puudub, avastatud haavatavus”).  
    - Kui auto mootor põleb või pidurid lakkavad töötamast, on see kriitiline viga – see on ERROR.  
  - **Miks see oluline on?** Kuna logid salvestavad nii INFO-, WARNING- kui ERROR-sündmusi, saab administreerija kiiresti aru, mis läheb hästi ja millal esineb turvarisk või tehniline rike.`
    },
    {
      id: 2,
      title: "Sisselogimiskatsete kaitse",
      content: `
  - **SSH (Secure Shell)** on turvaline viis kaugühenduseks serveriga – mõtle sellest kui salajasest uksest, mille kaudu saad oma arvutist teenuseid hallata. Tavaliselt kuulub SSH-port nimega **port 22**.  
  - **ERROR-logid** need tähistavad ebaõnnestunud sisselogimiskatseid SSH kaudu. Kui näed logis mitu järjestikust “ERROR: authentication failure for user X”, võib see tähendada, et keegi proovib jõuga parooli ära arvata (**brute-force rünnak**).  
    - Kujuta ETTE, et keegi proovib korduvalt ukse jaoks vale koodi sisestada – iga kord, kui kood on vale, teeb uks häält (“vale kood”). Kui kuuled palju “piiksusid” järjest, on selge, et keegi püüab sisse tungida.  
  - **Kuidas kaitsta?**  
    1. Piira SSH-ühendusi ainult usaldatud IP-aadressidele (näiteks lubatud ainult kontoritest või VPN-ist).  
    2. Keela root-kasutaja sisse­logimine otse (lubades ainult tavakasutaja).  
    3. Seadista kahefaktoriline autentimine (2FA), et isegi parooli korral on vaja teist kinnitust (nt SMS-kood).  
    4. Jälgi logifaile (nt igal ööl skriptiga), et tuvastada korduvate ERROR-sisselogimisi ja blokeerida kahtlased IP-aadressid automaatselt.  
  - **Milleks?** Kui ignoreerid ebaõnnestunud sisselogimiskatseid, võib mõni ründaja lõpuks parooli ära arvata ja pääseb serverisse nii, nagu omanik – see võib viia andmete varguseni või süsteemi häkkimiseni.`
    },
    {
      id: 3,
      title: "Faili muutuste jälgimine",
      content: `
  - **Süsteemifailid** on failid, mis juhivad serveri või operatsioonisüsteemi põhifunktsioone. Näiteks Linuxis sisaldab fail **/etc/passwd** kõigi kasutajate kasutajanimesid ja mõningaid peamisi parameetreid (kuigi lõppsaladusi seal ei hoita).  
  - Kui keegi muudab valesti või pahatahtlikult sellist faili (nt /etc/passwd kaustas ilmub uus rida ilma sinu loata), võib see viidata, et keegi püüab kasutajaid juurde lisada või paroolide faili manipuleerida.    
  - **Kuidas jälgida?**  
    1. Kasuta näiteks tööriista **Tripwire** või **AIDE**, mis salvestab süsteemifailide esialgse lähteseisu krüptokäepidemete (hash) kujul.  
    2. Ajastatud skript (nt Cron) kontrollib regulaarselt, kas mingi hash on muutunud. Kui muutus leitakse, saadetakse kohene teavitus.  
    3. Vaata logi fail (nt /var/log/aide.log) üle ja reageeri koheselt, kui ebatavalisi muutusi tuvastad.  
  - **Miks see vajalik on?** Kui keegi muudab /etc/passwd-i ilma, et sa sellest tead, võib ründaja varjata oma sissepääsu või muuta õigusi, et süüdistada kedagi/midagi muud – kiire reageerimine aitab peatada kõrvalised kahjustused.`
    }
  ];

export default function KuberturbeRiskijuht3Leht() {
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
        <button onClick={() => navigate('/kuberturbe_riskijuht3')}>
          Alusta logianalüüsi
        </button>
      </div>
    </div>
  );
}
