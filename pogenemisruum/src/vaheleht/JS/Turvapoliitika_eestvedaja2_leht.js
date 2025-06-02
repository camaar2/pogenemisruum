import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
{
    id: 1,
    title: "Andmete krüpteerimine",
    content: `
- **Andmete krüpteerimine** kaitseb konfidentsiaalsust, muutes tundlikud andmed loetamatuks volitamata osapooltele.  
- • Krüptovõtmed on nagu salajased võtmed:  
- •   **Ühine (sümmeetriline) krüpto** kasutab sama võtit andmete krüpteerimiseks ja dekrüpteerimiseks (nagu lukuga kast, mille avamiseks ja sulgemiseks on üks ja sama võti).  
- •   **Avalik-privaatne (asümmeetriline) krüpto** kasutab kahte eri võtit – ühte krüpteerimiseks (avalik võti) ja teist dekrüpteerimiseks (privaatne võti) (nagu postkast, kus igaüks saab kirju sinna saata, aga ainult postkastiomanik saab kirju lugeda).  
- • Kui saadad kellelegi salasõna, teisenda see enne teksti lisades krüpteeritud kujule, nii et ka keegi, kes teiselt poolt võrgu­liiklust kuulab, ei suuda teksti mõista ilma õige võtmeta.  
- • Näiteks: kui saadad pangaandmeid, kasutatakse krüpteerimist, et keegi kolmas ei saaks sinu kontonumbrit ja salajast koodi pealt lugeda.  
- • Krüpteerimine aitab ka salvestatud andmeid automaatselt kaitsta – kui kõvaketas varastatakse, ei saa varas andmeid kasutada, kuna tal pole õiget võtit.`  
},
{
    id: 2,
    title: "Töötajate teadlikkuse tõstmine",
    content: `
- **Teadlikkuse tõstmine** hõlmab regulaarselt koolitusi, simulatsioone ja infoturbe juhendamist, et vähendada inimelementidest tulenevaid riske nagu andmepüük või sotsiaalinsenerlus.  
- **Andmepüük (phishing)** tähendab petukaartide saatmist e-kirja või sõnumi teel, mille eesmärk on kedagi petta klõpsama kahtlasel lingil või jagama paroole (näiteks “Kinnitage oma konto, klõpsates siin”).  
- **Sotsiaalinsenerlus** on ründemeetod, kus häkker püüab inimese usaldust äratada (nt valetab, et on IT-tugi), et saada ligipääs salajastele andmetele (näiteks küsib paroole otse).  
- • Kujuta ette, et keegi helistab ja ütleb, et on sinu töökoha IT-inimene ning palub jagada paroole, sest arvuti olevat nakatunud – õige koolitus aitab sul mõista, et tihti ei küsi keegi seda telefonitsi ilma ametliku kirjavahetuseta.  
- **Simulatsioonid** on harjutused, kus saadetakse test-andmepüügikiri (ilma tegeliku rünnakuta) ja vaadatakse, kas keegi klõpsab lingil; see aitab selgitada, kuidas tegelik rünnak võib välja näha.  
- • Regulaarne harjutamine ja juhendamine tugevdab organisatsiooni turvakultuuri ning vähendab inimlike eksimuste tõenäosust – kui töötaja teab, mida jälgida, ei lase ta endale arvutisse pahavara.`  
},
{
    id: 3,
    title: "Ebavajalike tegevuste riskid",
    content: `
- **Serveri jahutussüsteem** ja **kontorimööbel** on vajalikud teenuste ja mugavuse tagamiseks, kuid need ei too turvakompleksile praktilist kasu.  
- • Kui su fookus on turvalisusel, ei aita üldiselt see, kui ostad parema kontorimööbli või kallima jahuti serverile, kui sul puuduvad põhilised, nõuetega seotud meetmed (näiteks tulemüür, turvareeglid, krüpto).  
- **Serveri jahutussüsteem** hoiab ära riistvara ülekuumenemise, aga ei tuvasta ega peata rünnakuid. Kui ründaja pääseb süsteemi ligi, ei aita parem jahutus, et kaitsta tarkvara haavatavusi.  
- **Kontorimööbel** (ergonoomilised toolid, lauad) parandab töötajate mugavust, kuid ei kaitse võrku ega andmeid.  
- Fookus tuleks seada nõuetega seotud meetmetele, nagu:  
-    – **Tulemüüride seadistamine** (lubatud/keelatud liiklus),  
-    – **Viirusetõrje ja IDS/IPS** (reaalajas pahavara tuvastamine),  
-    – **Andmete varundamine ja krüpteerimine** (tagades andmete taastamise ja konfidentsiaalsuse),  
-    – **Regulaarne haavatavuste testimine** (sissetungi- ja logianalüüs).  
- • Kokkuvõttes tasub investeerida pigem turvameetmetesse, mis otseselt kaitsevad süsteemi jõudlust ja takistavad ründeid.`  
}
];

export default function TurvapoliitikaEestvedaja2Leht() {
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
        <button onClick={() => navigate('/turvapoliitika_eestvedaja2')}>
          Alusta vastavusmeetmete valimist
        </button>
      </div>
    </div>
  );
}
