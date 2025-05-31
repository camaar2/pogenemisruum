import React from "react";
import "../CSS/Meist.css";

export default function Meist() {
  return (
    <div className="meist-container">
      <h1 className="meist-title">Meist</h1>

      <section className="meist-section">
        <h2>Meie missioon</h2>
        <p>
          Soovime muuta küberturvalisuse õppimise kättesaadavaks ja lõbusaks kõigile
          – alates gümnaasiumiõpilastest kuni karjääripöörajateni. Lõime mängustatud
          platvormi, mis tutvustab enimlevinud turvariske ning 12 küberturbe ametit
          realistlike minimängude kaudu.
        </p>
      </section>

      <section className="meist-section">
        <h2>Edasine visioon</h2>
        <p>
          Töötame täisversiooni kallal, mis sisaldab kasutajakontosid, tulemuste
          salvestamist ja kohanduvat raskusastet. Samuti lisame meeskonnamängu
          stsenaariume ning õpetajatele mõeldud juhendmaterjalid, et tuua
          küberturvalisuse haridus veelgi lähemale koolidele ja ettevõtetele.
        </p>
      </section>
    </div>
  );
}
