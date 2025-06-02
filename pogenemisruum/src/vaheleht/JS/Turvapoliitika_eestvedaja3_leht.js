import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
    {
      id: 1,
      title: "Auditiks vajaliku dokumentatsiooni kogumine",
      content: `
  - **Turvapoliitika dokumentatsioon** sisaldab kõiki reegleid, protseduure ja vastutusi, mis tagavad organisatsiooni turvalisuse.  
  - • Turvapoliitika on nagu “kodu­raamat”, mis ütleb, kuidas kõik peavad käituma, et keegi ei saaks arvutisüsteemi rikkuda (nt kes vastutab paroolide vahetamise eest, kes lubab uue tarkvara paigaldada).  
  - • See on oluline auditi jaoks, sest auditi käigus kontrollitakse, kas kõik töötajad ja süsteemid järgivad neid reegleid.  
  - • Kui organisatsioonil pole selget turvapoliitikadokumentatsiooni, ei saa auditi läbiviija täpselt öelda, mida peab kontrollima või kuidas tulemusi tõlgendada.`
    },
    {
      id: 2,
      title: "Juurdepääsukontrollide logid",
      content: `
  - **Ligipääsukontrollide logid** dokumenteerivad, kes ja millal süsteemidesse sisse logis (nt kasutajanimi, kuupäev, kellaaeg).  
  - • Ligipääsukontrolli logid on nagu uksekaartide registriraamat, kus on kirjas, kes kasutas võtit ruumil, kui ta sinna sisenes või lahkus.  
  - • Auditi jaoks aitab see logi tuvastada, kas keegi on püüdnud ebaseaduslikult sisse logida või kas keegi on kasutanud teise inimese kontot.  
  - • Näiteks kui töötaja ütleb, et ta ei loginud süsteemi kell 10, aga logi näitab, et tema konto kasutas süsteemi, tekib küsimus, kes tegelikult sisenes.  
  - • Auditi käigus vaadatakse neid logisid, et veenduda, kas ligipääs on korrektselt lubatud ja et kahtlased sündmused on dokumenteeritud.`
    },
    {
      id: 3,
      title: "Mittekriitilise info vältimine",
      content: `
  - **Töötajate isiklikud e-kirjad** ja **kohvikumenüü** ei ole auditiks asjakohased ning võivad olla segajaid.  
  - • Kui sa teed suurest hulgast dokumentidest kontrolli, siis otsid vaid neid, mis on olulised (turvapoliitika, logid, juhised).  
  - • “Töötajate isiklikud e-kirjad” sisaldavad näiteks sünnipäevaõnnitlusi või isiklikku suhtlust – see ei aita auditil hinnata, kas süsteeme on turvatud.  
  - • “Kohvikumenüü” on dokument, kus on kirjas, mis kohvisid kontoris pakutakse – see pole seotud turvalisusega ja rikub ülevaadet, mis on auditil vajalik.  
  - • Auditi edukaks läbiviimiseks tuleb eemaldada kõik ebaoluline info, et keskenduda ainult dokumentidele, mis näitavad, kas organisatsioon järgib turvalisuse nõudeid.`
    }
  ];

export default function TurvapoliitikaEestvedaja3Leht() {
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
        <button onClick={() => navigate('/turvapoliitika_eestvedaja3')}>
          Alusta auditi ettevalmistust
        </button>
      </div>
    </div>
  );
}
