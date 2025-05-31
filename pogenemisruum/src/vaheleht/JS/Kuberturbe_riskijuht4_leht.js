import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
    {
      id: 1,
      title: "IP blokeerimine tulemüüris",
      content: `
  - **IP-aadressi blokeerimine** tulemüüri reeglites on esimene samm operatiivses reageerimises.  
    - Kujuta ette, et ütled enda maja ees igale autole, mis kannab vale numbritahvlit, et ärgu pöördugu sinu tänavale – tulemüür teeb sama arvutis: ta peatab pahavara, mis tuleb teatud IP-lt.  
  - • See peatab pahavara ühendused ja annab aega olukorra hindamiseks.  
    - Näide: kui näed, et mingi arvuti proovib uuesti ja uuesti sinu serverisse sisse logida, saad tulemüüri kaudu keelata selle konkreetse IP-aadressi, nii et ta ei pääse enam ligi.  
  - • Mida edasi teha?  
    1. Kontrolli logisid, et näha, millal ja kui palju see IP proovib ühendust luua.  
    2. Kui oled kindel, et see on pahatahtlik, jäta IP blokeerituks seni, kuni uurimine lõpeb.  
    3. Kui hiljem selgub, et IP oli ekslikult blokeeritud (näiteks sinu enda testmasin), eemalda see blokeering.`
    },
    {
      id: 2,
      title: "Teavitamine ja eskaleerimine",
      content: `
  - Pärast blokeerimist **teavita turvameeskonda** ja eskaleeri juhtum vastavalt protseduuridele.  
    - See on nagu olukord kui su maja välisvalvur peatab kahtlase mehe tänaval, ta helistab kohe politseisse ja annab neile loa olukorda lähivaatuses hinnata.  
  - • **Eskaleerimine** tähendab, et saadad info edasi järgmisele tasandile:  
    1. Rünne on tuvastanud ja edastatud analüütikutele (operatiivtiim)  
    2. Kui see on keerulisem intsident, kaasatakse turvajuhid või IT-juht.  
  - • Koostöös saab analüütik uurida rünnet süvitsi:  
    - Analüütik kontrollib, kas blokeeritud IP püüdis ligipääsu mitmesse erinevasse süsteemi.  
    - Vajadusel vaadatakse läbi pahavara näidis või logid, et aru saada, kust rünnak pärineb.  
  - • Miks see oluline on?  
    - Kui lihtsalt blokeerid IP ja unustad, võib sama rünnak teise IP kaudu uuesti alata.  
    - Korrapärane teavitus ja eskaleerimine tagavad, et kogu turvatiim teab, mis toimub, ja saab rakendada täiendavaid kaitsemeetmeid.`
    },
    {
      id: 3,
      title: "Miks mitte serveri taaskäivitus?",
      content: `
  - • Serveri **taaskäivitamine** võib ajutiselt peatada rünnaku, kuid ei lahenda juurpõhjust (sellega ei summuta maavärina allikat).  
    - Kui su toas puhkes tuli ja sa katkestad voolu, võib leek lakata korraks, kuid probleem endiselt põleb seina taga – taaskäivitus ei kustuta põlemise põhjust, vaid ainult nähtava tule.  
  - • Rünnaku juurpõhjus võib olla:  
    1. Pahavara elav protsess mälu sees (RAM), mis laadib end automaatselt pärast taaskäivitust uuesti.  
    2. Põhitegiurünnaku serveris (nt haavatavus tarkvaras), mis laseb ründajal tagasi tulla.  
  - • Mida teha selle asemel?  
    1. Korja esmalt digitaalne tõendusmaterjal (logifailid, mälu koopia), enne kui süsteemi seisu muudad.  
    2. Rakenda sobivad turvameetmed (nt haavatavuste parandus).  
    3. Seejärel, kui oled juurpõhjuse teada saanud, saab vajadusel turvaliselt taaskäivitada, veendumaks, et uued turvakonfiguratsioonid jõustuvad. `
    },
    {
      id: 4,
      title: "Ebakohane radikaalsus",
      content: `
  - • **Kõigi ühenduste sulgemine** ja süsteemi täielik lammutamine on ülemäära radikaalne meetod, mis võib viia ettevõtte teenuste kättesaadavuse languseni (nagu sulgeksid hotelli kõik uksed, et peatada varas, see on augu kaevamine – ei tohi teha kõike korraga, sest ka tavalised külalised ei saa sisse).  
    - Algajale selgitus: kujuta ette, et kui keegi tekitab maja taga väikse segaduse, ei hakka sa kogu maja lammutama, vaid paned kokku kiirelt ühekordse plaadi uksele ja uurid seejärel põhjalikumalt, mis juhtus.  
  - • Proportsionaalsed meetmed on:  
    1. Blokeerid kahtlase liikluse (IP või port).  
    2. Uurida juurpõhjus (logid, pahavara analüüs) ja rakendada kohest korrektset turvaparandust (plaastrid).  
    3. Hoida ülejäänud teenused töös, nii et kliendid või kasutajad ei kannataks (kui tõrge puudutab ainult ühte rakendust, lahka vaid seda osa, mitte kogu masinat).  
  - • Eesmärk on **säilitada teenuste kättesaadavus** ning **valida sobivad meetmed vastavad olukorrale**: liiga radikaalsed sammud võivad põhjustada tarbetuid katkestusi ja lisariske.`
    }
  ]
  ;

export default function KuberturbeRiskijuht4Leht() {
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
        <button onClick={() => navigate('/kuberturbe_riskijuht4')}>
          Alusta operatiivset reageerimist
        </button>
      </div>
    </div>
  );
}
