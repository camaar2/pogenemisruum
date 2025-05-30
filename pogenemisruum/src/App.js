import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './fonts.css';
import Header from './components/Header'; 
import Avaleht from './pages/JavaScript/Avaleht';
import KKK from './pages/JavaScript/KKK';
import Meist from './pages/JavaScript/Meist';
import Kontakt from './pages/JavaScript/Kontakt';

import InfoturbeJuht from './pages/JavaScript/Infoturbe_juht';
import KubersundmusteReageerija from './pages/JavaScript/Kubersundmuste_reageerija';
import TurvapoliitikaEestvedaja from './pages/JavaScript/Turvapoliitika_eestvedaja';
import KuberturbeOhuanaluutik from './pages/JavaScript/Kuberturbe_ohuanaluutik';
import KuberturvalisuseArhitekt from './pages/JavaScript/Kuberturvalisuse_arhitekt';
import KuberturbeAudiitor from './pages/JavaScript/Kuberturbe_audiitor';
import KuberturvalisuseKoolitaja from './pages/JavaScript/Kuberturvalisuse_koolitaja';
import KuberturvalisuseRakendaja from './pages/JavaScript/Kuberturvalisuse_rakendaja';
import KuberturvalisuseUurija from './pages/JavaScript/Kuberturvalisuse_uurija';
import Norkustestija from './pages/JavaScript/Norkustestija';
import DigitaalseteToenditeUurija from './pages/JavaScript/Digitaalsete_toendite_uurija';
import KuberturbeRiskijuht from './pages/JavaScript/Kuberturbe_riskijuht';

import Kuberturbe_ohuanaluutik1_leht from './vaheleht/JS/Kuberturbe_ohuanaluutik1_leht';
import Kuberturbe_ohuanaluutik2_leht from './vaheleht/JS/Kuberturbe_ohuanaluutik2_leht';
import Kuberturbe_ohuanaluutik3_leht from './vaheleht/JS/Kuberturbe_ohuanaluutik3_leht';
import Kuberturbe_ohuanaluutik4_leht from './vaheleht/JS/Kuberturbe_ohuanaluutik4_leht';
import Arhitekt1_leht from './vaheleht/JS/Arhitekt1_leht';
import Arhitekt2_leht from './vaheleht/JS/Arhitekt2_leht';
import Arhitekt3_leht from './vaheleht/JS/Arhitekt3_leht';
import Arhitekt4_leht from './vaheleht/JS/Arhitekt4_leht';
import Audiitor1_leht from './vaheleht/JS/Audiitor1_leht';
import Audiitor2_leht from './vaheleht/JS/Audiitor2_leht';
import Audiitor3_leht from './vaheleht/JS/Audiitor3_leht';
import Audiitor4_leht from './vaheleht/JS/Audiitor4_leht';
import Digi_toendite_uurija1_leht from './vaheleht/JS/Digi_toendite_uurija1_leht';
import Digi_toendite_uurija2_leht from './vaheleht/JS/Digi_toendite_uurija2_leht';
import Digi_toendite_uurija3_leht from './vaheleht/JS/Digi_toendite_uurija3_leht';
import Digi_toendite_uurija4_leht from './vaheleht/JS/Digi_toendite_uurija4_leht';
import Infoturbe_juht1_leht from './vaheleht/JS/Infoturbe_juht1_leht';
import Infoturbe_juht2_leht from './vaheleht/JS/Infoturbe_juht2_leht';
import Infoturbe_juht3_leht from './vaheleht/JS/Infoturbe_juht3_leht';
import Infoturbe_juht4_leht from './vaheleht/JS/Infoturbe_juht4_leht';
import Koolitaja1_leht from './vaheleht/JS/Koolitaja1_leht';
import Koolitaja2_leht from './vaheleht/JS/Koolitaja2_leht';
import Koolitaja3_leht from './vaheleht/JS/Koolitaja3_leht';
import Koolitaja4_leht from './vaheleht/JS/Koolitaja4_leht';
import Kuberturbe_riskijuht1_leht from './vaheleht/JS/Kuberturbe_riskijuht1_leht';
import Kuberturbe_riskijuht2_leht from './vaheleht/JS/Kuberturbe_riskijuht2_leht';
import Kuberturbe_riskijuht3_leht from './vaheleht/JS/Kuberturbe_riskijuht3_leht';
import Kuberturbe_riskijuht4_leht from './vaheleht/JS/Kuberturbe_riskijuht4_leht';

