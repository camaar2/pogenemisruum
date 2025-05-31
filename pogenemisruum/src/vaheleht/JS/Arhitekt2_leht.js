import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Paroolivahetus standardid",
    content: `
Paroolivahetus iga **90 päeva** tagant on tavaline turbetavasoovitus, et vähendada
**brute-force** rünnakute mõju. Liiga pikk intervall (nt **10 aastat**) on ebapiisav.
`
  },
  {
    id: 2,
    title: "Andmete krüpteerimine",
    content: `
Tundlike andmete krüpteerimine **AES-256**-ga tagab tugeva kaitse andmepraegude vastu.
Laiatarbeks on **AES-256** kõige laialdasemalt aktsepteeritud standard.
`
  },
  {
    id: 3,
    title: "Mitmetasemeline ligipääsusüsteem",
    content: `
Ligipääsu restriktsioonid põhinevad **kasutajarollidel** ja **turbelubadel**, vähendades
riskikandjate haaret, kui üks konto kompromiteeritakse.
`
  },
  {
    id: 4,
    title: "Kaksikautentimine administraatori kontodel",
    content: `
Kaheastmeline või **multifaktoriline autentimine (MFA)** administratiivkontodel
lisab täiendava turvakihi ja vähendab paroolirünnakute edu tõenäosust.
`
  },
  {
    id: 5,
    title: "Turvaprotokollide täiendav krüpteerimine",
    content: `
Protokollide (nt **TLS**) täiendav konfiguratsioon ja tugevad **krüptosuvandid** (nt
**ECDHE**, **AES-GCM**) tagavad andmete konfidentsiaalsuse ja terviklikkuse.
`
  },
  {
    id: 6,
    title: "Mida vältida?",
    content: `
- **Paroolivahetus iga 10 aasta tagant** on ebapiisav.
- **Tarkvarauuenduste vältimine** nõrgestab turvasüsteeme.
- **Võrguliikluse filtreerimise puudumine** suurendab ründevektoreid.
`
  }
];

export default function Arhitekt2Leht() {
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
        <button onClick={() => navigate('/arhitekt2')}>
          Alusta standardite jaotamist
        </button>
      </div>
    </div>
  );
}