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
        <li><strong>Digifortressi ehitamine: süsteemide riskide kaardistamine</strong> – umbes 5 minutit</li>
        <li><strong>Turvastandardite ja protseduuride seadmine</strong> – umbes 5-7 minutit</li>
        <li><strong>Võrgu segmenteerimine ja õigesse tsooni paigutamine</strong> – umbes 6-7 minutit</li>
        <li><strong>Krüptopoliitikate ja stsenaariumite sobitamine</strong> – umbes 6-8 minutit</li>
      </ul>

      <Link to="/arhitekt1_leht">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default KuberturvalisuseArhitekt;
