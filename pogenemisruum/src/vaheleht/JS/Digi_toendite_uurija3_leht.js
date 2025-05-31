import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
    {
        id: 1,
        title: "Mis on JPEG failide EXIF-metainfo?",
        content: `
    - **EXIF-metainfo** on faili sisse salvestatud lisainfo, mis on loodud kaamera sees pildistamise ajal.  
    - • Näiteks sisaldab see kaamera mudelit, kuupäeva ja kellaaega, mil foto tehtud on (näiteks 2025-03-15 14:32).  
    - • Mõnel kaameral või telefonil salvestatakse ka **GPS-koordinaadid** (laius- ja pikkuskraad), mis ütlevad, kus täpselt pilt tehtud on.  
    - • See on nagu pildi „sildike“, mis ütleb, millal ja kus see tehtud on ning milliste seadistustega (nt säriaeg või avaarvu number).  
    - • Digitaalse tõendina saab EXIF-ist teada, kas foto on tehtud õigel ajal ja õiges kohas, mis võib olla oluline uurimisel.`
      },
      {
        id: 2,
        title: "Mis on PDF dokumentide manused ja metainfo?",
        content: `
    - **PDF-id** (Portable Document Format) on failid, kus tekst ja pildid on salvestatud kindlas formaadis, mida saab avada igasuguses arvutis.  
    - **Manused** on PDF-i sees olevad lisafailid (nt pildid, Exceli tabelid või muud dokumendid), mis saab panna ühe PDF-konteineri alla.  
    - **Varjatud tekst** tähendab, et PDF-i sees võib olla teksti, mida kohe ei nähta (näiteks varjatud tekstialad), aga mis on failis olemas ja uurija saab selle välja tuua.  
    - **Metainfo** on dokumenti lisatud lisainfo, näiteks autor, loomiskuupäev, millal viimati muudatusi tehti (näiteks “Autor: J. Tamm, Loodud: 01.01.2025, Viimati muudetud: 10.02.2025”).  
    - • PDF on nagu karp, mis võib hoida mitut faili korraga (manused) ning millel on silt (metainfo), mis ütleb, kes selle tegi, millal ja mis muutusi on tehtud.  
    - • Uurimisel aitab see teada, kes dokumenti lõi, kas seda on hiljem muudetud ja mida täpselt kaasati PDF-i sisse.`
      },
      {
        id: 3,
        title: "Miks logifailid on olulised?",
        content: `
    - **Logifailid** on nagu arvuti päevik (kirjaplokid), kuhu salvestatakse kõik olulised tegevused ja vead, mis süsteemis juhtuvad.  
    - • Iga rida logifailis sisaldab **ajatemplit** (kuupäev ja kellaaeg), mis ütleb täpselt, millal midagi toimus (näiteks “2025-05-30 09:12:45 – kasutaja parool valesti sisestas”).  
    - Logid võivad sisaldada:  

        - **Kasutajate sisselogimised** ja välja logimised (kes, kus ja millal sisse logis).  
        - **Failide avamine või kustutamine** (näiteks “dokument.pdf avati kell 10:05”).  
        - **Vead ja hoiatusteated** (nt “veebiserver ei suutnud faili leida”).  

    - • Logid on nagu ajalugu, millele saab hiljem tagasi vaadata ja aru saada, mis järjestuses ja millal miski juhtus.  
    - • Uurimisel saab logifailide põhjal teada, kuidas intsident algas (näiteks ebaõnnestunud sisselogimised enne ründe algust) ja milliseid vigu süsteemil esines.`
      },
      {
        id: 4,
        title: "Mis on meilifaili uurimiseks vajalik?",
        content: `
    - **Meilifailid** (nt .eml või .msg) sisaldavad täpset koopiat eelmisest e-kirjast, sealhulgas selle HTML- ja tekstiosa, mis kuvatakse kasutajale.  
    - • Igal meilil on **päis** (header), kus on kirjas saatja ja saaja aadressid, kellaeg, serverite nimed ja muud tehnilised andmed (näiteks “From: kasutaja@example.com” või “Received: server123.mail.com”).  
    - • Meilis võib olla **manuseid** (attachment), näiteks pildid või PDF-id; need manused võivad sisaldada pahavara.  
    - • Manustes võib olla **metaandmeid**, mis ütlevad, millal ja millega need loodud on (nt Wordi failil, mis on manuses).  
    - • Kui keegi saadab e-kirja, see salvestub serveris ja kliendi arvutis faili kujul. Sa võid selle faili avada spetsiaalses e-posti programmis või tavatekstina lugeda, et näha, kes saatja on, millal see saadeti ja mis manuseid kaasas oli.  
    - • Uurimisel aitab meilifail näha täpset saatmisaega, kõiki osapooli ja manuseid, et tuvastada, kas meili kaudu sai levitada pahavara või pettust.`
      }
];

export default function DigiToenditeUurija3Leht() {
  const navigate = useNavigate();

  return (
    <div className="tutorial-page">
      {tutorialSections.map(sec => (
        <section key={sec.id} className="tutorial-section">
          <h2>{sec.title}</h2>
          <div className="tutorial-content">
            <ReactMarkdown>
              {sec.content.trim()}
            </ReactMarkdown>
          </div>
        </section>
      ))}
      <div className="tutorial-footer">
        <button onClick={() => navigate('/digi_toendite_uurija3')}>
          Alusta artifaktide sobitamist
        </button>
      </div>
    </div>
  );
}
