import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on õngituskirja indikaatorid?",
    content: `
Õngituskirja indikaatorid on nähtused ja elemendid, mis viitavad pettusele,
näiteks **kahtlased lingid** või **ebatavalised faililaiendid**.
`
  },
  {
    id: 2,
    title: "Kahtlased lingid ja domeenid",
    content: `
- Kahtlased lingid (nt \`verify-you.zz\`)  
- Vale domeenid, mis varjavad tegelikku sihtlehte  
`
  },
  {
    id: 3,
    title: "Safe elemendid",
    content: `
Turvaliste kirjade tunnused on:
1. Õiged domeenid (nt **@officialbank.com**)  
2. Tavapärased manusfailid (PDF, pilt)  
3. Isiklik, kontekstipõhine sõnum (“Tere, John!”)  
`
  }
];

export default function Koolitaja4Leht() {
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
        <button onClick={() => navigate('/koolitaja4')}>
          Alusta indikaatorite hindamist
        </button>
      </div>
    </div>
  );
}
