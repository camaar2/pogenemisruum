import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
{
    id: 1,
    title: "Mis on ründe ahel (Kill Chain)?",
    content: `
- • **Kill Chain** ehk ründe ahel on nagu samm-sammuline juhend, mida häkkerid kasutavad rünnaku tegemiseks.  
- • See algab eeltööst: häkker kogub infot sihtmärgi kohta (nt ettevõtte kohta veebis).  
- • Seejärel luuakse ligipääs, näiteks saadetakse e-kiri, mis paigaldab pahavara.  
- • Pärast seda levib pahavara laiemalt süsteemis (nt edasine failide nakatamine).  
- • Järgmisena püütakse saavutada eesmärk, näiteks varastada andmeid või hävitada olulisi faile.  
- • Viimasena püüab ründaja oma jälgi kustutada, et jääda avastamata.`
},
{
    id: 2,
    title: "Etappide kirjeldus",
    content: `
1. **Järeleluurimine**: häkker otsib ja kogub infot sihtmärgi kohta (näiteks ettevõtte andmed veebist).  
2. **Relvastamine**: valmistatakse ette pahavara või muud tööriistad, mida rünnakus kasutatakse (nt luuakse vajalikke skripte).  
3. **Levitamine**: saadetakse kahjulik kood sihtmärgile (näiteks e-kiri koos pahavaraga või nakatatud veebilingi jagamine).  
4. **Eksploitatsioon**: turvaaugu („haavatavuse“) ära kasutamine – antakse pahavarale võimalus süsteemi siseneda.  
5. **Paigaldamine**: pahavara installitakse sihtsüsteemi, et saada püsiv ligipääs (näiteks luuakse tagauks).  
6. **Käsklus ja juhtimine**: ründaja loob ühenduse nakatunud arvutitega, et anda neile täpsemaid käske (nt varastada faile või liikuda edasi teistesse süsteemidesse).  
7. **Eesmärkide täitmine**: pahavara teeb lõpuks seda, milleks see loodud on – näiteks varastab andmeid, krüpteerib faile lunaraha nõudmiseks või kahjustab süsteemi.`
    }
];

export default function KuberturbeOhuanaluutik4Leht() {
  const navigate = useNavigate();

  return (
    <div className="tutorial-page">
      {tutorialSections.map(sec => (
        <section key={sec.id} className="tutorial-section">
          <h2>{sec.title}</h2>
          <div className="tutorial-content">
            {}
            <ReactMarkdown>{sec.content}</ReactMarkdown>
          </div>
        </section>
      ))}
      <div className="tutorial-footer">
        <button onClick={() => navigate('/kuberturbe_ohuanaluutik4')}>
          Alusta kill chaini kokkupanemist
        </button>
      </div>
    </div>
  );
}