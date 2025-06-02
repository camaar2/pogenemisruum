import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
{
    id: 1,
    title: "Viirusetõrje paigaldamine",
    content: `
- **Viirusetõrje** on programm, mis aitab kaitsta arvutit või serverit pahatahtlike programmide (viirused) eest.  
- • **Paigaldamine** tähendab, et tarkvara installeeritakse arvutisse, et selle põhifailid ja taustaprotsessid (teenused) hakkaksid tööle.  
- • Kui installid viirusetõrje, paned arvutisse valvekoera, kes haistab ja takistab pahavara enne, kui see su arvutis midagi halba teeb.  
- • Installiprotsess võib küsida luba mõningate failide eemaldamiseks või süsteemimuudatuste tegemiseks, et viirusetõrje saaks skaneerimist alustada.`
},
{
    id: 2,
    title: "Reaalajas skaneerimise lubamine",
    content: `
- **Reaalajas skaneerimine** tähendab, et viirusetõrje jälgib pidevalt kõiki faile, mis arvutisse tulevad või sealt lahkuvad, et peatada pahavara enne, kui see saab süsteemi kahjustada.  
- • See töötab taustal, skaneerides iga faili või programmi, mille kasutaja avab, alla laadib või käivitab.  
- • Kujuta ette, et iga kord, kui sa klõpsad mingil failil, vaatab viirusetõrje selle üle ja ütleb: “Jah, see on ohutu” või “Hoiatus, see fail võib olla kurjategija tööriist”.  
- • Kui mõni fail tundub kahtlane (vastab pahavara kirjeldusele), blokeerib viirusetõrje selle ja annab sulle sellest kohe teada.`
},
{
    id: 3,
    title: "Turvabaasi värskendamine",
    content: `
- **Turvabaas** ehk viirusetunnuste andmebaas sisaldab kirjeldusi (allkirju ja mustreid) tuntud pahavarast.  
- **Värskendamine** tähendab, et viirusetõrje laadib internetist alla kõige uuemad kirjelduse failid, mis lisavad tuvastusvõimekust uute viiruste ja pahavara vastu.  
- • Kui turvabaas on vana, ei pruugi viirusetõrje teada viimaseid häkkerite loodud viiruseid. Uuendades turvabaasi, annad viirusetõrjele uue “sõrmejälje” info, et ta leiaks ka viiruseid, mis on äsja ilmunud.  
- • Tavaliselt värskendatakse turvabaasi automaatselt, kuid selle saab ka käsitsi kontrollida või määrata, et värskendused tuleksid iga päev või iga tund.`
},
{
    id: 4,
    title: "Manuste blokeerimine",
    content: `
- **Manused** on failid, mis saadetakse e-kirja osana (nt dokument, pilt või arhiiv). Mõnikord peidavad ründajad pahavara manustes.  
- **Manuste blokeerimine** tähendab, et viirusetõrje või e-posti server ei lase läbi e-kirju, millel on kahtlased manused (nt .exe, .scr, .bat).  
- • Kujuta ette, et iga e-kiri on nagu pakk ja manused on selle sees olevad karbid. Kui karbis võib olla mürgine vedelik (pahavara), ei luba turvapersonal seda karpi edasi kätte anda.  
- • Blokeerides tundmatud või kahtlased manused, vähendad ohtu, et kasutajad avavad ohtlikke faile, mis võivad installida viiruseid.  
- • Sageli lubatakse manuseid ainult kindlatest allikatest (töötaja@ettevõte.ee), ülejäänud saadetakse ülevaatamisele või eemaldatakse.`
}
];

export default function InfoturbeJuht2Leht() {
  const navigate = useNavigate();

  return (
    <div className="tutorial-page">
      {tutorialSections.map(sec => (
        <section key={sec.id} className="tutorial-section">
          <h2>{sec.title}</h2>
          <div className="tutorial-content">
            <ReactMarkdown>
              {sec.content}
            </ReactMarkdown>
          </div>
        </section>
      ))}

      <div className="tutorial-footer">
        <button onClick={() => navigate('/infoturbe_juht2')}>
          Alusta turvatarkvara paigaldust
        </button>
      </div>
    </div>
  );
}
