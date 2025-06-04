import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_uurija.css';

function KuberturvalisuseUurija() {
  return (
    <div className="job-page">
      <h1>Küberturvalisuse uurija</h1>
      <p>
        Küberturvalisuse uurija ülesanneteks on digitaalsete tõendite kogumine, analüüsimine
        ning tervikliku forensilise ahela dokumenteerimine. Roll hõlmab andmekandjate,
        logifailide ja võrgujälgede süstemaatilist talletamist, et säilitada tõendite
        puutumatus ning tagada nende õiguslik kasutatavus. Uurija koostab üksikasjalikke
        aruandeid, mis sisaldavad tehnilisi järeldusi, ajajooni ja kriitilise tähtsusega
        leidude selgitusi. Töös tehakse koostööd süsteemiadministraatorite, juristide ja
        õiguskaitseorganitega, et koordineerida tõendite konfiskeerimist, tagada kettapiltide
        korrektsus ning toetada võimalikke kohtumenetlusi. Lisaks kavandab uurija korduvaid
        protseduure järelkontrolliks, juhendab meeskonda tõendite käitlemises ja nõustab
        juhtkonda pahavara- või andmeleketega seotud intsidentide lahendamisel.
      </p>

      <h2>Mängud</h2>
      <ul>
        <li><strong>Haavatavuste prioriseerimine</strong></li>
        <li><strong>Pahavara indikaatorite tuvastamine</strong></li>
        <li><strong>Võrguliikluse anomaalia tuvastamine</strong></li>
        <li><strong>Leidlikud paarid</strong></li>
      </ul>

      <Link to="/kuberturvalisuse_uurija1_leht">
        <button>Liigu edasi</button>
      </Link>
    </div>
  );
}

export default KuberturvalisuseUurija;


