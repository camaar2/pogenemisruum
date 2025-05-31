import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Miks on serveri algseadistus oluline?",
    content: `
- **Turvaline algseadistus** on nagu pere kodu ehitamine: kui alustad tugevatest alustaladest, on kogu hoone stabiilsem ja turvalisem.  
- • Serveri puhul tähendab see, et esimesena paigaldad ja seadistad vajalikud turvatööriistad (nt tulemüüri, SSH, kasutajakontod), et vältida rünnakuid ja kaitsta andmeid.  
- • Kui ehitad maja, ei jäta sa ust lukku panemata ja kõiki aknaid lahti – samamoodi pead paigaldamisel seadma kohe tugevad paroolid ja piirangud, et keegi ei saaks seda hiljem murda.  
- • Õigete parameetrite valimine (nt mida installida, milliseid teenuseid lubada) aitab vähendada **ründevektoreid** (vektorid on need "avad", mille kaudu ründaja saab siseneda, nt avatud pordid või halvad tarkvaraversioonid).  
- • Kui kasutad tavapäraseid vaikeväärtusi (nt vaikekasutajanimi ja -parool), on see nagu jätaksid maja ukse lahti – ründaja leiab kiiresti, kuidas ligi pääseda.`
  },
  {
    id: 2,
    title: "Miks mitte luua root-kasutajat ilma paroolita?",
    content: `
- **Root-kasutaja** on kõrgeima õigustega konto Linux/Unix süsteemis, mis võib muuta kõiki sätteid ja faile (seda võid ette kujutada kui maja võtut, mis avab igat ust).  
- • Kui lood **root-kasutaja ilma paroolita**, on see nagu maja ukse lahti jätmine: igasugune isik saab selle võtmega siseneda ja teha kõike, mida soovib.  
- • Kujuta ette, et sul on maja, mille peavõti ripub ukse küljes – igaüks võib igal ajal sisse kõndida ja võtta sinu asju. Sama juhtub serveriga, kui rootil pole parooli, saab igaüks kontrollimatult ligi.  
- • Turvariskid: pahatahtlik kasutaja või automatiseeritud skript võib lihtsalt logida sisse ja kahjustada süsteemi, varastada andmeid või paigaldada pahavara.`
  },
  {
    id: 3,
    title: "Administraatorikonto tugeva parooliga",
    content: `
- **Tugev parool** on nagu mitmekihiline lukk, mida on raske murda – mida pikem ja keerulisem, seda turvalisem.  
-  Parool peaks olema:
  1. **Piisavalt pikk** (≥12 märki)  
  2. Sisu: **suured ja väiketähed, numbrid ja erimärgid** (nt “Kass!2025$Tugev”)  
  - • Kui parool on lühike või ainult sõna (“salasõna”), on see nagu lihtne tabalukk, mida saab ühe klahviga avada. Kui aga kasutad keerulisemat kombinatsiooni, on ründajal vaja palju rohkem aega katsete tegemiseks (nt “Kass!2025$Tugev” vs “salasõna”).  
- **Brute-force rünnak** tähendab seda, et pahatahtlik tarkvara proovib järjest erinevaid kombinatsioone, kuni leiab õige. Mida keerulisem parool, seda kauem see protsess aega võtab ja seda suurem on tõenäosus, et ründaja loobub.`
  },
  {
    id: 4,
    title: "SSH võtmetega autentimine",
    content: `
- **SSH-võtmetega autentimine** on turvalisem kui tavaline parool, sest võti koosneb kahest eraldi osast: avalikust võtmeosast (jagad seda serveriga) ja privaatvõtmeosast (pead seda hoidma salajas).  
- • Kujuta ette, et sul on postkast, mille avamiseks on kaks lukku. Avalik võti on nagu uksevõti, mis laseb inimestel postkasti kirja panna (krüpteerida). Privaatvõti on see, mida kasutad postkastist kirjade kätte saamiseks (dekrüpteerimiseks).  
- • Kui kasutad **ainult parooli**, on see nagu üksi lukustusvõti – ründaja võib proovida järjest kuna kopeerida. SSH võtmegeneratsiooniga on aga iga seanss unikaalne ja ründajal on võimatu ära arvata (kui privaatvõti on turvaliselt hoitud).  
- **Kuidas seadistada?**  
  1. Loo kohalikus arvutis SSH võtme paar (nt käsk "ssh-keygen").  
  2. Kopeeri avalik võti serverisse (nt käsuga "ssh-copy-id kasutaja@server").  
  3. SSH kliendis ühenda serveriga (nt "ssh kasutaja@server"), privaatvõti avab krüpteeritud seansi ilma parooli sisestamata.  
  - • Kui keegi proovib serverisse siseneda ilma võtit omamata, ei saa ta ühendust luua isegi siis, kui proovib õigesti kirja pandud kasutajanime, sest privaatvõtit pole.`
  },
  {
    id: 5,
    title: "Miks mitte jätta port 22 avatud ilma piiranguteta?",
    content: `
- • **Port 22** on SSH standardport, mille kaudu ühendud serveriga turvaliselt. Kui lubad selle porti kõigilt IP-aadressidelt (avalikule maailmale), on see nagu jätta maja tagauks lahti – keegi võib proovida sisse murda.  
- • **Brute-force rünnak porti 22** tähendab, et robotid proovivad järjest erinevaid kasutajanimesid ja paroole, et leida, mis töötaks.  
- • Port on nagu maja juurde viiv värav – kui see on lukustamata (avalik), võivad vargad kohe sisse astuda. Kui aga paned lukud ja piirangud, peab kurjategija palju rohkem pingutama.  
- Turvalisuse tõstmiseks:  
  1. **IP-põhised piirangud** &ndash; lubad SSH-ühendusi vaid usaldatud IP-aadressidelt (nt ainult kontori võrgu IP).  
  2. **Kahefaktoriline autentimine** (2FA) &ndash; isegi kui ründaja leiab õiged mandaadid, peab ta esitama teise koodi (nt SMS-iga saadetud kood).  
  3. **Logide monitooring** &ndash; jälgi SSH sisselogimiskatseid. Kui näed palju valesi katseid, võid blokeerida selle IP või saata teavituse.  
  - • Kui port 22 on avatud ilma piiranguteta, on see nagu ukse juures öelda “Tere tulemast, kõiki tuleb lubada sisse!” &ndash; ründajaid ei peata miski.`
  }
]
;

export default function KuberturbeRiskijuht1Leht() {
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
        <button onClick={() => navigate('/kuberturbe_riskijuht1')}>
          Alusta serveri seadistamist
        </button>
      </div>
    </div>
  );
}
