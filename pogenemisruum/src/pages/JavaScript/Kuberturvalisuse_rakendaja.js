import React from 'react';
import '../CSS/Kuberturvalisuse_rakendaja.css';
import { Link } from 'react-router-dom';

function KuberturvalisuseRakendaja() {
  return (
    <div className="job-page">
      <h1>Küberturvalisuse insener</h1>
      <p>
        Küberturvalisuse insener disainib, rakendab ja haldab turvasüsteeme
        ning -infrastruktuuri. Ta vastutab tulemüüride, sissetungi tuvastamise
        süsteemide ja muude turvamehhanismide seadistamise eest.
      </p>
      <Link to="/rakendaja1">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default KuberturvalisuseRakendaja;
