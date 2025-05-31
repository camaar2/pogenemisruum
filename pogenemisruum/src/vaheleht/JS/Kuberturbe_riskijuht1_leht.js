import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Miks on serveri algseadistus oluline?",
    content: `
Turvaline algseadistus kaitseb teenuseid ja andmeid rünnakute eest. Õigete
parameetrite valimine aitab vältida loata juurdepääsu ja vähendab ründevektoreid.
`
  },
  {
    id: 2,
    title: "Miks mitte luua root-kasutajat ilma paroolita?",
    content: `
Root-kasutaja on kõrgeim privileegidega konto. **Paroolita juurdepääs** lubab kergesti
administreerimist ja ründamise riski.
`
  },
  {
    id: 3,
    title: "Administraatorikonto tugeva parooliga",
    content: `
**Tugev parool** vähendab brute-force rünnakute tõenäosust. Parool peaks olema:
- piisavalt pikk (≥12 märki)
- sisaldama suurtähti, väiketähti, numbreid ja erimärke
`
  },
  {
    id: 4,
    title: "SSH võtmetega autentimine",
    content: `
SSH võtmetega autentimine on turvalisem kui paroolipõhine, sest võtmed on raskemini
kompromiteeritavad ja pakuvad **krüptograafilist kaitset**.
`
  },
  {
    id: 5,
    title: "Miks mitte jätta port 22 avatud ilma piiranguteta?",
    content: `
Port 22 on SSH standardport. Kui lubada ligipääs kõikjalt, suureneb brute-force
tõenäosus. Kasuta:
1. IP-põhiseid piiranguid  
2. Kahefaktorilist autentimist  
3. Logide monitooringut  
`
  }
];

export default function KuberturbeRiskijuht1Leht() {
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
        <button onClick={() => navigate('/kuberturbe_riskijuht1')}>
          Alusta serveri seadistamist
        </button>
      </div>
    </div>
  );
}
