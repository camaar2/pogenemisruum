import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_arhitekt.css';

function KuberturvalisuseArhitekt() {
  return (
    <div className="job-page">
      <h1>Küberturvalisuse arhitekt</h1>
      <p>
        Küberturvalisuse arhitekt disainib ja planeerib organisatsiooni turvalahenduste terviklikku arhitektuuri. Ta valib sobivad tehnoloogiad ning tagab, et kõik süsteemid vastaksid turvastandarditele.
      </p>
      <Link to="/arhitekt1">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default KuberturvalisuseArhitekt;
