import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Video õppevorm",
    content: `
**Video** on visuaalne ja meelelahutuslik viis kontoritöötajatele uusi turvalahendusi tutvustada.
Praktilised demosalvestused ja samm-sammult juhised hoiavad tähelepanu.
`
  },
  {
    id: 2,
    title: "Interaktiivne test",
    content: `
**Interaktiivne test** annab tagasisidet koheselt ja motiveerib töötajaid rakendama uusi õpitõdesid.
See aitab kinnistada teadmisi läbi praktiliste ülesannete.
`
  },
  {
    id: 3,
    title: "Pikk tehniline tekst",
    content: `
**Pikk tehniline tekst** sobib sügavama uurimistöö jaoks, kuid võib olla rutiinsete
kontoritöötajate jaoks liiga mahukas ja keeruline.
Parem on kombineerida lühikesi, põnevaid vorme.
`
  }
];

export default function Koolitaja2Leht() {
  const navigate = useNavigate();

  return (
    <div className="tutorial-page">
      {tutorialSections.map(sec => (
        <section key={sec.id} className="tutorial-section">
          <h2>{sec.title}</h2>
          <div className="tutorial-content">
            <ReactMarkdown>{sec.content.trim()}</ReactMarkdown>
          </div>
        </section>
      ))}
      <div className="tutorial-footer">
        <button onClick={() => navigate('/koolitaja2')}>
          Alusta materjalide valimist
        </button>
      </div>
    </div>
  );
}