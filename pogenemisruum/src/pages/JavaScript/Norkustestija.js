import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Norkustestija.css';

function Norkustestija() {
  return (
    <div className="job-page">
      <h1>Eetilise Häkkeri Missioon</h1>
      <p>
        Astu eetilise häkkeri rolli ja aita avastada süsteemides turvaauke enne, kui kurjategijad seda teevad.
        Läbi nelja etapi õpid, kuidas koguda infot, tuvastada haavatavusi, neid ära kasutada ning koostada detailne raport.
      </p>
      <Link to="/norkustestija1">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default Norkustestija;
