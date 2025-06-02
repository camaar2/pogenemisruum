import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
    {
      id: 1,
      title: "Mis on intsidendi prioriseerimine?",
      content: `
  - **Intsidentide prioriseerimine** on protsess, kus hinnatakse turvaohtude või intsidentide kriitilisust, määrates, millised olukorrad nõuavad **viivitamatut reageerimist**.  
  - • Kui tekib rünnak või turvarisk, peab kohe otsustama, kas see on nii tõsine, et tuleb kohe tegutseda (näiteks süsteemi lukustamine või teenuse peatamine), või saab sellega tegeleda jooksvalt hiljem.  
  - • Prioriseerimine aitab meeskonnal ressursse õigesti jaotada, et kõige kriitilisemad probleemid lahendada esimesena.  
  - • Näiteks: kui mingisse serverisse on tungitud ja selle kaudu varastatakse andmeid, on see kõrge prioriteediga intsident; kui avastatakse lihtsalt kahtlane logi sõnum, võib selle prioriteet olla madalam.`
    },
    {
      id: 2,
      title: "Miks on massiline andmeleke kriitiline?",
      content: `
  - **Massiline andmeleke** tähendab olukorda, kus avalikustuvad tuhanded või miljonid inimeste isikuandmed (nt e-kirjad, paroolid, kontaktandmed).  
  - See on äärmiselt kriitiline, sest:  
  -    – **Rahakahju risk** suureneb: ettevõtet või organisatsiooni võib kalli kohtu- või hüvitusnõude tõttu kimbutada suur rahaline sanktsioon.  
  -    – **Mainekahju risk** tõuseb: kliendid ja partnerid võivad kaotada usalduse ning lahkuda, sest nende andmeid ei kaitstud piisavalt hästi.  
  - • Kujuta ette, et pangas varastatakse kõigi klientide kontonumbrid ja võlad – see tekitab tohutut paanikat ja finantsilisi tagajärgi. Samamoodi tekib massilise andmeleke korral suur kriis, mida tuleb esmajärjekorras lahendada.  
  - • Seega klassifitseeritakse massiline andmeleke kõrge prioriteediga, et võtta kasutusele kiiremad meetmed andmekao piiramiseks ja kahjude minimeerimiseks.`
    },
    {
      id: 3,
      title: "Ründegrupi tegevus rahvusvahelisel tasandil",
      content: `
  -  **APT-grupp (Advanced Persistent Threat)** on rühmitus, kes tegeleb sihitud ja pikaajaliste küberrünnakutega, sageli rahvusvahelisel tasandil.  
  - • Sellise grupi sihtmärgiks võivad olla valitsusasutused, suured ettevõtted või kriitilised infrastruktuurid.  
  - **Kõrge reageerimise prioriteet**: kuna APT-gruppidel on ressursid ja oskused, et uurida haavatavusi, püsida süsteemis peidus ja varastada olulisemat infot, on vaja kohest ja laiaulatuslikku reageerimist, kaasates eri riikide turvameeskonnad ja eksperdid.  
  - • Kui häkkerid ühest riigist üritavad rünnata teise riigi olulisi süsteeme (näiteks elektrijaamasid või valitsuse servereid), tuleb see juhtum kõrgeimal tasemel käsitleda, et tagada kiire tegutsemine ja rahvusvaheline koostöö.  
  - • Sarnaste rünnakute ennetamiseks on tähtis jagada infot teiste riikide ja organisatsioonidega.`
    },
    {
      id: 4,
      title: "Tsentraliseeritud serveri rünnak",
      content: `
  - **Tsentraliseeritud server** on server, kus hoitakse paljusid andmeid või pakutakse teenuseid korraga paljudele kasutajatele.  
  - • Kui selle serveri vastu suunatakse rünnak (näiteks DDoS-rünnak või pahavarasisestus), võib kannatada paljude klientide või töötajate töö.  
  - **Ohustab ärikriitiliste komponentide kättesaadavust**: teenused võivad hävineda või muutuda väga aeglaseks, mis võib ettevõttele tuua suure tulu- ja usalduse kaotuse.  
  - • Kujuta ette, et korraga peatub kõigi internetipanga kasutajate ligipääs sissetungi tõttu – siis ei saa keegi makseid teha ega kontot hallata, mis on suur probleem.  
  - • Selliseid rünnakuid käsitletakse kõrge prioriteediga, et taastada teenuse töö ja minimeerida majanduslikku kahju.`
    },
    {
      id: 5,
      title: "Siseministeeriumi infosüsteemi rünnak",
      content: `
  - **Riigiasutuste infosüsteemid** (nagu Siseministeeriumi omad) hoiavad tundlikku ja eriti olulist infot (nt kodanike registrid, turbeinfo).  
  - • Kui sellise riigi infosüsteemi vastu suunatakse rünnak, on see automaatselt kõrgeim prioriteet, sest võib kahjustada **riiklikku julgeolekut** ja rahvatervist.  
  - **Automaatne prioriteet**: riiklike süsteemide rikkumine nõuab kiiret tegutsemist, kaasates eri asutused, politsei ja julgeolekuagentuurid, et jälitada ründeallikaid ja taastada andmete terviklikkus.  
  - • Kui keegi häkkeritena siseneb süsteemi, kus hoitakse passide andmeid või politsei juhtumeid, võib see viia ohtlike olukordadeni (nt valeidentiteedid, vargused). Sellisel juhul tuleb reageerida viivitamatult, et hoida ära suuremad katastroofid.  
  - • Selline intsident nõuab kohe valmis meeskonna kaasamist ja rahvusvahelist koostööd, kui ründaja on välisriigis asuv grupeering.`
    }
  ];

export default function SundmusteReageerija1Leht() {
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
        <button onClick={() => navigate('/sundmuste_reageerija1')}>
          Alusta prioritiseerimist
        </button>
      </div>
    </div>
  );
}
