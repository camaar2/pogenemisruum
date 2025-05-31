import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
    {
      id: 1,
      title: "Video õppevorm",
      content: `
  - **Video** on nagu lühike film või saadete osaline lõik, kus näed reaalseid ekraanivaateid ja samme, kuidas turvalahendus töötab.  
    - Kujuta ette, et keegi näitab sulle köögis kokkamist, mitte ei kirjuta retsepti paberile. Näed kõiki vajalikke nuppe ja klõpsamisi.  
  - • Praktilised demosalvestused näitavad samm-sammult, kuidas näiteks turvaprogrammi installida või seadeid muuta, nii et saad lihtsalt järele teha.  
  - • Video aitab säilitada huvi, sest pilt ja heli juhendavad sind selgemini kui pikk tekst.`
    },
    {
      id: 2,
      title: "Interaktiivne test",
      content: `
  - **Interaktiivne test** on nagu viktoriin veebis, kus õpid ja vastad kohe küsimustele, saades kohese tagasiside.  
    - Mõtle, et õpid jalgrattaga sõitma ja keegi küsib sinult iga sammu juures, kas sa tead, miks pidurit vajutada. Kui vastad õigesti, kuuled rõõmsat häält, kui valesti, saad vihje, et proovi uuesti.  
  - • Testid võivad minna läbi praktiliste ülesannete (nt näita, kuidas valida turvaline parool) ja anda koheselt teada, kas tegid õigesti või vajab veel harjutamist.  
  - • Interaktiivne on parem kui pikk loetelu reeglitest, sest harjutades õpid kiiremini ja meenutad paremini.`
    },
    {
      id: 3,
      title: "Lühike juhend (infograafika)",
      content: `
  - **Infograafika** on nagu piltidega rullitud skeem, mis selgitab samm-sammult olulisi asju – see on visuaalne “tähestik”, kus iga pilt räägib loo.  
    - Mõtle, et kokaraamat muutub „õpetuseks piltide“ abil – näed, kuidas pannid paigutada ja mis järjekorras neid kuumutada.  
  - • Näiteks turvalise parooli valimine võib olla kujutatud punktidena:  
    1. Kasuta vähemalt 8 tähte  
    2. Lisa suur- ja väiketähti  
    3. Lisa numbreid ja sümboleid  
  - • Infograafikat on hea järgida ja aitab teavet kiiresti meenutada, kuna inforikkad pildid ja lühitekstid jäävad paremini meelde.`
    },
    {
      id: 4,
      title: "Lühiformaadis samm-sammult juhend",
      content: `
  - **Lühiformaadis juhend** on nagu “telefoninoteeringud” ehk bullet-pointidena kirja pandud sammud, mida saad kohe järgida.  
    - Kujuta ette, et sa ei viitsi lugeda pikka teaduskirja, aga vajad kiiret “mõtle, tee nii, mis järjekorras” lühikokkuvõtet.  
  - Näiteks “Kuidas määrata keerukas parool?” võib olla järgmine:  
    1. Ava enda konto seadete leht  
    2. Klõpsa “Muuda parooli” nuppu  
    3. Kirjuta uus parool (8+ märki, suurtähed, väiketähed, numbrid, sümbolid)  
    4. Kinnita parool ja salvesta muudatus  
  - • Lühike ja konkreetne juhend sobib kiireks õppimiseks igal ajal, kui tekib kahtlus, mida edasi teha.`
    },
    {
      id: 5,
      title: "Pikk tehniline tekst",
      content: `
  - **Pikk tehniline tekst** sobib neile, kes tahavad detailset selgitust, miks ja kuidas turvasüsteem töötab.  
    - See on nagu mitu peatükki põhjalikus raamatus, mis räägib kõike krüpteerimise kohta alates ajaloost kuni kaasaegsete kasutusvõimalusteni.  
  - • Samas võib see arvutipõlvede kauge lugemine tunduda “liiga raske” neile, kes ei ole tehnoloogiaga varem kokku puutunud.  
  - • Sellepärast on mõistlik kombineerida pikk tehniline tekst koos lühikeste juhendite, infograafika ja videoõpetustega – nii leiab iga algaja sobiva taseme.`
    }
  ];

export default function Koolitaja2Leht() {
  const navigate = useNavigate();

  return (
    <div className="tutorial-page">
      {tutorialSections.map(sec => (
        <section key={sec.id} className="tutorial-section">
          <h2>{sec.title}</h2>
          <div className="tutorial-content">
            <ReactMarkdown>{sec.content.trim()}</ReactMarkdown>
          </div>
        </section>
      ))}
      <div className="tutorial-footer">
        <button onClick={() => navigate('/koolitaja2')}>
          Alusta materjalide valimist
        </button>
      </div>
    </div>
  );
}