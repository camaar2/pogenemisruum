import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Kuberturbe_riskijuht.css';

function KuberturbeRiskijuht() {
  return (
    <div className="job-page">
      <h1>Küberturbe riskijuht</h1>
      <p>
        Küberturbe riskijuhi roll organisatsioonis on tagada serverite ja infrastruktuuri pidev 
        kaitstus ja toimimine. Tema ülesandeks on tuvastada ja hinnata küberriske, rakendada ennetavaid 
        meetmeid ning juhtida kiiret ja täpset reageerimist avastatud turvaintsidentidele. Küberturbe riskijuht 
        jälgib serverite ja süsteemide konfiguratsiooni, haldab ja automatiseerib turvauuendusi ning viib läbi 
        regulaarset süsteemide monitooringut ja logide analüüsi, et tuvastada võimalikke turvaintsidente ja ründeid varakult. 
        Lisaks korraldab ta operatiivset reageerimist ja koostab täpsed juhised ja protseduurid intsidentide lahendamiseks, et 
        minimeerida võimalikku kahju ning tagada süsteemide kiire taastumine ja jätkusuutlik turvalisus.
      </p>

      <h2>Mängud:</h2>
      <ul>
        <li><strong>Serveri algseadistus</strong></li>
        <li><strong>Turvauuenduste ja automaatika seadistamine</strong></li>
        <li><strong>Süsteemide monitooring ja logide analüüs</strong></li>
        <li><strong>Operatiivne reageerimine</strong></li>
      </ul>

      <Link to="/kuberturbe_riskijuht1_leht">
        <button>Liigu edasi</button>
      </Link>
    </div>
  );
}

export default KuberturbeRiskijuht;
