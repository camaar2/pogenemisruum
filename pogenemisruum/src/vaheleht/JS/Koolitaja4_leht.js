import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
    {
      id: 1,
      title: "Mis on õngituskirja indikaatorid?",
      content: `
  - **Õngituskirja indikaatorid** on nähtused ja elemendid, mis viitavad pettusele.  
  - Kujuta ette, et saad meili, mis tundub olevat sõnum pangast, aga detailid on valed – need on indikaatorid.  
  - Näited indikaatoritest:  
    1. **Kahtlased lingid** – lingid, mis näevad välja imelikud või millel on tundmatu lõpp (nt \`verify-you.zz\`).  
    2. **Ebatavalised faililaiendid** – manusfail, mille laiend polr tavapärane (nt \`.exe\` või \`.scr\` asemel tavapärase \`.pdf\` või \`.jpg\`).  
    3. **Ähvardav või kiirustav toon** – kiri ütleb midagi stiilis “Tegutse kohe või kaotad juurdepääsu!”, mis on signaal, et tegemist võib olla petukirjaga.  
    4. **Kirja grammatika- või õigekirjavead** – kui kiri on täis kirjavigu või on fraasid loogiliselt ebatäpsed, on see sageli masina kätetöö.  
    5. **Imelik teema või ootamatu sisu** – saad kirja, mida ei oska oodata (nt “Uus faktuur” pangast, kuigi sa pole pangatehingut teinud).  
  - Kui märkad ühtegi neist, analüüsi täpsemalt ja kontrolli saatjat või küsi abi IT-osakonnalt, enne kui klikid või faili avad.`
    },
    {
      id: 2,
      title: "Kahtlased lingid ja domeenid",
      content: `
  - **Kahtlased lingid** võivad viia veebilehtedele, mis näevad välja ehtsad, aga on tegelikult petu-leheküljed.  
  - Kui keegi saadab sulle meili, mille pealkiri on “PayPal-login.com” asemel “PayPal-log1n.com”, pole see päris PayPal.  
  - Mida teha:  
    1. **Liiguta kursor lingi kohale** ilma klõpsamata – brauseri ekraani allosas või kursoril tippides näed tegelikku adressaari (URL), kuhu klikk viib.  
    2. **Kontrolli domeeni silti** – veendu, et domeenisülestus (osa pärast “@” või alguses “https://”) vastab sinu ootusele (nt “@officialbank.com” ei tohiks olla “@off1cialbank.com”).  
    3. **Ära klõpsa lühendatud või peidetud linke** (nt bit.ly/xxx või tinyurl.com/xxx) ilma esmalt lingi ettevaatlikult uurimata.  
  - **Valed domeenid**, mis varjavad tegelikku sihtlehte, kasutavad tihti ühte või kahte tähevahetust (nt “amaz0n.com”, “amazon.com” asemel) või lühendavad nime (nt “secure-paypal.net” asemele “paypal.com”).  
  - See on nagu pettur, kes paneb oma poe uksele sama nime nagu on ühel kuulsal poel, et kliente petta. Kontrolli, kas aadress ja URL täpselt klapivad, ja kui kahtled, kirjuta ise korrektne aadress käsitsi brauseri reale.`
    },
    {
      id: 3,
      title: "Turvalised elemendid",
      content: `
  **Turvaliste kirjade tunnused** aitavad sul märgata ehtsat sõnumit:  
  1. **Õiged domeenid (nt @officialbank.com)**  
     - Saatja e-posti lõpus olev osa peab täpselt vastama ettevõtte nimele.  
     - Kui pangal on ametlik koduleht “www.sinu-pank.ee”, peab panga kiri tulema aadressilt “@sinu-pank.ee”, mitte midagi sarnast.  
  2. **Tavapärased manusfailid (PDF, pilt)**  
     - Dokumentide formaadid nagu **.pdf**, **.jpg**, **.png** või **.docx** on tavalised ja ohutud.  
     - See on samasugune fail nagu PDF-kasutusjuhend või pilt tööülesannete kirjeldusest – mitte programm (.exe), mis võib arvutisse pahavara paigaldada.  
  3. **Isiklik, kontekstipõhine sõnum (“Tere, John!”)**  
     - Kirja tervitus peab sisaldama sinu nime või viidet sinu olukorrale (nt “Tere, John! Palun kinnita oma tellimuse number 12345”), mitte üldist “Lugupeetud klient”.  
     - Kui kiri pöördub sinu poole nimepidi ja viitab sellele, mida sa tegid (nt makses), näitab see, et kiri võib olla päris.  
  4. **Lühike ja täpne sisu**  
     - Ettevõtted saadavad selgeid ja täpseid teateid, mis ei ürita sind hirmutada (nt “Parooli aegub, vaheta see meie turvalises keskkonnas”).  
     - Ehtne kiri ütleb lihtsalt “Vaheta parool” ning annab viite, kus seda teha, aga ei ähvarda kohe.  
  - Kui kiri vastab kõigile üles loetletud punktidele (õige domeen, turvaline manus, personaalsem tervitus ja loogiline sisu), on tõenäoline, et see on ohutu. Kui oled kahtled, ava brauser ja mine ettevõtte kodulehele käsitsi, mitte e-kirjas olevale lingile klõpsates.`
    }
  ]
  ;

export default function Koolitaja4Leht() {
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
        <button onClick={() => navigate('/koolitaja4')}>
          Alusta indikaatorite hindamist
        </button>
      </div>
    </div>
  );
}
