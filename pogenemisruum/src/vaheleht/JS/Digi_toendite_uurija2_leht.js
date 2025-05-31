import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
{
    id: 1,
    title: "Mis on logianomaaliate tuvastamine?",
    content: `
- **Logid** on nagu ajakirja lehed, kuhu arvutisüsteem salvestab kõik tegevused (näiteks kasutaja sisselogimine või failide avamine).  
- • **Logianomaaliate tuvastamine** tähendab, et käime neid logisid läbi, et leida ebatavalisi või kahtlasi kirjeid (näiteks mitu ebaõnnestunud sisselogimist järjest või ootamatult suur andmeedastus).  
- • Kujuta ette, et loed päevikut ja otsid sealt märke, et midagi imelikku juhtus (nt keegi proovis mitu korda vale parooliga sisse logida).`
},
{
    id: 2,
    title: "ERROR vs WARNING tasemed",
    content: `
- • **ERROR** (viga) tähistab tõsist probleemi, mis võib peatada osa süsteemist või põhjustada andmekadu (näiteks programm kukkus kokku või ei suutnud olulist faili avada).  
- • **WARNING** (hoiatus) hoiatab, et midagi on ebatavaline, kuid süsteem suudab ikkagi töötada (näiteks ketas hakkab täis saama või mõni teenus on aeglasem).  
- • Kui logis on näiteks \`ERROR: fail.txt ei avane\`, tähendab see, et konkreetne funktsioon ei tööta; kui on \`WARNING: ketas on 90% täis\`, hoiatatakse, et on aeg ketast tühjendada, enne kui tekib suurem probleem.`
},
{
    id: 3,
    title: "Miks mitte kõik INFO tasemel read?",
    content: `
- **INFO** kirjeldab lihtsalt tavapäraseid tegevusi (näiteks “süsteem käivitus kell 08:00” või “andmebaas salvestas kirje edukalt”).  
- • **INFO** ei pruugi sisaldada tähiseid, mis viitavad turvaohtudele, sest need on normaalsed ja oodatud toimingud.  
- • Kujuta ette, et INFO on nagu “täna jõin kohvi” – see ei ütle, et midagi ohtlikku juhtub; WARNING ja ERROR on nagu “kohv oli halva maitsega” või “Mul hakkas kõht valutama peale kohvi tarbimist” – need märgid vajavad tähelepanu.`
},
{
    id: 4,
    title: "Kuidas käsitleda valepositiive ja puuduvaid anomaaliaid?",
    content: `
- **Valepositiivsed** read on hetked, kus süsteem teeb murekõne (“anaomaalia”), aga tegelikult on kõik korras (nt kasutaja proovis suvaliselt vale parooliga mitu korda järjest, kuid ei ole ründaja).  
- **Puuduvad anomaaliad** (missed) on olukorrad, kus oluline hoiatus jäi logidest märkamata (nt keegi sisselukustas palju juhtumeid, aga süsteem ei andnud mingit hoiatust).  
- • Pärast igat kontrolli tuleb üle vaadata, miks tuli valepositiiv või miks mõni oluline teade jäi märkamata, ning täiendada reegleid (nt tõsta hoiatustaseme künnist või lisada uusi mustreid).  
- • Kui kood ütleb “hoiatuse viga” liiga sageli (valepositiiv), siis inimesed ei võta seda tõsiselt; kui ei ütle “hoiatuse viga” kohe, kui midagi ohtlikku juhtus (missed), siis turvalisus ei tööta õigesti.`
}
];

export default function DigiToenditeUurija2Leht() {
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
        <button onClick={() => navigate('/digi_toendite_uurija2')}>
          Alusta logianomaaliate tuvastamist
        </button>
      </div>
    </div>
  );
}
