import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on digitaalse tõendite ahel (Evidence Chain)?",
    content: `
- **Digitaalse tõendite ahel** on samm-sammuline protsess, mis tagab, et uurimiseks kogutud andmed ja failid jäävad muutumatuks ja usaldusväärseks.  
- • Lihtsustatult: kõik sammud peavad olema kirjas, et keegi ei saaks hiljem väita, et andmeid on muudetud.  
- • See aitab kohtus näidata, et tõendid (nt pahavara fail või logikiri) on kõik samad, mis saadi uurimisel.  
- Põhisammud on:  
- • **Süsteemide ja seadmete staatuse kindlustamine (puutumatus)** – veenduda, et uuritav arvuti või mäluseade ei muutu enne uurimist.  
- • **Operatsioonide detailselt dokumenteerimine** – kirjutada üles iga tegevus, kes, millal ja kuidas seadmega tegeles.  
- • **Järgnevate sammude järjekorra järgimine** – kõik toimingud (näiteks failikloonimine, analüüs) tehakse õiges järjestuses ja sellest tehakse kirjalik aruanne.`
  },
  {
    id: 2,
    title: "Tõendite konfiskeerimine",
    content: `
- • Esimene samm on sekkuda nii, et tõendid ei muutu ja keegi teine ei pääse neile ligi.  
- • **Lahutage seade võrgust** või **lülitage see välja turvalisel viisil** – see tähendab, et kui uuritav arvuti on interneti või sisemise võrgu küljes, katkestame selle ühenduse, et keegi ei saaks kaugelt faile muuta.  
- • **Tagage ligipääsupiirang** – veenduge, et ainult sertifitseeritud uurija saab seadet katsuda. Näiteks luku või turvahoone abil kontrollitakse, et ükski kõrvaline isik ei saa seadet avada.  
- • **Dokumenteerige** konfiskeerimise aeg, koht ja osapooled – kirjutage üles, kes ja millal seadet kinni pidas ja kuhu see viidi, et hiljem saaks teada täpselt, kuidas tõenditega käideldi.`
  },
  {
    id: 3,
    title: "Järelduse ahela vormi täitmine",
    content: `
- **Järelduse ahela vorm** on paber või elektrooniline dokument, kuhu kirjutatakse iga konfiskeerimistoiming reastatult.  
- **Seadme kirjeldus** (tüüp, seerianumber) – kirjelda täpselt, mis seadmega on tegu (näiteks "HP sülearvuti, ser. nr ABC123").  
- **Kes, kus ja millal toiming toimus** – pane kirja uurija nimi, koht (toimiku nimi või ruum) ja aeg (kuupäev ja kellaaeg).  
- **Allkirjad ja tunnistajad** – iga, kes on toimingus osalenud, peab sellel paberil allkirja andma või kinnitama, et ta nägi, kuidas toiming toimus.`
  },
  {
    id: 4,
    title: "Digitaalse salvestusseadme arestimine",
    content: `
- **Digitaalse salvestusseadme arestimine** tähendab, et uurimiseks võetud kõvakettad, USB-mälupulgad või muud mäluseadmed pannakse turvalisse hoiukohta.  
- **Märgised ja kinnitusmehhanismid** – seadmele kleebitakse spetsiaalne kleebis või etikett, mis näitab, et seda ei tohi muul viisil avada; vajadusel lukustatakse see spetsiaalsesse karpi.  
- **Pakendamine ja keti hoidmine** – seade suletakse spetsiaalsesse mahutisse ja igast liigutusest kirjutatakse üles, kes selle lahti võttis ja kuhu viis. Nii näeme, et keegi ei saanud vahepeal seadet muuta.  
- • Kui võtad uurimiseks kõvaketta, siis paned selle alati kindlasse kaitstud kotikesse ja kirjutad üles iga liigutuse, et keegi ei saaks hiljem öelda “mina puutusin seda esimest korda, mitte sina”.`
  },
  {
    id: 5,
    title: "Forenseerilise kujutise loomine",
    content: `
- **Forenseeriline kujutis** on täpne bititasandiline koopia (kloon) uuritavast salvestusseadmest (näiteks kõvakettast).  
- **Miks bititasandiline?** – see tähendab, et kopeeritakse iga bitt ja bait täpselt samas järjekorras, nii et kogu info (ka kustutatud failid) salvestatakse.  
- **Kujuta seadmest täpne koopia, mitte originaali** – originaalseadet ei tohi muuta, selle asemel tehakse selle täpne kloon ning analüüsitakse klooni.  
- **Kasuta write-blocker’it, et vältida muutusi** – write-blocker on seade, mis lubab andmete lugemist, aga keelab kirjutamise, nii et kloonimise ajal originaalile ei kirjutata mingeid andmeid.  
- **Kontrollsumma (hash)** – loodud kloonile arvutatakse krüptograafiline kood (hash), mis näitab, et kloon ja originaal on identsed. Kui hiljem hash ei vasta, teame, et kloon on muutunud.`
  },
  {
    id: 6,
    title: "Analüüs laboris",
    content: `
- **Analüüs laboris** tähendab kloonitud salvestusseadme (kõvaketta) uurimist spetsiaalses keskkonnas, mitte originaalis.  
- **Failisüsteemi läbivaatamine** – vaadatakse ketta kaustastruktuure, et leida salvestatud faile, kaustasid ja varjatud sisusid (näiteks peidetud failid).  
- **Logide analüüs** – uuritakse süsteemi logisid, kus on salvestatud tegevused (nt millal ja kuidas faile kasutati), et aru saada, mis juhtus.  
- **Vigade, pahavara või pettuste tuvastamine** – otsitakse märke, mis viitavad pahavarale (nt varjatud programmiliinid) või seotud pettustega (nt makseandmete vargus).  
- **Dokumenteeritud tulemused ja järeldused** – kogu leitud info kajastatakse forensilises raportis, mis sisaldab selgitust, kuidas andmed avastati ja mida need näitavad.  
- • Labor on koht, kus spetsialist analüüsib kloonitud kõvaketast ja kirjeldab kirjalikult, mida avastas, et kohtunik või teine uurija saaks hiljem aru, kuidas järeldusele jõuti.`
  }
];

export default function DigiToenditeUurija1Leht() {
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
        <button onClick={() => navigate('/digi_toendite_uurija1')}>
          Alusta ahela järjestamist
        </button>
      </div>
    </div>
  );
}
