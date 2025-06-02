import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_koolitaja.css';

function KuberturvalisuseKoolitaja() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/koolitaja1_leht');
  };

  return (
    <div className="job-page">
      <h1>Küberturvalisuse koolitaja</h1>
      <p>
        Küberturvalisuse koolitaja vastutab organisatsiooni töötajate 
        teadlikkuse ja valmiduse tõstmise eest küberturvalisuse valdkonnas. 
        Tema peamine ülesanne on tagada, et kõik töötajad mõistaksid küberohte ning 
        oskaksid neid õigeaegselt ära tunda ja ennetada. Küberturvalisuse koolitaja 
        loob ja viib läbi sihtrühmale kohandatud koolitusi, koostab ja täiendab pidevalt 
        õppematerjale ning korraldab simulatsioone, et praktiliselt testida töötajate teadmisi ja 
        reaktsioone küberintsidentide puhul. Samuti on tema ülesandeks analüüsida koolituste 
        tulemusi ning täiustada meetodeid vastavalt saadud tagasisidele, et kindlustada organisatsiooni 
        sisuline valmisolek ja tugev vastupanuvõime küberrünnakutele.
      </p>

      <h2>Mängude ülevaade</h2>
      <p>Siin saad selles rollis lahendada järgmisi mänge:</p>
      <ul>
        <li><strong>Teadmiste hindamine</strong> </li>
        <li><strong>Koolitusmaterjalide loomine</strong> </li>
        <li><strong>Simulatsioon: õngitsuskirjade testimine</strong></li>
        <li><strong>Phishing-indikaatorite tuvastamine</strong> </li>
      </ul>

      <button onClick={startGame}>Liigu edasi</button>
    </div>
  );
}

export default KuberturvalisuseKoolitaja;
