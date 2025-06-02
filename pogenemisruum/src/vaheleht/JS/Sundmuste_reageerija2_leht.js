import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = 
    [
{
        id: 1,
        title: "Operatsiooniline vs strateegiline info",
        content: `
- **Operatsiooniline info** käsitleb igapäevaseid tegevusi ja protseduure, mis on vajalikud süsteemide haldamiseks.  
- • Mõtle, et operatsiooniline info on nagu köögis retsept – see ütleb täpselt, mida iga päev süüa valmistades teha tuleb (nt kuidas registreerida uus kasutajakonto või kuidas kontrollida, et server töötab).  
- **Strateegiline info** seab pikaajalised eesmärgid, prioriteedid ja suunised, mis toetavad otsuste tegemist kõrgemal tasemel.  
- • Strateegiline info on nagu pere pikaajaline toitumiskava – see ütleb, milliseid toite poest osta ja planeerida, et pere tervis püsiks hea aastate kaupa.`
},
{
        id: 2,
        title: "Taktikaline info",
        content: `
- **Taktikaline info** keskendub lühiajalistele tegevustele intsidendi lahendamisel, tagades kiire reageerimise ja spetsiifilised juhised meeskondadele.  
- • Taktikaline info on nagu hädaolukorras evakuatsioonijuhend – see ütleb täpselt, mida praegu tegema peab (nt kuidas peatada rünnak keskkonnas, milliseid faile esmajärjekorras uurida ja kellele raport saata).  
- • Taktikaline info aitab meeskonnal otsustada, milliseid tööriistu kasutada ja milliseid samme esimesena astuda, et peatada intsident võimalikult kiiresti.`
},
{
        id: 3,
        title: "Juhtimisinfo roll",
        content: `
- **Juhtimisinfo** annab ülevaate protsessidest ja otsuste tegemise raamistikust, mitte spetsiifiliselt intsidendi detailidest.  
- • Juhtimisinfo on nagu juhataja konspekt koos kokkuvõtlike andmetega – see näitab, millised peamised sammud auditeerimisel või turvalisuse planeerimisel tulevad, aga ei sisalda iga väikese vea või häire üksikasju.  
- • Juhtimisinfo aitab juhtidel ja otsustajatel mõista, kuidas kogu turvaprotsess töötab, millised on riskid ja millised ressursid on vaja eraldada, et tagada organisatsiooni pikaajaline turvalisus.`
}
];

export default function SundmusteReageerija2Leht() {
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
        <button onClick={() => navigate('/sundmuste_reageerija2')}>
          Alusta kommunikatsiooni harjutust
        </button>
      </div>
    </div>
  );
}
