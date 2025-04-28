import React from 'react';
import '../CSS/Turvapoliitika_eestvedaja.css';
import { useNavigate } from 'react-router-dom';

function TurvapoliitikaEestvedaja() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/turvapoliitika_eestvedaja1');
  };

  return (
    <div className="job-page">
      <h1>Turvapoliitika eestvedaja</h1>
      <p>
        Turvapoliitika eestvedaja loob ja uuendab organisatsiooni turvapoliitikat,
        et vastata kaasaegsetele ohtudele ja nõuetele. Ta vastutab töötajate
        teavitamise, juhendamise ning turvareeglite jõustamise eest.
      </p>
      <button onClick={startGame}>Alusta mängu</button>
    </div>
  );
}

export default TurvapoliitikaEestvedaja;
