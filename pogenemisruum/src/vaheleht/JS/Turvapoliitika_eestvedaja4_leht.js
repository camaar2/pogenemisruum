import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
    {
      id: 1,
      title: "Andmekaitseameti teavitamine",
      content: `
  - **Andmekaitseamet** on Eesti riigiasutus, mis jälgib, et organisatsioonid hoiaksid inimeste isikuandmeid kaitstult.  
  - • Kui tekib isikuandmete lekkimine või rikkumine (näiteks keegi varastab või avaldab saladuslikke andmeid), tuleb sellest teatada andmekaitseametile 72 tunni jooksul.  
  - • Kui kirjakasti laekub saladuslik kiri, mida ei tohiks näha keegi teine, pead sellest kiirelt teatama Andmekaitseametile, et nad teaksid, mis juhtus ja saaksid aidata olukorda parandada.  
  - • See on kohustuslik: kui seda ei tehta, võib ettevõte saada trahvi või halvemal juhul kaotada inimeste usalduse.  
  - • Teavitamine näitab, et oled aus ja koostöövalmis – andmekaitseamet saab anda nõu, kuidas andmed uuesti turvaliseks teha.`
    },
    {
      id: 2,
      title: "Mõjutatud isikute informeerimine",
      content: `
  - • Kui isikuandmed (nt nimi, e-posti aadressid, isikukoodid) on lekkinud või sattunud valedesse kätesse, tuleb sellest teavitada kõiki inimesi, keda see puudutab.  
  - • Kujuta ette, et su nimel saadetakse valearved – sa ei tea, mis toimub. Kui ettevõte ütleb otse sulle “Hei, sinu andmed võisid lekkida”, saad ise kiiresti kontrollida ja vajadusel parooli muuta või panka teavitada.  
  - • Informeerimine võib toimuda e-kirjaga, SMS-iga või näiteks postiga, olenevalt sellest, mis on inimeste jaoks kõige kiirem ja turvalisem viis teavet saada.  
  - • See tagab läbipaistvuse: inimesed saavad teada, et nende kohta kogutud andmed on ohus, ning saavad kaitsemeetmeid rakendada (nt muuta paroole, jälgida pangakontot).  
  - • Kui kannatanutele ei räägita, võivad nad hiljem avastada andmepettuse ise ja tunda, et neid on petetud – see kahjustab ettevõtte mainet ja võib viia kohtuvaidlusteni.`
    },
    {
      id: 3,
      title: "Miks mitte eitada või varjata",
      content: `
  - • Kui olukorda varjata või öelda, et midagi ei juhtunud, kuigi tegelikult juhtus, kaotab organisatsioon inimeste usalduse.  
  - • Kui sõber varjab, et ta auto ära varastati, ja sa ei tea sellest, siis ei saa sa aidata või hoida teda edaspidi rohkem turvalisena. Kui aga varastamist varjatakse, siis võib juhtuda, et täpselt samas kohas varastatakse uuesti.  
  - • Eitamine või varjamine toob kaasa suurema õigusliku vastutuse – kui hiljem selgub, et andmeid on lekkinud ja sa sellest ei rääkinud, võivad trahvid olla kordades kõrgemad.  
  - • Lisaks kujundab see pikas perspektiivis usaldust: selgete ning ausate sammudega näitad, et hoolid klientide ja töötajate turvalisusest.  
  - • Kui juhtumeid varjata, võib see viia kohtuvaidlusteni, avaliku pahameeleni ja pikaajalise mainekahjuni.`
    }
  ];

export default function TurvapoliitikaEestvedaja4Leht() {
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
        <button onClick={() => navigate('/turvapoliitika_eestvedaja4')}>
          Alusta rikkumisele reageerimist
        </button>
      </div>
    </div>
  );
}
