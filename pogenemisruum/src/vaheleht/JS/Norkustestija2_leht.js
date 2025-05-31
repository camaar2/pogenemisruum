import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
{
    id: 1,
    title: "Nmap - Võrguskaneerimine",
    content: `
- **Nmap** on programm (võrguskanner), mis aitab leida, millised arvutid või seadmed (hostid) on teie võrgus või internetis ja millised teenused neil jooksevad.  
- **Host** tähendab siin iga arvutit või seadet, mis on võrguga ühendatud (näiteks teie koduarvuti, tööarvuti või veebiserver).  
- **Port** on nagu “värav” igal hostil, mille kaudu töötavad erinevad teenused (näiteks port 80 on tavaliselt veebilehe “värav” ja port 22 on “värav” kaugjuurdepääsuks).  
- • Nmap proovib iga hosti erinevate portidega “löögi alla võtta” ja ütleb teile, millised portid on avatud (kättesaadavad) ja millised teenused (nt veebiserver või e-postiserver) nendel portidel töötavad.  
- • See on abiks selleks, et hinnata, kus võivad peituda võimalikud haavatavused (näiteks vananenud veebiserver, mis vajab turvavärskendust).`
},
{
    id: 2,
    title: "Nikto - Veebiserveri skaneerija",
    content: `
- **Nikto** on tööriist, mis kontrollib veebiserveri (server, mis kuvab veebilehte) turvaseadistusi ja otsib teadaolevaid ründepunkte (haavatavusi).  
- **Veebiserver** on arvuti tarkvara, mis näitab teile veebilehte (nt kui te avate brauseris aadressi).  
- • Nikto vaatab üle tavalised veebiserveri failid ja konfiguratsioonid (mida sageli kasutatakse veebirakenduste loomiseks), ning kontrollib, kas seal pole mõni levinud turvaauk (nt vananenud tarkvara, lubamatud seaded või pahavarale viitavad failid).  
- **Pahavara massiiv** tähendab internetist leitud pahatahtlike failide kogumikku, mida Nikto võrdleb teie serveris olevate failidega, et näha, kas mõni pahatahtlik fail on juba hosti peal.  
- • Selle tulemusel saate teada, kas teie veebiserveri konfiguratsioon või selle failid vajavad parandamist, et takistada häkkeritel rünnata.`
},
{
    id: 3,
    title: "SQL Injector - Andmebaasi turvatestimine",
    content: `
- **Andmebaas** on tarkvara, kus hoitakse ja haldatakse suurel hulgal andmeid (näiteks kasutajate kontod, tootekataloogid või kliendiinfo).  
- **SQL** on keel (Structured Query Language), mida kasutatakse andmebaasist info pärimiseks ja haldamiseks (näiteks “vali kõik kasutajad”).  
- **SQL Injection** on rünnakumeetod, kus ründaja sisestab veebivormi või URL-i kaudu andmebaasile mõeldud SQL-käsud, et pääseda ligi või muuta andmebaasis olevat infot (nt salvestada paroole või varastada kasutajate andmeid).  
- **SQL Injector** on tööriist, mis simuleerib sellist rünnakut – see üritab erinevaid pahatahtlikke SQL-käske sisestada, et näha, kas teie veebirakendus või andmebaas laseb seda teha.  
- • Kui SQL Injector leiab, et teatud sisendi kaudu saab andmebaasis andmeid lugeda või muuta, tähendab see, et süsteem on haavatav ja vaja on turvaparandust (nt sisendi kontroll või andmebaasi ligipääsu piiramine).`
},
{
    id: 4,
    title: "SMTP Checker - E-posti turbe hindamine",
    content: `
- **SMTP (Simple Mail Transfer Protocol)** on standard, mida kasutatakse e-kirjade saatmiseks internetis. Kui saata e-kiri, liigub see SMTP kaudu serverite vahel.  
- **SMTP Checker** kontrollib teie e-posti serveri (server, mis saadab ja võtab vastu e-kirju) turvaseadeid ja seda, kuidas teie server suhtleb teiste e-posti serveritega.  
- See tööriist testib järgmisi asju:  
- • **Autentimine**: kas kasutaja peab enne e-kirja saatmist sisestama õige kasutajanime ja salasõna, et keegi ei saaks teie serverit ilma loata kasutada.  
- • **Rämpsuvastane tõrje (spam filter)**: kas server suudab blokeerida kahtlased või rämpskirjad, mis võivad sisaldada pahavara või petusüsteeme.  
- • **Konfiguratsioon**: kas serveri seaded (nt turvalised ühendused, õige pordi kasutamine) vastavad parimatele praktikatele.  
- Kui SMTP Checker leiab, et teie serveril on valeparameetrid või see lubab saata kirju ilma autentimiseta, võib see tähendada, et häkkerid saavad teie serverit ära kasutada e-kirjade edastamiseks või pahavara levitamiseks.  
- E-posti turvalisus on oluline, sest ründajad võivad kasutada teie serverit rämpskirjade saatmiseks või proovida petukirju inimestele saata.`  
    }
];

export default function Norkustestija2Leht() {
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
        <button onClick={() => navigate('/norkustestija2')}>
          Alusta tööriistade sobitamist
        </button>
      </div>
    </div>
  );
}
