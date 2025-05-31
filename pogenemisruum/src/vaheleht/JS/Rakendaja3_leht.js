import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
{
    id: 1,
    title: "Viirusetõrje tarkvara",
    content: `
- **Viirusetõrje tarkvara** on programm, mis skaneerib arvutis olevaid faile ja otsib teadaolevaid pahatahtlikke programme (näiteks viiruseid).  
- • Kui viirusetõrje leiab kahtlase faili, ta kas blokeerib selle või eemaldab enne, kui programm jõuab käivituda.  
- • **Viirus** ja muud pahatahtlikud programmid võivad varastada andmeid, muuta tarkvara käitumist või kahjustada kasutatavat seadet.  
- • Mõtle, et viirusetõrje on nagu valvekoer, kes haistab halba käitumist ja takistab pahatahtlike “sisserändajate” kodu (süsteemi) kahjustamast.  
- Viirusetõrje kasutab sageli kahte meetodit:  
-   1. **Allkirjapõhine** – võrreldes kõiki faile nimekirjaga tuntud viirusekoodidest.  
-   2. **Heuristiline** – uurib faili käitumist, et näha, kas see üritab teha midagi halba (nt varjata end või muuta teisi faile).  
- • Regulaarne viirusetõrje värskendamine on oluline: see tähendab, et programm saab iga päev või iga nädal nimekirja uutest viirusest, et leida ka viimased ohud.`
},
{
    id: 2,
    title: "Tulemüür",
    content: `
- **Tulemüür** on tarkvara või riistvara seade, mis kontrollib kogu sissetulevat ja väljaminevat võrgu/võrkude liiklust ning otsustab reeglite alusel, mida lubada ja mida blokeerida.  
- **Port** on nagu “uks” arvuti väljaspool: iga port võimaldab eri tüüpi andmeedastust (näiteks port 80 veebilehtede jaoks, port 22 kaugjuurdepääsu jaoks).  
- • Kui tulemüür näeb paketti, mis üritab kasutada porti, mis pole lubatud, siis ta peatab selle ja ei lase sellel edasi minna.  
- • Näiteks lubame ainult **HTTPS** (port 443) ja **SSH** (port 22) liiklust ning blokeerime kõik muud pordinumbrid, et takistada pahatahtlikku ligipääsu.  
- • Kujuta ette, et maja ees on turvamees (tulemüür), kes laseb läbi vaid need külalised (ühendused), kelle nimi on nimekirjas (lubatud port ja IP). Ülejäänud koputajad jäävad ukse taha.  
- Tulemüür võib töötada kahes režiimis:  
-    1. **Rakenduspõhine** – kontrollib konkreetse programmi (nt brauseri) liiklust.  
-    2. **Paketipõhine** – vaatab iga andmepaketti ja otsustab, kas see porti kasutada tohib.  
- • Õigesti konfigureeritud tulemüür aitab vältida, et ründajad pääseksid süsteemi ligi ja et pahavara ei saaks andmeid internetti saata.`
},
{
    id: 3,
    title: "Andmete varundussüsteem",
    content: `
- **Andmete varundussüsteem** loob korrapäraselt koopiad kõikidest olulistest failidest ja andmebaasidest, et tagada nende taastamine, kui originaalid kaotsi lähevad või rikutakse.  
- Varundatakse tavaliselt kolm varianti:  
-    1. **Täielik varundus** – kopeeritakse kõik failid korraga (võtab kauem aega ja rohkem ruumi).  
-   2. **Täiendav varundus** – kopeeritakse ainult need failid, mis on muutunud pärast viimast varundust (võtab vähem ruumi).  
-    3. **Diferentsiaalne varundus** – kopeerib kõik muutunud failid algsest seisust (keskmine ruumikasutus).  
- • Varukoopiaid võib hoida kas kohalikus kõvaketas, pilvesalvestuses või välisel USB-l.  
- • Mõtle, et lood päeviku koopiad – kui keegi põletab su originaal päeviku, on sul varundus olemas, et seda taastada. Sama on andmetega: kui ründaja kustutab või krüpteerib faile, saad varukoopiast taastada algse olukorra.  
- • Varundussüsteem on eriti oluline rünnakute (näiteks lunavara) korral: kui pahavara krüpteerib originaalid, saad taastada failid varundusest ja ei pea lunaraha maksma.  
- • Varunduse toimivus tuleb regulaarselt testida: tee proovitaastamisi, et veenduda, kas varukoopiad töötavad õigesti.`
},
{
    id: 4,
    title: "Sissetungituvastussüsteem (IDS)",
    content: `
- **IDS (Intrusion Detection System)** on tarkvara või riistvara, mis analüüsib võrgu- või süsteemiloge, et tuvastada ebatavaline või pahatahtlik tegevus.  
- • IDS ei blokeeri rünnakuid, vaid annab turvameeskonnale kohese hoiatuse (näiteks “kahtlane IP aadress proovib mitu korda valet parooli”).  
-  IDS töötab mustrite (“signatures”) ja käitumispõhise (“heuristic”) analüüsiga:  
-    1. **Mustripõhine analüüs** võrreldab sissetulevaid andmepakette teadaolevate ründeallkirjadega (nt pahavara sõrmejäljed).  
-    2. **Käitumispõhine analüüs** vaatab logidest ebatavalisi mustreid (nt liiga palju ebaõnnestunud sisselogimisi lühikese aja jooksul).  
- • Kujuta ette IDS-i valvekaamera või turvamehena, kes vaatab pidevalt üle hoone ümbruse ja helistab turvameeskonnale, kui näeb midagi kahtlast.  
-  IDS võib koguda andmeid:  
       - **Võrgupaketid** – mis andmepaketid liiguvad sinu võrgus.  
       - **Süsteemilogid** – mis programmide ja kasutajatega süsteemis juhtus.  
- • Kui IDS hääletab alarmiga, saab turvameeskond kiiresti uurida, kas tegemist on valetõukega või tõelise rünnakuga.  
- • IDS on oluline, kuna see annab varajase hoiatuse, enne kui ründaja jõuab uuemalt turvalahendustest mööda hiilida.`
      }
];

export default function Rakendaja3Leht() {
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
        <button onClick={() => navigate('/rakendaja3')}>
          Alusta tööriistade valikut
        </button>
      </div>
    </div>
  );
}