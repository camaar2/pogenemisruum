import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
    {
      id: 1,
      title: "Intsidendi teavitamine",
      content: `
  - • Esimene samm on **teavitada turvameeskonda** võimalikust intsidentist.  
  - • **Turvameeskond** on grupp inimesi, kes jälgib ja kaitseb süsteeme rünnakute eest.  
  - • Kui märkad midagi kahtlast (nt veebileht ei tööta otse või keegi proovis sisse logida ilma loata), teata sellest kohe neile, et nad saaksid alustada uurimist.  
  - • Kiire teadlikkus võimaldab kohest reageerimist ja minimeerib kahju – kui teavitus tuleb õigeaegselt, saab turvameeskond probleemi tõkestada enne, kui see laiemaks levima hakkab (nt ennetada andmete vargust).`
    },
    {
      id: 2,
      title: "Intsidendi hindamine ja prioriseerimine",
      content: `
  - • Pärast esmast teadet tuleb **intsidenti hinnata** (ulatus, mõju, tõsidus).  
  - • **Ulatus** tähendab, kui palju süsteeme või kasutajaid see mõjutab (nt kas ainult üks kasutaja ei saa sisselogida või on maas terve andmebaas).  
  - • **Mõju** tähendab, kui suurt kahju see võib põhjustada (nt kas varastati isikuandmeid).  
  - • **Tõsidus** ehk kui kiired on lootused, et probleem ise laheneb või vajab kohest sekkumist (nt 0-day haavatavus, millel pole veel lahendust, on kõrge tõsidusega).  
  - • Siis tuleb määrata **prioriteet** (kõrge, keskmine, madal), et suunata ressursid õigesti.  
  - • Kui vesi valgub ühe väikese prao kaudu aknast, ei pea kogu maja evakueerima (madal prioriteet). Kui aga kogu maja põleb, on vaja tuletõrjet kohe appi kutsuda (kõrge prioriteet).`
    },
    {
      id: 3,
      title: "Kriisimeeskonna kutsumine",
      content: `
  - • Kui intsident on hinnatud **kõrgeks**, kutsutakse kokku **kriisijuhtimise meeskond**, kes koordineerib kommunikatsiooni ja tehnilisi samme.  
  - • **Kriisijuhtimise meeskond** koosneb turvaspetsialistidest, juhtidest ja vajadusel juristidest või PR-esindajatest.  
  - • Kui majas on suur õnnetus (nt põleng), ei aita ainult üks tuletõrjuja – tuleb kokku kutsuda ka päästeametnikud, korrapidajad ja pressiesindajad, et lahendada olukord terviklikult.  
  - • See meeskond jagab ülesanded – keegi vaatab tehnilist poolt, keegi tegeleb kommunikatsiooniga (teavitab kliente/avalikkust) ja keegi jälgib, et vajalikud vahendid (riistvara, inimesed) on käepärast.`
    },
    {
      id: 4,
      title: "Tehniline analüüs ja vastumeetmed",
      content: `
  - • Viimane etapp on **täpsemad tehnilised analüüsid**, digitaalne kohtuekspertiis ja **vastumeetmete** rakendamine (parandused, tõkestus, taastamine).  
  - • **Digitaalne kohtuekspertiis** tähendab, et uuritakse arvutit või serverit detailtasemel (nt logisid, failisüsteemi), et aru saada, kuidas rünnak toimus ja milliseid andmeid mõjutati.  
  - **Vastumeetmed** hõlmavad:  
  -    1. Vajadusel haavatavuste (nt turvaaukude) parandamist või muu lahenduse rakendamist (näiteks paigaldatakse uus turvavärskendus).  
  -    2. Tõkestamist – rünnakupunktide blokeerimine (nt tulemüüri uute reeglite lisamine või pahatahtlike IP-aadresside blokeerimine).  
  -    3. Taastamist – süsteemi või andmete taastamine varukoopiatest (nt taastatakse andmebaasi seis enne rünnakut).`
    }
  ];

export default function SundmusteReageerija3Leht() {
  const navigate = useNavigate();
  return (
    <div className="tutorial-page">
      {tutorialSections.map(sec => (
        <section key={sec.id} className="tutorial-section">
          <h2>{sec.title}</h2>
          <div className="tutorial-content">
            <ReactMarkdown>{sec.content}</ReactMarkdown>
          </div>
        </section>
      ))}
      <div className="tutorial-footer">
        <button onClick={() => navigate('/sundmuste_reageerija3')}>
          Alusta tegevuste järjestamist
        </button>
      </div>
    </div>
  );
}
