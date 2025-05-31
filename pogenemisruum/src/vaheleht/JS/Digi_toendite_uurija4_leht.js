import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
    {
        id: 1,
        title: "Mis on krüpteeritud USB-mälupulk?",
        content: `
    - **Krüpteeritud USB-mälupulk** on väike mäluseade (nagu väline kõvaketas, aga mahub taskusse), mis muudab sinu failid loetamatuks ilma õige parooli või võtmeta.  
    - **Miks see oluline on?** Kujuta ette, et kaotad USB-mälupulga. Kui see pole krüpteeritud, võib leidja faile avada. Krüpteeritud mälupulgaga on sisu kaitstud nii, et keegi ei saa ilma paroolita faile lugeda.  
    - **Forenseerimisel** kasutatakse seda nii, et uurija saab sellega transportida või hoida olulisi tõendeid (nt logifaile, dokumente), olles kindel, et keegi ei saa neid enne analüüsi muuta või lugeda.  
    - • Kui USB on krüpteeritud, on kõik failid krüptitud kujul. Ainult uurija, kellel on õige võti, saab need lahti pakkida ja näha algandmeid.`
      },
      {
        id: 2,
        title: "Mida annab pahavara näidis?",
        content: `
    - **Pahavara näidis** on väike prooviversioon pahatahtlikust programmist, mida kasutatakse turvalises keskkonnas testimiseks.  
    - **Miks seda vaja on?** Kui uurija leiab pahavara (näiteks tarkvaras varjatud viiruse), saab ta selle koopia panna eraldi arvutisse või virtuaalmassiivi, et testida, kuidas see käitub, ilma et ohustaks teisi arvuteid.  
    - **Mida testitakse?** Uurija käivitab pahavara eraldi sandbox-keskkonnas ja vaatab:  
            - Kuidas pahavara võrku ühendub (kelle serverisse ta saadab andmeid).  
            - Milliseid faile ta loob või kustutab.  
            - Kas ta üritab krüpteerida sinu andmeid (nagu lunavara).  
    - • **IOC-id (Indicators of Compromise)** on väiksed tõendid ehk märgid, mis näitavad, et süsteemis on pahavara. Näiteks:  
            - Failinimed, mida pahavara loob (nt “evil.exe”).  
            - Samuti IP-aadressid või domeenid, millele pahavara proovib ühenduda.  
            - Kui uurija saab need IOC-id teada, saab neid kasutada teiste arvutite kaitseks, et kohe üles märkida kõiki samu märke.`
      },
      {
        id: 3,
        title: "Miks on süsteemilogifailid kriitilised?",
        content: `
    - **Süsteemilogid** on nagu arvuti päevik, kuhu salvestatakse kõik olulised sündmused:  
      - Millal keegi sisse logib.  
      - Millal programm jookseb kokku või tekib viga.  
      - Millal faile kopeeritakse või kustutatakse.  
    - **Logifailide ajatemplitest** (kuupäev ja kellaaeg) saab uurija teada, täpselt millal ja mis järjestuses sündmused aset leidsid.  
    - **Miks see oluline on?** Kujuta ette, et arvutil on turvarike ja keegi varastas andmeid. Uurija vaatab logisid, et näha:  
            - Millal keegi arvutisse sisenes.  
            - Millal põletati faile või üritati andmebaasi muuta.  
            - Kas logides paistab, et keegi üritas mitu korda vale parooliga sisse logida.  
    - • **Logifailid ei muutu** ajaloo jooksul – need jäävad alles nagu ajalugu. Seetõttu saab uurija otsustada, mis päeval mis juhtus, ja koostada täpse sündmustevoo.`
      },
      {
        id: 4,
        title: "Võrgupaketijäädvustus (PCAP)?",
        content: `
    - **Võrgupaketijäädvustus (PCAP)** tähistab ühendatud võrguliikluse salvestamist bititasandil ehk kõige madalamal vormil.  
    - **Mis on pakett?** Iga kord, kui sa veebilehte laed, jaguneb sinu info väikesteks tükkideks (pakettideks). PCAP salvestab need täpsed tükkide andmed:  
            - Mis IP-aadressilt pakett tuli.  
            - Mis IP-aadressile see läks.  
            - Mis andmed paketi sees on (nt veebisaidi sisu või failiosa).  
    - **Miks see oluline on?** Uurija saab hiljem PCAP-faili analüüsida ja näha, kas rünnak toimus, milliseid protokolle kasutati ja kas pahatahtlikud paketid liikusid (nt trooja serveriga suhtlemiseks).  
    - • **Praktiline näide:** kui häkker saadab pahavara sinu kasutajasse, on osa sellest liiklusest salvestatud PCAP-failis. Uurija võib vaadata, kuidas pahavara “küsis käske” ja kust ning kui kaugele serverisse andmeid saatis.`
      },
      {
        id: 5,
        title: "Forenseeriline kettakujutis",
        content: `
    - **Forenseeriline kettakujutis** on bititasandiline täpne koopia arvuti kõvakettast või mäluseadmest (näiteks USB-kettast).  
    - **Miks ei tohi võtta originaali?** Originaal võib olla kasutamise ajal muutunud (faili kirjutamine, kustutamine). Forenseerilise klooniga (ketakujutisega) tagame, et originaal jääb puutumata.  
    - • **Kuidas see töötab?**  
            - Ühendad originaalseadme arvutiga write-blocker-iga (seade, mis lubab ainult lugeda, mitte kirjutada).  
            - Loed andmed täpselt samas järjekorras clusteritest (failing, sektoritelt jne), kuni kogu seade on kopeeritud.  
            - Arvutad kontrollsumma ehk hashi (näiteks SHA-256), mis on nagu unikaalne “sõrmejälg” ketakujutise ja originaalseadme kohta. Kui need kokku vastavad, teame, et kloon on täpne koopia ja pole muudetud.  
    - • **Miks see oluline on?** Forensiline kloon võimaldab uurijal töötada koopiaga (analüüsida faile, otsida pahavara, vaadata kustutatud faile), samal ajal originaal jääb puutumata ja on võimalik näidata, et tõendid on säilitatud õigesti.`
      }
];

export default function DigiToenditeUurija4Leht() {
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
        <button onClick={() => navigate('/digi_toendite_uurija4')}>
          Alusta mälumängu
        </button>
      </div>
    </div>
  );
}
