import React from 'react';
import './MiddleGrid.css';
import FlipCard from './FlipCard';

function MiddleGrid() {
  return (
    <div className="grid-container">
      {/* Top row */}
      <div className="cell1">
        <FlipCard frontImg="1.svg" backText="Küberturbe Ohuanalüütik" navigateTo="/kuberturbe_ohuanaluutik" />
      </div>
      <div className="cell2">
        <FlipCard frontImg="9.svg" backText="Küberturbe Audiitor" navigateTo="/kuberturbe_audiitor" />
      </div>
      <div className="cell3">
        <FlipCard frontImg="3.svg" backText="Nõrkustestija" navigateTo="/norkustestija" />
      </div>
      <div className="cell4">
        <FlipCard frontImg="10.svg" backText="Digitaalsete Tõendite Uurija" navigateTo="/digitaalsete_toendite_uurija" />
      </div>

      {/* Second row */}
      <div className="cell5">
        <FlipCard frontImg="7.svg" backText="Küberturvalisuse Rakendaja" navigateTo="/kuberturvalisuse_rakendaja" />
      </div>
      <div className="center">
        <img src="16.svg" alt="16" />
      </div>
      <div className="cell8">
        <FlipCard frontImg="6.svg" backText="Infoturbe Juht (CISO)" navigateTo="/infoturbe_juht" />
      </div>

      {/* Third row */}
      <div className="cell9">
        <FlipCard frontImg="5.svg" backText="Turvapoliitika Eestvedaja" navigateTo="/turvapoliitika_eestvedaja" />
      </div>
      <div className="cell12">
        <FlipCard frontImg="8.svg" backText="Küberturvalisuse Rakendaja" navigateTo="/kuberturvalisuse_rakendaja" />
      </div>

      {/* Bottom row */}
      <div className="cell13">
        <FlipCard frontImg="11.svg" backText="Kübersündmuste Reageerija" navigateTo="/kubersundmuste_reageerija" />
      </div>
      <div className="cell14">
        <FlipCard frontImg="2.svg" backText="Küberturvalisuse Arhitekt" navigateTo="/kuberturvalisuse_arhitekt" />
      </div>
      <div className="cell15">
        <FlipCard frontImg="12.svg" backText="Küberturvalisuse Koolitaja" navigateTo="/kuberturvalisuse_koolitaja" />
      </div>
      <div className="cell16">
        <FlipCard frontImg="4.svg" backText="Küberturbe Riskijuht" navigateTo="/kuberturbe_riskijuht" />
      </div>
    </div>
  );
}

export default MiddleGrid;
