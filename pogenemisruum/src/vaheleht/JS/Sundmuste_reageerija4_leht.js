import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
    {
      id: 1,
      title: "Hosti isoleerimine",
      content: `
  - **Hosti isoleerimine** tähendab nakatunud masina eraldamist võrgu segmentidest, et vältida pahavara või ründekäikude levikut teistele seadmetele.  
  - • Kujuta ette, et kui mõnes maja toas on plahvatus, pannakse see tuba eraldi kambrisse, et tuli ei saaks ülejäänud majja levida – sama tehakse nakatunud arvutiga, et kaitsta teisi seadmeid.  
  - • Isoleerimise sammud võivad hõlmata masina ühenduse katkestamist LAN-ist või WiFi-st ning viirusekahtluse korral operatsioonisüsteemi "vaike-režiimi" panemist.  
  - • Pärast isoleerimist saab turvameeskond uurida masinat ilma, et pahavara leviks edasi.`
    },
    {
      id: 2,
      title: "IP-aadressi blokeerimine",
      content: `
  - **Pahatahtliku IP-aadressi blokeerimine** tulemüüri või IDS/IPS reeglites peatab ründava liikluse ja takistab edasist juurdepääsu.  
  - • IP-aadress on arvuti “nimekaart” internetis – kui blokeerid pahatahtliku IP, on see nagu isikul tuppa astumise keelamine.  
  - • Seda saab teha tulemüüri reeglite lisamisega, kus märkad IP-aadressi, mis saadab kahtlast liiklust (nt liiga palju sisselogimiskatseid), ja ütled tulemüürile “ära lase sellelt aadressilt ühtegi paketti läbi”.  
  - • Nii peatad ründaja katse ja kaitsed teisi süsteeme, mitte ei lase pahavaral edasi liikuda.`
    },
    {
      id: 3,
      title: "Kasutajakontode kompromisside käsitlemine",
      content: `
  - **Kompromiteeritud kasutajakontode lukustamine** piirab volitamata ligipääsu, muutes vajalikuks parooli lähtestamise ja juurdepääsu kontrolli.  
  - • Kujuta ette, et keegi võtab sinu isikliku uksekaardi – sa ei taha, et ta selle kaardiga igale poole sisse pääseks, nii et sulged kaardi ja teed uue. Sama tehakse arvutikontoga.  
  - • Kui avastad, et mõne kasutaja konto andmed on lekkinud või keegi on sisse logitud ilma õigusteta, lukustad kontod, et ära hoida edasisi rünnakuid ja sunnid kasutajaid uute paroolide loomisele.  
  - • Pärast lukustamist kontrolli, kuidas konto kompromiteeriti (nt pahavara või andmeleke), ning lisa vajadusel täiendavad turvameetmed nagu 2FA (kahefaktoriline autentimine).`
    },
    {
      id: 4,
      title: "Süsteemide paroolipoliitika ajakohastamine",
      content: `
  - **Paroolide ajakohastamine** haavatavates süsteemides tagab, et varasemalt lekkinud andmed ei anna enam juurdepääsu kompromiteeritud seadmetele.  
  - • Kui kasutaja parool sai kellegi teise käes lekkida, ei tohiks ta selle parooliga enam juurde pääseda. Nii annad kõigile uued ja jõulisemad paroolid.  
  - • Seda tehakse, sundides kasutajaid paigutama uued paroolid, mis on piisavalt keerukad (vähemalt 8 tähemärki, suured ja väikesed tähed, numbrid, sümbolid) ja ei lange olemasoleva lekkeloendiga kokku.  
  - • Lisaks võib sundida kordumist: nõuda paroolivahetust iga 90 päeva järel, et piirata riski, kui kasutajad unustavad paroolid turvaliselt hoida.`
    },
    {
      id: 5,
      title: "Miks mitte kustutada logisid?",
      content: `
  - • Logifailide **kustutamine** kahjustab kohtuekspertiisi ja intsidendi analüüsi, mis on kriitiline juurpõhjuste tuvastamiseks.  
  - • Logid on nagu auto mustkast – kui need kustutad, ei saa enam teada, mis täpselt juhtus, ja ei saa vaadata, kes mida tegi ega millal.  
  - • Kui logid ära kaovad, ei saa turvameeskond kindlaks teha intsidendi algpõhjust (nt mis IP-aadress proovis sisselogida) ega koostada täpset ajajoont (millal ja mis süsteemides toimus).  
  - • Selle asemel peaksid logisid säilitama turvalises ja kirjutuskaitstud keskkonnas, tagades, et need on alles kuni analüüs on lõpule viidud.`
    },
    {
      id: 6,
      title: "Miks mitte taaskäivitada koheselt?",
      content: `
  - **Süsteemide kohene taaskäivitamine** võib kaotada mälust kogutavaid tõendeid, vajalik on esmalt koguda digitaalset tõendusmaterjali.  
  - • Kui vool läheb ära ja sa käivitad auto kohe uuesti, ei tea keegi, mis enne juhtus, sest info salvestusriistadest kaob. Sama juhtub arvutitega – kui lased re-bootida, kaovad olulised ajutised andmed.  
  - • Parim praktika on esmalt teha mälupildid (RAM dump) ja logide koopia enne taaskäivitust, et säilitada kogu info intsidendi kohta.  
  - • Alles pärast lahenduse leidmist ja tõendite kindlustamist saab turvaliselt süsteemi taaskäivitada ning rakendada parandusi.`
    }
  ]
  ;

export default function SundmusteReageerija4Leht() {
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
        <button onClick={() => navigate('/sundmuste_reageerija4')}>
          Alusta meetmete valimist
        </button>
      </div>
    </div>
  );
}