import Infoturbe_juht1 from './games/JavaScript/Infoturbe_juht1';
import Infoturbe_juht2 from './games/JavaScript/Infoturbe_juht2';
import Infoturbe_juht3 from './games/JavaScript/Infoturbe_juht3';
import Infoturbe_juht4 from './games/JavaScript/Infoturbe_juht4';
import Arhitekt1 from './games/JavaScript/Arhitekt1';
import Arhitekt2 from './games/JavaScript/Arhitekt2';
import Arhitekt3 from './games/JavaScript/Arhitekt3';
import Arhitekt4 from './games/JavaScript/Arhitekt4';
import Kuberturbe_ohuanaluutik1 from './games/JavaScript/Kuberturbe_ohuanaluutik1';
import Kuberturbe_ohuanaluutik2 from './games/JavaScript/Kuberturbe_ohuanaluutik2';
import Kuberturbe_ohuanaluutik3 from './games/JavaScript/Kuberturbe_ohuanaluutik3';
import Kuberturbe_ohuanaluutik4 from './games/JavaScript/Kuberturbe_ohuanaluutik4';
import Kuberturbe_riskijuht1 from './games/JavaScript/Kuberturbe_riskijuht1';
import Kuberturbe_riskijuht2 from './games/JavaScript/Kuberturbe_riskijuht2';
import Kuberturbe_riskijuht3 from './games/JavaScript/Kuberturbe_riskijuht3';
import Kuberturbe_riskijuht4 from './games/JavaScript/Kuberturbe_riskijuht4';
import Kuberturvalisuse_uurija1 from './games/JavaScript/Kuberturvalisuse_uurija1';
import Kuberturvalisuse_uurija2 from './games/JavaScript/Kuberturvalisuse_uurija2';
import Kuberturvalisuse_uurija3 from './games/JavaScript/Kuberturvalisuse_uurija3';
import Kuberturvalisuse_uurija4 from './games/JavaScript/Kuberturvalisuse_uurija4';
import Norkustestija1 from './games/JavaScript/Norkustestija1';
import Norkustestija2 from './games/JavaScript/Norkustestija2';
import Norkustestija3 from './games/JavaScript/Norkustestija3';
import Norkustestija4 from './games/JavaScript/Norkustestija4';
import Turvapoliitika_eestvedaja1 from './games/JavaScript/Turvapoliitika_eestvedaja1';
import Turvapoliitika_eestvedaja2 from './games/JavaScript/Turvapoliitika_eestvedaja2';
import Turvapoliitika_eestvedaja3 from './games/JavaScript/Turvapoliitika_eestvedaja3';
import Turvapoliitika_eestvedaja4 from './games/JavaScript/Turvapoliitika_eestvedaja4';
import Audiitor1 from './games/JavaScript/Audiitor1';
import Audiitor2 from './games/JavaScript/Audiitor2';
import Audiitor3 from './games/JavaScript/Audiitor3';
import Audiitor4 from './games/JavaScript/Audiitor4';
import Koolitaja1 from './games/JavaScript/Koolitaja1';
import Koolitaja2 from './games/JavaScript/Koolitaja2';
import Koolitaja3 from './games/JavaScript/Koolitaja3';
import Koolitaja4 from './games/JavaScript/Koolitaja4';
import Digi_toendite_uurija1 from './games/JavaScript/Digi_toendite_uurija1';
import Digi_toendite_uurija2 from './games/JavaScript/Digi_toendite_uurija2';
import Digi_toendite_uurija3 from './games/JavaScript/Digi_toendite_uurija3';
import Digi_toendite_uurija4 from './games/JavaScript/Digi_toendite_uurija4';
import Rakendaja1 from './games/JavaScript/Rakendaja1';
import Rakendaja2 from './games/JavaScript/Rakendaja2';
import Rakendaja3 from './games/JavaScript/Rakendaja3';
import Rakendaja4 from './games/JavaScript/Rakendaja4';
import Sundmuste_reageerija1 from './games/JavaScript/Sundmuste_reageerija1';
import Sundmuste_reageerija2 from './games/JavaScript/Sundmuste_reageerija2';
import Sundmuste_reageerija3 from './games/JavaScript/Sundmuste_reageerija3';
import Sundmuste_reageerija4 from './games/JavaScript/Sundmuste_reageerija4';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        {/* Avaleht */}
        <Route path="/" element={<Avaleht />} />

        {/* KKK, Meist, Kontakt */}
        <Route path="/kkk" element={<KKK />} />
        <Route path="/meist" element={<Meist />} />
        <Route path="/kontakt" element={<Kontakt />} />

        {/* 12 new role pages */}
        <Route path="/Infoturbe_juht" element={<InfoturbeJuht />} />
        <Route path="/Kuberturvalisuse_uurija" element={<KuberturvalisuseUurija />} />
        <Route path="/Norkustestija" element={<Norkustestija />} />
        <Route path="/Digitaalsete_toendite_uurija" element={<DigitaalseteToenditeUurija />} />
        <Route path="/Kuberturvalisuse_rakendaja" element={<KuberturvalisuseRakendaja />} />
        <Route path="/Kuberturbe_audiitor" element={<KuberturbeAudiitor />} />
        <Route path="/Turvapoliitika_eestvedaja" element={<TurvapoliitikaEestvedaja />} />
        <Route path="/Kuberturbe_riskijuht" element={<KuberturbeRiskijuht />} />
        <Route path="/Kubersundmuste_reageerija" element={<KubersundmusteReageerija />} />
        <Route path="/Kuberturvalisuse_arhitekt" element={<KuberturvalisuseArhitekt />} />
        <Route path="/Kuberturvalisuse_koolitaja" element={<KuberturvalisuseKoolitaja />} />
        <Route path="/Kuberturbe_ohuanaluutik" element={<KuberturbeOhuanaluutik />} />

        {/* vahelehed */}
        <Route path="/Kuberturbe_ohuanaluutik1_leht" element={<Kuberturbe_ohuanaluutik1_leht />} />
        <Route path="/Kuberturbe_ohuanaluutik2_leht" element={<Kuberturbe_ohuanaluutik2_leht />} />
        <Route path="/Kuberturbe_ohuanaluutik3_leht" element={<Kuberturbe_ohuanaluutik3_leht />} />
        <Route path="/Kuberturbe_ohuanaluutik4_leht" element={<Kuberturbe_ohuanaluutik4_leht />} />
        <Route path="/arhitekt1_leht" element={<Arhitekt1_leht />} />
        <Route path="/arhitekt2_leht" element={<Arhitekt2_leht />} />
        <Route path="/arhitekt3_leht" element={<Arhitekt3_leht />} />
        <Route path="/arhitekt4_leht" element={<Arhitekt4_leht />} />
        <Route path="/audiitor1_leht" element={<Audiitor1_leht />} />
        <Route path="/audiitor2_leht" element={<Audiitor2_leht />} />
        <Route path="/audiitor3_leht" element={<Audiitor3_leht />} />
        <Route path="/audiitor4_leht" element={<Audiitor4_leht />} />
        <Route path="/digi_toendite_uurija1_leht" element={<Digi_toendite_uurija1_leht />} />
        <Route path="/digi_toendite_uurija2_leht" element={<Digi_toendite_uurija2_leht />} />
        <Route path="/digi_toendite_uurija3_leht" element={<Digi_toendite_uurija3_leht />} />
        <Route path="/digi_toendite_uurija4_leht" element={<Digi_toendite_uurija4_leht />} />
        <Route path="/infoturbe_juht1_leht" element={<Infoturbe_juht1_leht />} />
        <Route path="/infoturbe_juht2_leht" element={<Infoturbe_juht2_leht />} />
        <Route path="/infoturbe_juht3_leht" element={<Infoturbe_juht3_leht />} />
        <Route path="/infoturbe_juht4_leht" element={<Infoturbe_juht4_leht />} />
        <Route path="/koolitaja1_leht" element={<Koolitaja1_leht />} />
        <Route path="/koolitaja2_leht" element={<Koolitaja2_leht />} />
        <Route path="/koolitaja3_leht" element={<Koolitaja3_leht />} />
        <Route path="/koolitaja4_leht" element={<Koolitaja4_leht />} />
        <Route path="/kuberturbe_riskijuht1_leht" element={<Kuberturbe_riskijuht1_leht />} />
        <Route path="/kuberturbe_riskijuht2_leht" element={<Kuberturbe_riskijuht2_leht />} />
        <Route path="/kuberturbe_riskijuht3_leht" element={<Kuberturbe_riskijuht3_leht />} />
        <Route path="/kuberturbe_riskijuht4_leht" element={<Kuberturbe_riskijuht4_leht />} />

        {/* Mängude marsruudid */}
        <Route path="/infoturbe_juht1" element={<Infoturbe_juht1 />} />
        <Route path="/infoturbe_juht2" element={<Infoturbe_juht2 />} />
        <Route path="/infoturbe_juht3" element={<Infoturbe_juht3 />} />
        <Route path="/infoturbe_juht4" element={<Infoturbe_juht4 />} />
        <Route path="/arhitekt1" element={<Arhitekt1 />} />
        <Route path="/arhitekt2" element={<Arhitekt2 />} />
        <Route path="/arhitekt3" element={<Arhitekt3 />} />
        <Route path="/arhitekt4" element={<Arhitekt4 />} />
        <Route path="/kuberturbe_ohuanaluutik1" element={<Kuberturbe_ohuanaluutik1 />} />
        <Route path="/kuberturbe_ohuanaluutik2" element={<Kuberturbe_ohuanaluutik2 />} />
        <Route path="/kuberturbe_ohuanaluutik3" element={<Kuberturbe_ohuanaluutik3 />} />
        <Route path="/kuberturbe_ohuanaluutik4" element={<Kuberturbe_ohuanaluutik4 />} />
        <Route path="/kuberturbe_riskijuht1" element={<Kuberturbe_riskijuht1 />} />
        <Route path="/kuberturbe_riskijuht2" element={<Kuberturbe_riskijuht2 />} />
        <Route path="/kuberturbe_riskijuht3" element={<Kuberturbe_riskijuht3 />} />
        <Route path="/kuberturbe_riskijuht4" element={<Kuberturbe_riskijuht4 />} />
        <Route path="/kuberturvalisuse_uurija1" element={<Kuberturvalisuse_uurija1 />} />
        <Route path="/kuberturvalisuse_uurija2" element={<Kuberturvalisuse_uurija2 />} />
        <Route path="/kuberturvalisuse_uurija3" element={<Kuberturvalisuse_uurija3 />} />
        <Route path="/kuberturvalisuse_uurija4" element={<Kuberturvalisuse_uurija4 />} />
        <Route path="/norkustestija1" element={<Norkustestija1 />} />
        <Route path="/norkustestija2" element={<Norkustestija2 />} />
        <Route path="/norkustestija3" element={<Norkustestija3 />} />
        <Route path="/norkustestija4" element={<Norkustestija4 />} />
        <Route path="/turvapoliitika_eestvedaja1" element={<Turvapoliitika_eestvedaja1 />} />
        <Route path="/turvapoliitika_eestvedaja2" element={<Turvapoliitika_eestvedaja2 />} />
        <Route path="/turvapoliitika_eestvedaja3" element={<Turvapoliitika_eestvedaja3 />} />
        <Route path="/turvapoliitika_eestvedaja4" element={<Turvapoliitika_eestvedaja4 />} />
        <Route path="/audiitor1" element={<Audiitor1 />} />
        <Route path="/audiitor2" element={<Audiitor2 />} />
        <Route path="/audiitor3" element={<Audiitor3 />} />
        <Route path="/audiitor4" element={<Audiitor4 />} />
        <Route path="/koolitaja1" element={<Koolitaja1 />} />
        <Route path="/koolitaja2" element={<Koolitaja2 />} />
        <Route path="/koolitaja3" element={<Koolitaja3 />} />
        <Route path="/koolitaja4" element={<Koolitaja4 />} />
        <Route path="/digi_toendite_uurija1" element={<Digi_toendite_uurija1 />} />
        <Route path="/digi_toendite_uurija2" element={<Digi_toendite_uurija2 />} />
        <Route path="/digi_toendite_uurija3" element={<Digi_toendite_uurija3 />} />
        <Route path="/digi_toendite_uurija4" element={<Digi_toendite_uurija4 />} />
        <Route path="/rakendaja1" element={<Rakendaja1 />} />
        <Route path="/rakendaja2" element={<Rakendaja2 />} />
        <Route path="/rakendaja3" element={<Rakendaja3 />} />
        <Route path="/rakendaja4" element={<Rakendaja4 />} />
        <Route path="/sundmuste_reageerija1" element={<Sundmuste_reageerija1 />} />
        <Route path="/sundmuste_reageerija2" element={<Sundmuste_reageerija2 />} />
        <Route path="/sundmuste_reageerija3" element={<Sundmuste_reageerija3 />} />
        <Route path="/sundmuste_reageerija4" element={<Sundmuste_reageerija4 />} />
      </Routes>
    </Router>
  );
}

export default App;
