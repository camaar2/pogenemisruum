import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on ‘Leidlikud paarid’ mäng?",
    content: `
- **Leidlikud paarid** on mäng, kus vasakul on loetelu kahtlusest tulenevatest sündmustest (“Sündmused”) ja paremal on nende võimalikud selgitused (“Selgitused”).  
- • Iga kord tuleb valida vasakul üks sündmus ja klõpsata sellele sobival selgitusel paremal.  
- • Kui valitud selgitus sobib põhjusega, miks see sündmus on kahtlane, tekib paar – vastasel juhul saad hoiatuse ja saad proovida uuesti.  
    `
  },
  {
    id: 2,
    title: "Miks see mäng on kasulik?",
    content: `
- • Mäng aitab mõelda, **miks iga sündmus võib olla turvarisk**.  
- • Selle asemel, et pähe õppida konkreetseid vastuseid, õpib igaüks **loogikat**:  
  - • Miks suured andmeedastused võivad tähendada andmeeksfiltreerimist?  
  - • Mida tähendab, kui ühendus on saadetud ebatavalisele komandoserverile?  
  - • Millal tavaline toiming (nt DNS-päring tuntud domeenile) on ohutu?  
- • Niimoodi tekib oskus ühtki uut või varem nägemata sündmust hinnata, kasutades samu põhimõtteid.  
    `
  },
  {
    id: 3,
    title: "Kuidas mõelda, et leida õige paar?",
    content: `
- • Loe esmalt **sündmuse kirjelduse** ja mõtle, mis selles võib olla kahtlane:  
  - • Kas tundub, et mingi port või aadress pole tavaline?  
  - • Kas liiklusmahud on väga suured ja sihtkoht tundmatu?  
  - • Kas aeg (nt öine sisselogimine) ei sobi tavapäraste ajadega?  
- • Seejärel vaata, milline **selgitus** kirjeldab kogu olukorda – miks see konkreetselt võib olla pahatahtlik.  
- • Kui ei ole kindel, kas sobib, mõtle järgmise eksemplari abil:  
  - • Kui andmed saadetakse kuhugi suures mahus tundmatule serverile, siis see selgitus peaks rääkima “andmeeksfiltreerimisest”.  
  - • Kui ühendus käib kahtlase pordi või DNS-i kaudu, siis sobiv selgitus peaks väljendama “juhtkanali loomist”.  
  - • Kui aga on tavapärane protsess nagu turvaline TLS-ühendus tuntud domeeniga, siis õige selgitus ütleb, et see on “normaalne arendaja tegevus”.  
- • Kui klikid vale selgituse peal, saad hoiatuse, aga saad kohe proovida uuesti.  
    `
  },
  {
    id: 4,
    title: "Näpunäited algajale",
    content: `
- • Ära püüdle konkreetsete näidete päheõppimise poole. Proovi **õppida mustrit**:  
  - • Milline sõnastus viitab “Command-&-Control kanalile”?  
  - • Kuidas äratundmiseks otsida “andmevarguse” või “sisselogimiskatsete” vihjeid?  
- • Teksti lugedes vaata peamisi märksõnu:  
  - • “tundmatu IP” või “port” viitab ohtlikule ühendusele.  
  - • “Base64” või “kodeeritud skript” viitab pahavara käivitumisele.  
  - • “tuntud domeen” või “tavaline ajavahetus” viitab ohutule tegevusele.  
- • Kui mõni paar ei sobi, ära jää pikalt arutlema – kliki vale selgituse peal ja proovi uuesti, kuni saad järgi, miks just see selgitus tundub vale.  
    `
  },
  {
    id: 5,
    title: "Mängu lõpp ja hindamine",
    content: `
- • Kui oled kõik sündmused õigesti selgitustega kokku sidunud, klõpsa nupul “Esita valikud”.  
- • Kui kõik paarid on õiged, kuvab süsteem teadet “Kõik paarid õigesti!” ning avaneb nupp “Valmis!”.  
  - • Selle nupu abil saad lõpetada mängu ja liikuda tagasi avalehele või järgmiseks ülesandeks.  
- • Kui mõni paar on veel vale või puudu, kuvatakse hoiatav tekst “Mõni paar on veel valesti või paigutamata.” ja saad proovida uuesti.  
- • Pärast kõigi paaride õigeks äratundmist mõtesta ise lühidalt, **miks iga valik õige oli** – see tugevdab arusaamist ja aitab uusi juhtumeid tulevikus paremini hinnata.  
    `
  }
];

export default function KuberturvalisuseUurija4Leht() {
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
        <button onClick={() => navigate('/kuberturvalisuse_uurija4')}>
          Alusta mängu
        </button>
      </div>
    </div>
  );
}

