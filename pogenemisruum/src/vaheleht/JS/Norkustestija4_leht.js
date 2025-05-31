import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
{
    id: 1,
    title: "Mis on Caesari šifr?",
    content: `
- **Caesari šifr** on väga lihtne viis teksti varjamiseks, kus iga täht asendatakse mõne teise tähega, mis on nihutatud ette või taha.  
- • Kujuta ette tähestikku kui ringi (A–Z), kus “A” on algus ja “Z” lõpp. Nihe = 3 tähendab, et liigume iga tähe puhul tähestikus kolme sammu edasi (nt A → D, B → E).  
- • Näiteks kui meil on sõna “KASS” ja nihe = 2, siis “K” muutub “M”-ks, “A” muutub “C”-ks jne. Tulemuseks on “MCUU”.  
- • See on nagu saladussõna, kus sa ütled, et iga täht peab nihkuma tähed edasi - see teeb teksti mõistmise ilma õige nihketa võimatuks.`
},
{
    id: 2,
    title: "Näide krüpteerimisest",
    content: `
- Algtekst: **"HELLO"**  
- Nihe = 3 (see tähendab, et iga tähe ASCII-kood või tähestiku indeks kasvab +3 võrra).  
- Täht “H” on tähestikus 8. kohal (A=1, B=2 jne). Kui lisada 3, saame 11. kohal oleva tähe “K”.  
- Täht “E” on 5. kohal; +3 = 8. kohal on “H”.  
- Nii edasi: “L” (12. kohal) +3 = “O” (15. kohal), teine “L” +3 = “O” ja “O” (15. kohal) +3 = “R” (18. kohal).  
- Tulemuseks: **"KHOOR"**  
- Võta iga täht ja loe tähestikus edasi kolm sammu (või liida ASCII-koodile 3), et saada varjatud tekst.`
},
{
    id: 3,
    title: "Šifri lahtimurdmine",
    content: `
- • Šifri lahtimurdmiseks (dešifreerimiseks) tehakse sama nihe, aga tagurpidi: nihe rakendatakse negatiivselt.  
- • Näiteks kui krüpteeritud sõnas on “K” ja nihe oli +3, siis lahendamiseks arvuta “K” (11. koht tähestikus) − 3 = 8. koht = “H”.  
- • Sama kehtib ASCII-koodiga: kui “K” on kood 75, siis −3 = 72, mis on “H”.  
- • Kui krüpteeritud tekst on “KHOOR” ja tead, et nihe oli 3, siis liigu iga tähe puhul tähestikus kolm sammu tagasi, et saada “HELLO”.`
},
{
    id: 4,
    title: "Antud ülesandes",
    content: `
- Antud sõnum: **Ymnx nx f hfjxywj gt4~**  
- • Me ei tea kohe, mis nihe täpselt on, aga proovime erinevaid väärtusi (nt 1, 2, 3, ... kuni 25), kuni teksti selgelt loeme.    
- • Lihtne viis testida: kirjuta paberile tähestik (A–Z) ja proovi nihutada eri tähtede asukohti tagasi, kuni saad selge sõnumi.`
    }
];

export default function Norkustestija4Leht() {
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
        <button onClick={() => navigate('/norkustestija4')}>
          Alusta šifri lahtimurdmist
        </button>
      </div>
    </div>
  );
}
