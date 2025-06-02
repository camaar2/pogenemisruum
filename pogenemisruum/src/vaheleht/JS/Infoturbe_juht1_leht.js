import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on tulemüürireeglite seadistamine?",
    content: `
- **Tulemüürireeglite seadistamine** on protsess, kus määratakse, milline võrguliiklus on lubatud ja milline blokeeritud.  
- • Tulemüür on nagu maja uks ja turvamees: ta vaatab, kas saadaval olev liiklus (nt sinu arvutist tulevad või sinna minevad andmepaketid) vastab lubatud reeglitele.  
- • Näiteks võid määrata reegli, et veebilehe külastamiseks (HTTPS) lubatud liiklus porti 443 kasutada, aga kaugturvalisuse (Telnet) liiklus porti 23 blokeeritud.  
- • Kujuta ette, et iga side arvuti ja interneti vahel on nagu pakiauto, mis liigub läbi värava. Tulemüürireeglid on nimekiri, mis ütleb, milliseid pakiautosid tohib väravast läbi lasta. Kui auto ei vasta nimekirjale, ei saa ta läbi.  
- • Õige tulemüürireeglite komplekt tagab, et ainult turvaline ja vajalik liiklus pääseb läbi, hoides pahatahtlikud katsed eemal ja samal ajal lubades tähtsatel teenustel töödata.`  
  },
  {
    id: 2,
    title: "Mis on HTTP ja HTTPS?",
    content: `
- **HTTP (HyperText Transfer Protocol)** on protokoll, mida brauser ja veebiserver kasutavad andmete vahetamiseks (veebilehe laadimiseks). HTTP-liiklus liigub tavaliselt **port 80-l** (nagu tänav, mille kaudu sõidavad tavalised autod, mis ei saa salakaupa vedada).  
- • HTTP ei krüpteeri andmeid, mis tähendab, et keegi, kes suudab liini pealt kuulata (näiteks avalikus WiFi-s), näeb kogu infot selgelt (paroolid, tekst, pildid).  
- **HTTPS (HTTP Secure)** kasutab sama põhimõtet, kuid lisab krüpteerimise (SSL/TLS) – see on nagu panna kirjad lukuga ümbrikusse, nii et ainult saatja ja saaja saavad neid lugeda. HTTPS-liiklus liigub tavaliselt **port 443-l** (turvaline tänav, kus igal autol on varjatud kast, kuhu keegi teine ei näe).  
- • HTTP on nagu postkaart – igaüks võib lugeda, mis sellega saadetakse. HTTPS on nagu ümbrikus kiri – keegi ei saa ilma õige võtmeta sisule ligi.  
- • Veebilehte külastades peaksid alati nägema aadressiribalt “https://”, mis näitab, et kõik sinu ja serveri vahel liigutav on krüpteeritud ja keegi ei saa seda muuta ega pealt kuulata.`  
  },
  {
    id: 3,
    title: "Mis on SMTP (e-posti protokoll)?",
    content: `
- **SMTP (Simple Mail Transfer Protocol)** on standard, mida kasutatakse e-kirjade saatmiseks ja edastamiseks internetis. See töötab tavaliselt **port 25-l**, mis on vana ja **vähe turvaline**, sest ei krüpteeri andmeid.  
- • Turvalisem variant on kasutada **port 587-t** või **port 465-t**, mis mõlemad toetavad **TLS-krüpteerimist.** See on nagu suletud ümbrik e-kirja jaoks, nii et ainult õiged osapooled saavad seda lugeda.  
- • SMTP on nagu postkontor, mis jagab kirju edasi. Kui kasutad vanakooli port 25-te, liiguvad kirjad lahtiselt ja keegi võõras võib neid lugeda. Kui aga kasutad porte 587 või 465, saadad kirjad krüpteeritult, nii et vaid saaja näeb sisu.  
- • E-posti turvalisus on oluline, sest ründajad võivad püüda varastada paroole või saata pahatahtlikke manuseid läbi e-kirja. Kui SMTP-liiklus on krüpteeritud, väldid, et keegi pealt kuulab või sõnumeid võltsib.`  
  },
  {
    id: 4,
    title: "Mis on DNS ja miks see oluline on?",
    content: `
- **DNS (Domain Name System)** on süsteem, mis tõlgib inimloetavad domeeninimed (näiteks www.example.com) arvuti “aadressideks” (IP-aadressideks). See töötab tavaliselt **port 53-l** (kas **UDP** või **TCP**).  
- • DNS on nagu interneti telefoniraamat: kui soovid külastada veebilehte, küsib sinu arvuti DNS-serverilt, milline IP on domeeniga "example.com". DNS vastab IP-aadressiga, millele brauser seejärel ühenduse loob.  
- • Kui DNS-server on rünnatud või valeinfo sisestatakse (nt **DNS-poisoning või DNS-spoofing**), võid sa sattuda petturi lehele, kuigi arvasid, et läksid “õigele” veebisaidile.  
- • Kui sa tahad sõbrale helistada, otsid tema nime telefoniraamatust ja saad numbri. DNS on sama põhimõte, aga veebisaidi nimede ja numbrite (IP-aadresside) jaoks. Kui telefoniraamat on vale, helistad valesse kohta.  
- • Õige DNS-i töötamine on kriitiline: kui DNS ei tööta, ei leia sinu brauser enam, kuhu liiklus suunata, ja kui DNS on ebaturvaline, võib ründaja suunata sind pahatahtlikele lehtedele.`
  },
  {
    id: 5,
    title: "Mis on SSH ja Telnet?",
    content: `
- **SSH (Secure Shell)** on krüpteeritud kaugjuurdepääsu protokoll, mis töötab tavaliselt **port 22-l**. See võimaldab turvaliselt ühendada teise arvutiga (näiteks serverisse) ja anda käske arvuti käsuviibas.  
- **Telnet** on vana kaugjuurdepääsu protokoll, mis töötab **port 23-l**, kuid ei krüpteeri ühendust. See on nagu avatud mikrofon: keegi võõras võib pealt kuulata sisestatud kasutajanimesid, paroole ja käske.  
- • Kujuta ette, et SSH on nagu telefonikõne, kus räägid teistega salajases kanalis, mida keegi teine ei kuule. Telnet on nagu helistada valjuhääldiga keset rahvarohket turuplatsi – iga mööduja saab sinu juttu hõlpsasti pealt kuulata.  
- • SSH kasutamine on kõige turvalisem viis kaugjuurdepääsuks serveritesse või võrguseadmetesse, sest kogu liiklus on krüpteeritud. Telneti ei tohiks kunagi kasutada avalikus või ebaturvalises võrgus, sest ründajal on võimalik kõiki sõnumeid pealt kuulata.`  
  },
  {
    id: 6,
    title: "Mis on FTP?",
    content: `
- **FTP (File Transfer Protocol)** on failiedastusprotokoll, mis töötab tavaliselt **port 21-l** (juhtimisprotokoll) ja **port 20-l** (andmeedastus).  
- • FTP edastab paroolid, failinimed ja failide sisu **ilma krüpteerimata** – see on nagu saata postkaart ilma ümbrikuta: igaüks, kes võrguliiklust pealt kuulab, näeb, mida sa saadad.  
- • Turvalisem alternatiiv on **SFTP (SSH File Transfer Protocol)** või **FTPS (FTP Secure)**, mis mõlemad krüpteerivad kogu andmeedastuse ja kaitsevad sinu paroole ja faile.  
- • FTP on nagu saata postkaart, kus kiri on nähtaval; SFTP ja FTPS on nagu panna kiri lukustatud ümbrikusse.  
- • Kui sinu serveris on vaja faile edastada (näiteks veebifailid või aruanded), ära kasuta FTP-d, sest keegi võib neile ligi pääseda või muudele pahatahtlikele allikatele edastada. Kasuta alati turvalist versiooni, et andmed püsiksid konfidentsiaalsed.`  
  }
];

export default function InfoturbeJuht1Leht() {
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
        <button onClick={() => navigate('/infoturbe_juht1')}>
          Alusta tulemüüri seadistamist
        </button>
      </div>
    </div>
  );
}