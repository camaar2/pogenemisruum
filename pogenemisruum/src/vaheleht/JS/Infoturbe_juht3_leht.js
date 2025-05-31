import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
{
    id: 1,
    title: "Saatja domeeni kontrollimine",
    content: `
- **Saatja domeen** on see osa e-posti aadressist, mis tuleb “@” märgist pärast (nt “@amazon.com”).  
- • Kui saad e-kirja, vaata, millise veebisaidi nimel see on saadetud—see on nagu saaja “meiliasukoht”.  
- • Ametlikud ettevõtted kasutavad alati oma õiget domeeni (nt **@amazon.com**, **@google.com**).  
- • Kui näed sarnast, kuid veidi muutunud nime (nt **amazzon.com**, **@goog1e.com**), viitab see tõenäoliselt petuskeemile.  
- • Lihtne proovimine: kopeeri see väike domeeniosa brauseri aadressiribale ja vaata, kas see viib õigele veebilehele või hoopis millelegi muule.`
},
{
    id: 2,
    title: "Sõnumi sisu ja toon",
    content: `
- • Kahtlased e-kirjad püüavad sind tihti kiirustada või hirmutada. Näiteks:  
- **"Kinnitage 24 tunni jooksul"** tähendab: tee kiiresti, muidu juhtub midagi halba.  
- **"Vastasel juhul peatame konto"** püüab panna sind uskuma, et sinu konto lukustatakse kohe, kui sa ei tegutse.  
- • Tõelised teavitused annavad faktid ilma hirmutamiseta—need ütlevad näiteks “Meil on uuendus” või “Palun logi turvaliselt sisse”, aga ei kasuta ähvardust.  
- • Kui kirjas on palju hüüumärke, kiireloomulist tooni või hirmutavaid lauseid, siis tõenäoliselt on see petukiri.`
},
{
    id: 3,
    title: "Linkide ja manusfailide kontroll",
    content: `
- **Kahtlad lingid** e-kirjas võivad viia sattuma võltsitud veebisaidile, mis näeb välja nagu tõeline.  
- • Kui näed koodi või veidrat aadressi (nt “http://bit.ly/xxxxx” või “http://secure-bank.example”), ära klõpsa, vaid ava oma brauseris otse panga ametlik aadress (nt https://www.bank.ee).  
- **Manused** (nt .exe, .zip, .docx) võivad sisaldada pahavara, mis paigaldub, kui failid avad.  
- Manuste kontrollimiseks:  
-    1. Kui e-posti server hoiatab, et manus on suure riskiga, ära ava kohe.  
-    2. Kui fail on .exe, .scr või .bat, on see eriti ohtlik – püüab käivitada programmi.  
-    3. Kasuta turvatarkvara (viirusetõrje), et esmalt skaneerida faili enne avamist.  
- • Kui sa pole kindel, küsi selle saatjalt eraldi (telefonitsi või ametlikult veebisaidilt), kas nad tõesti selle faili saatsid.`
},
{
    id: 4,
    title: "Vihjete kasutamine",
    content: `
- • Paljud e-posti rakendused ja veebisaitide turvatööriistad pakuvad **“Vihje” nuppu** või “Report phishing” võimalust.  
- • See on nagu sinine info- või turvanool, mille vajutamisel saad rohkem teada, miks rakendus kahtlustab, et kiri võib olla pahatahtlik.  
- • Kui sa ei ole kindel, kas kiri on turvaline, kasuta seda nuppu:  
-    1. Rakendus näitab, millised omadused (domeen, lingid, manusfailid) tekitavad kahtlusi.  
-    2. Samuti saad saata teate turvatiimile, et nad saaksid uurida, kas tegemist on tõelise teate või pettusega.  
- • Kui kasutad “Vihje” nuppu, õpid samm-sammult ära, mida jälgida ja miks just need märgid on olulised.`
}
];

export default function InfoturbeJuht3Leht() {
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
        <button onClick={() => navigate('/infoturbe_juht3')}>
          Alusta andmepüügi tuvastamist
        </button>
      </div>
    </div>
  );
}
