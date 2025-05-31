import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on tulemüürireeglite seadistamine?",
    content: `
Tulemüürireeglite seadistamine on protsess, kus määratakse, milline võrguliiklus on lubatud
ja milline blokeeritud. Eesmärk on tagada nii turvalisus kui ka süsteemi töökindlus.
`
  },
  {
    id: 2,
    title: "Mis on HTTP ja HTTPS?",
    content: `
**HTTP (HyperText Transfer Protocol)** on veebilehtede andmevahetuse protokoll, mis liigub krüptimata sadamal 80.  
**HTTPS (HTTP Secure)** pakub krüpteeritud ühendust SSL/TLS abil sadamal 443, tagades andmete konfidentsiaalsuse ja terviklikkuse.
`
  },
  {
    id: 3,
    title: "Mis on SMTP (e-posti protokoll)?",
    content: `
**SMTP (Simple Mail Transfer Protocol)** on protokoll e-kirjade saatmiseks ja edastamiseks.  
Töötab tavaliselt sadamal 25 (vähe turvaline) või 587/465 krüpteeritud kanalina.
`
  },
  {
    id: 4,
    title: "Mis on DNS ja miks see oluline on?",
    content: `
**DNS (Domain Name System)** tõlgib domeeninimed (nt www.example.com) IP-aadressideks.  
Tavaliselt kasutatav sadamal 53 UDP või TCP. Õige DNS-i töötamine on kriitiline võrguühenduse jaoks.
`
  },
  {
    id: 5,
    title: "Mis on SSH ja Telnet?",
    content: `
**SSH (Secure Shell)** on krüpteeritud kaugjuurdepääsu protokoll, mis töötab sadamal 22.  
**Telnet** on vana kaugjuurdepääsu protokoll, mis edastab andmed tekstina sadamal 23, ilma krüpteerimiseta.
`
  },
  {
    id: 6,
    title: "Mis on FTP?",
    content: `
**FTP (File Transfer Protocol)** on failiedastusprotokoll, mis töötab sadamal 21 ja 20.  
Edastab andmeid ilma krüpteerimiseta, seega sageli asendatud SFTP-ga.
`
  }
];

export default function InfoturbeJuht1Leht() {
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
        <button onClick={() => navigate('/infoturbe_juht1')}>
          Alusta tulemüüri seadistamist
        </button>
      </div>
    </div>
  );
}