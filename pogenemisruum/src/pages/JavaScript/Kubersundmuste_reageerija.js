import React from 'react';
import '../CSS/Kubersundmuste_reageerija.css';
import { Link } from 'react-router-dom';

function Kubersundmuste_reageerija() {
  return (
    <div className="job-page">
      <h1>Kübersündmiste reageerija</h1>
      <p>
        Küberintsidentide haldur juhib turvaintsidentide tuvastamist,
        analüüsi ja lahendamist. Ta koordineerib meeskonna tegevusi
        intsidentide eskaleerimisel ning teavitab asjassepuutuvaid osapooli.
      </p>
      <Link to="/sundmuste_regeerija1">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}
export default Kubersundmuste_reageerija;
