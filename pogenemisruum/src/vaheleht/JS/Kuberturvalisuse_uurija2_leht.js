import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: 'Makro dokumentide oht',
    content: `
- • **Mis on makro dokument?**  
  Dokument on tavaline tekstifail (nt Word või Excel), kus on sisseehitatud väikesed programmid ehk makrod.  
- • **Miks on need ohtlikud?**  
  Kui avad sellise dokumendi ja lubad makrod, võib see laadida pahatahtliku koodi internetist (nt Pastebinist) ja käivitada selle sinu arvutis.  
- • **Mida see tähendab?**  
  Kui sa ei tea, kust dokument pärineb, ära kunagi lase makrosid sisse. Isegi kui dokument näeb usaldusväärne välja, võib selle taga peituda viirus.  
    `
  },
  {
    id: 2,
    title: 'Digiallkirjastatud draiver – kas see on alati ohutu?',
    content: `
- • **Mis on draiver ja digiallkiri?**  
  Draiver on programm, mis aitab tarkvaral rääkida arvuti riistvaraga. Digiallkiri on nagu digitempel, mis näitab, kes selle draiveri tegi.  
- • **Miks ei tähenda allkiri alati turvalisust?**  
  Digiallkiri ütleb ainult, et koodi on allkirjastanud “litsentseeritud” tootja. Kui kood on pahatahtlik, võib keegi siiski allkirjaga varjata viirust.  
- • **Mida peaks teadma?**  
  Kui näed digiallkirja, ei pruugi see veel kindlustada, et draiver on 100% ohutu. Uuri alati tootjat ja allikat enne installimist.  
    `
  },
  {
    id: 3,
    title: 'Protsesside süstimine',
    content: `
- • **Mis on protsess?**  
  Protsess on programm, mis parasjagu arvutis töötab (nt veebibrauser või tekstiredaktor).  
- • **Mis on süstimine?**  
  Kui pahavara “süstib” koodi teise protsessi sisse (näiteks Windows Exploreri sisse), hakkab see pahavara näima usaldusväärne ja turvatarkvara ei pruugi seda märgata.  
- • **Miks see on ohtlik?**  
  Kui pahavara elab teise protsessi sees, ei näe seda tavaline viirusetõrje. Pahavara saab teha halbu asju arvutis ja jääda varjatuks.  
  - • **Mida peaks teadma?** 
  Kui arvuti käitub imeliku viisil (nt programm ei käivitu ja hakkab midagi salaja tegema), võib see tähendada, et keegi on “süstinud” pahavara.  
    `
  },
  {
    id: 4,
    title: 'Tavaline pilt – kas see võib olla pahatahtlik?',
    content: `
- • **Mis on PNG-pilt?**  
  PNG on pildiformaat, mida kasutatakse fotode ja jooniste salvestamiseks.  
- • **Kas tavaline PNG võib koodi sisaldada?**  
  Kui pilt on lihtsalt pilt (ilma peidetud osadeta), ei käivita see pahavara.  
- • **Millal peab kartma?**  
  Mõned targad häkkerid võivad peita pildifaili sisse andmeid, mida nad ise hiljem loevad (seda nimetatakse steganograafiaks). See ei käivita automaatselt viirust, aga võib peita infot, mida pahavara kasutab.  
  - • **Mida peaks teadma?**
  Kui näed lihtsalt tavalist pilti, ei pea seda kartma. Küll aga ära ava faile, mille oled saanud imelikust allikast ja mille kohta keegi ei tea midagi rääkida – nende sees võib pilt olla ainult näiliselt ja taga endiselt viirus.  
    `
  },
  {
    id: 5,
    title: 'Base64-kodeeritud PowerShell',
    content: `
- • **Mis on PowerShell?**  
  PowerShell on Windowsi programm, millega saab kirjutada ja käivitada skripte (väikseid käsurea-programme).  
- • **Mis on Base64?**  
  Base64 on viis, kuidas tavalist teksti (nt käske) muuta näiliselt juhuslikuks tähekogumiks. Selle eesmärk on peita, mida täpselt kästi teha.  
- • **Miks pahavara seda kasutab?**  
  Pahavara kood Base64 kujul ei näita selgelt, mis seal on. Kaitseprogrammid ei pruugi Base64 tugevalt kontrollida, nii et viirus pääseb kergemini läbi.  
  - • **Mida peaks teadma?**  
  Kui näed PowerShelli käsku, mis algab “\-EncodedCommand” või “Base64”, tähendab see sageli, et keegi püüab midagi varjata. Ole selliste skriptidega ettevaatlik.  
    `
  },
  {
    id: 6,
    title: 'Lihttekstiline logifail – ohtlik või mitte?',
    content: `
- • **Mis on logifail?**  
  Logifail on tavaline tekstifail, kuhu kirjutatakse arvutis või programmis päeviku- või sündmuste info (nt mis kell programm käivitati, mis viga tekkis).  
- • **Kas tavaline tekstifail võib olla pahatahtlik?**  
  Kui see on lihtsalt tavaline tekst (kuupäevad, veateated, tegevuste loend), siis selles ei ole koodi ega viirust.  
- • **Millal peaks muretsema?**  
  Kui logifail on muudetud ja sinna on lisatud skripte või kooditükke, võib see viidata pahavara katsel varjata oma tegevust. Tavaliselt aga lihtne tekstifail ei ole ohtlik.  
- • **Mida peaks teadma?**  
  Tavalist tekstifaili on ohutu lugeda. Kui peaksid kahtlustama, et üks logifail pole päris “lihttekst”, ava see lihtsas tekstiredaktoris (nt Notepad) ja vaata, kas seal on ainult loetavad sõnad või ka koodilõigud.  
    `
  },
  {
    id: 7,
    title: 'Peidetud EXE ja autorunni käitumine',
    content: `
- • **Mis on EXE-fail?**  
  EXE on Windowsi programmifaili formaat. Kui topeltklõpsad, siis programm käivitub.  
- • **Mis on AppData kaust?**  
  AppData on salajane kaust sinu kasutaja profiilis, kuhu tavaliselt tavakasutaja faile ei salvesta. Pahatahtlikud programmid võivad sinna peitu pugeda, sest tavakasutaja seda kausta tihti ei vaata.  
- • **Mis on Run-registrivõti?**  
  See on koht Windowsi sisemuses, kus saab määrata, et programm käivituks iga kord, kui arvuti sisse lülitad. Kui pahavara lisab enda kirje sinna, käivitub see automaatselt igal arvuti käivitamisel.  
- • **Mida see tähendab?**  
  Kui näed, et su arvutis töötab mingi programm AppData kaustast ja see sai käivituse siis, kui arvuti sisse lülitasid, võib tegu olla pahavaraga. Sellisel juhul tasub küsida abi või otsida juhiseid, kuidas see eemaldada.  
    `
  },
  {
    id: 8,
    title: 'Turvaline PDF – digiallkirjaga ja ilma skriptita',
    content: `
- • **Mis on PDF-dokument?**  
  PDF on fail, mida kasutatakse dokumentide esitamiseks nii, et need näevad kõigis arvutites ühesugused välja.  
- • **Mis on digiallkiri PDF-s?**  
  Digiallkiri on justkui virtuaalne tempel, mis kinnitab, et keegi pole seda PDF-i muutnud pärast allkirja lisamist.  
- • **Miks ilma skriptita PDF on ohutu?**  
  Kui PDF-is ei ole JavaScripti või makrosid, ei saa see enda sees käivitada reaalset koodi, mis võiks pahatahtlik olla.  
- • **Mida peaks teadma?**  
  Kui saad PDF-i usaldusväärsest allikast (nt ametlik leht või tuttav inimene) ja see on digiallkirjastatud, võid selle avada ilma mureta. Kui aga PDF tuleb tundmatult e-posti aadressilt ja sisaldab hoiatusi makrode või skriptide lubamiseks, ära seda ava.  
    `
  }
];

export default function KuberturvalisuseUurija2Leht() {
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
        <button onClick={() => navigate('/kuberturvalisuse_uurija2')}>
          Alusta mängu
        </button>
      </div>
    </div>
  );
}
