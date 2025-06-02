import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: 'Kahtlane väljuv ühendus',
    content: `
- • **Mis on väljuv ühendus?**  
  Väljuv ühendus tekib siis, kui arvuti saadab andmeid intrnetis teisele arvutile või serverile. Tavaliselt saadab sinu arvuti väliseid päringuid näiteks veebilehtede laadimiseks.

- • **Miks on IP-aadress 185.123.45.67:4444 kahtlane?**  
  - IP 185.123.45.67 on juhuslik näide, kuid porti **4444** ei kasutata tavaliselt tavaliste veebilehtede või e-kirjade jaoks.  
  - Kui tarkvara loeb sellelt portilt midagi või saadab sinna midagi, võib see viidata pahavara “juhi-serverile” ehk C2-serverile (Command & Control).  

- • **Mis on C2-server?**  
  C2-server on väline arvuti, millega pahavara suhtleb, et saada juhiseid või saata varastatud andmeid. See tähendab, et keegi võib sinu arvutit kaugelt juhtida.

- • **Mida peaks teadma?**  
  Kui näed, et arvuti saadab andmeid portile 4444 või mõnele muule ebatavaliselt numbrile, tasub uurida, mis programm seda teeb. See võib olla märk pahavarast.  
    `
  },
  {
    id: 2,
    title: 'DNS päringud tavalises teenusesse',
    content: `
- • **Mis on DNS-päring?**  
  DNS (Domain Name System) aitab sinu arvutil leida veebilehe aadressi (näiteks windowsupdate.com). Kui sisestad brauserisse “google.com”, saadab arvuti esmalt DNS-päringu, et teada saada õige IP-aadress.

- • **Miks on windowsupdate.com normaalne?**  
  **Windows Update** on Microsofti teenus, mis kontrollib ja uuendab Windowsi tarkvara. Kui arvuti küsib DNS-i “windowsupdate.com” jaoks, tähendab see, et ta püüab otsida, kust võtta värskendusi.  

- • **Mida peaks teadma?**  
  Kui näed DNS-päringut tavapärasesse teenusesse nagu windowsupdate.com, ei pea seda pidama pahavaraks. See on lihtsalt arvuti kontrollimas, kas on uusi uuendusi.  
    `
  },
  {
    id: 3,
    title: 'Large HTTP POST andmeväljavedu',
    content: `
- • **Mis on HTTP POST?**  
  HTTP POST on üks viis, kuidas veebirakendus võib saata andmeid serverile. Näiteks kui sa laadid pildifaili veebisaidile, kasutab brauser POST-päringut.

- • **Miks võib 10 MB POST olla kahtlane?**  
  - Kui näed **HTTP POST /upload.php**, kus saadetakse mängult 10 MB andmeid serverisse, aga see server pole tuntud ega usaldusväärne, siis võib see tähendada “andmeeksfiltreerimist” (st pahavara saadab su süsteemist olulisi faile välja).  
  - Suur andmemaht võõrasse kohta võib viidata, et pahavara üritab varastada faile (nt dokumendid, paroolid, pildid).

- • **Mida peaks teadma?**  
  Kui näed, et su arvuti saadab suuri faile veebisaidile, mida sa ei tunne ega usalda, võib see olla pahavara tunnus. Sellisel juhul pead uurima, milline programm seda teeb.  
    `
  },
  {
    id: 4,
    title: 'Admin-sisselogimine öötunnil',
    content: `
- • **Mis on SMB admin-sisselogimine?**  
  SMB (Server Message Block) on võrguprotokoll, mida Windows kasutab failide jagamiseks ja printerite jagamiseks. Kui “admin” ehk administraator (kõrgetasemeline konto) logib sisse üle SMB, saab ta ligi teiste arvutite failidele.

- • **Miks on kell 03:17 kahtlane?**  
  - Tavakasutajad harva töötavad või logivad sisse töövälisel ajal, eriti öösel kell 3.  
  - Kui näed, et admin-konto logib sisse kell 03:17 pahatahtlikust IP-aadressist, võib see tähendada, et keegi üritab ilma loata ligi pääseda.  

- • **Mida peaks teadma?**  
  Kui märkad, et keegi admin-kontoga logib sisse ajal, mil sul pole seda vaja teha (nt südaöösel), kontrolli, mis täpselt toimub. See võib viidata, et keegi proovis end sisse suruda (brute-force) või lihtsalt võõrana sisse hiilida.  
    `
  },
  {
    id: 5,
    title: 'Tavaline arendaja TLS-liiklus',
    content: `
- • **Mis on TLS-ühendus?**  
  TLS (Transport Layer Security) krüpteerib andmed, mida arvuti ja server vahetavad. Näiteks kui avad veebilehe, kasutab brauser sageli TLS-i, et andmed oleksid kaitstud pealt kuulamise eest.

- • **Miks on github.com normaalne?**  
  **GitHub** on veebiplatvorm, kus arendajad hoiavad ja jagavad lähtekoodi. Kui tunned, et oled GitHubi tarkvara (nt koodiprojektide kloonimise tööriist) juures, siis ühendus TLS-iga github.com on täiesti tavaline.  

- • **Mida peaks teadma?**  
  Kui näed TLS-ühendust github.com või mõne teise populaarse ja usaldatava veebisaidiga, ei pea seda kartma – see on lihtsalt turvaline viis koodi või andmete allalaadimiseks.  
    `
  },
  {
    id: 6,
    title: 'Ping-test ja ICMP liiklus',
    content: `
- • **Mis on ICMP (ping)?**  
  ICMP on võrguprotokoll, mida kasutatakse diagnostika jaoks. Kui kirjutad oma arvutis käsureal “ping 192.168.1.1”, saadad väikese sõnumi (ICMP echo) sellele aadressile, et kontrollida, kas teine arvuti on võrgus.

- • **Miks pole see pahavara?**  
  Pingimist kasutatakse tavaliselt selleks, et näha, kas seade vastab, ja mõõta ühenduse kiirust. See aitab võrku testida, mitte andmeid varastada.

- • **Mida peaks teadma?**  
  Kui näed ICMP echo päringut, pole vaja muretseda – see on tavaliselt diagnostiline käsk, mida võrguhaldur või mõni programm kasutab võrgu seisundi kontrollimiseks.  
    `
  },
  {
    id: 7,
    title: 'Brute-force RDP katsetused',
    content: `
- • **Mis on RDP ja brute-force?**  
  - RDP (Remote Desktop Protocol) lubab teise arvuti ekraani kaugelt juhtida.  
  - Brute-force rünnak tähendab, et arvuti proovib suurt hulka paroole järjest, kuni leiab õige.  

- • **Miks on korduvad RDP-vead aadressilt 203.0.113.10 murettekitavad?**  
  Kui näed, et keegi proovib korduvalt RDP kaudu sisse logida, kuid kasutab pidevalt vale parooli, tähendab see, et ründaja proovib jõuga teada saada õiget parooli. IP 203.0.113.10 on lihtsalt näide, aga korduvad ebaõnnestumised viitavad pahatahtlikule tegevusele.

- • **Mida peaks teadma?**  
  Kui sisselogimiskatsed toimuvad liiga tihti ja parool on vale, võib see tähendada, et keegi püüab sinu RDP-d sisse murda. Sellisel juhul uuenda paroolid ja blokeeri kahtlane IP-aadress.  
    `
  },
  {
    id: 8,
    title: 'Tavaline NTP-sünkroniseerimine',
    content: `
- • **Mis on NTP?**  
  NTP (Network Time Protocol) aitab arvutitel sünkroniseerida kella täpselt läbi interneti. See on nagu kellaaegade võrdlemine, et kõik seadmed näitaksid sama aega.

- • **Miks pole pool.ntp.org kahtlane?**  
  **pool.ntp.org** on populaarne avalik NTP-teenus. Kui sinu nutikell või server võtab aega sealt, on see täiesti tavaline.

- • **Mida peaks teadma?**  
  Kui näed, et su seade saadab NTP-päringu pool.ntp.org-i, ei pea seda kartma. See on lihtsalt viis, kuidas sinu seadme kell õige ajaga sünkroniseerida.  
    `
  }
];

export default function KuberturvalisuseUurija3Leht() {
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
        <button onClick={() => navigate('/kuberturvalisuse_uurija3')}>
          Alusta mängu
        </button>
      </div>
    </div>
  );
}

