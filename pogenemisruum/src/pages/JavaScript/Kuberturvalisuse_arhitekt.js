import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_arhitekt.css';

function KuberturvalisuseArhitekt() {
  return (
    <div className="job-page">
      <h1>Küberturvalisuse arhitekt</h1>
      <p>
        Küberturvalisuse arhitekt on ekspert, kes vastutab organisatsiooni turvalahenduste tervikliku 
        arhitektuuri loomise, planeerimise ja täiustamise eest. Ta hindab olemasolevaid süsteeme ja infrastruktuuri, 
        tuvastab turvanõrkused ja riskid ning kavandab ja rakendab sobivad turvameetmed. Küberturvalisuse arhitekt valib ja 
        integreerib parimad tehnoloogilised lahendused, koostab ja kinnitab turvastandardeid ning protseduure, et kindlustada 
        organisatsiooni digitaalsete varade kaitse. Ta teeb koostööd nii IT-meeskondade kui ka äriüksustega, et tagada kõigi 
        tehnoloogiliste uuenduste vastavus organisatsiooni küberturvalisuse strateegiatele ning regulatsioonidele. Lisaks on tema 
        ülesanne korraldada regulaarseid turvauuenduste ja testide läbiviimist, et ennetada võimalikke ründeid ning pidevalt 
        täiustada süsteemide vastupidavust.
      </p>

      <h2>Mängude ülevaade</h2>
      <p>Siin saad selles rollis lahendada järgmisi mänge:</p>
      <ul>
        <li><strong>Digifortressi ehitamine: süsteemide riskide kaardistamine</strong></li>
        <li><strong>Turvastandardite ja protseduuride seadmine</strong></li>
        <li><strong>Võrgu segmenteerimine ja õigesse tsooni paigutamine</strong></li>
        <li><strong>Krüptopoliitikate ja stsenaariumite sobitamine</strong></li>
      </ul>

      <Link to="/arhitekt1_leht">
        <button>Liigu edasi</button>
      </Link>
    </div>
  );
}

export default KuberturvalisuseArhitekt;
