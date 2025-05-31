import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_arhitekt.css';

function KuberturvalisuseArhitekt() {
  return (
    <div className="job-page">
      <h1>Küberturvalisuse arhitekt</h1>
      <p>
        Küberturvalisuse arhitekt disainib ja planeerib organisatsiooni turvalahenduste arhitektuuri.
        Ta valib sobivad tehnoloogiad ja tagab, et kõik süsteemid vastaksid turvastandarditele.
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
