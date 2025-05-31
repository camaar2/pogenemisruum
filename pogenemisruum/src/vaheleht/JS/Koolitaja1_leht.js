import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on phishing?",
    content: `
Phishing on küberrünnakute vorm, kus ründaja saadab petliku sõnumi (nt e-kiri),
ettevõtes või platvormil, et meelitada kasutajat avaldama **isikuandmeid**, **paroole** 
või installima pahavara.
`
  },
  {
    id: 2,
    title: "Miks on paroolide korduvkasutamine ohtlik?",
    content: `
Kui sama parooliga on kaitstud mitu kontot, võib ühe konto kompromiteerimine 
anda ründajale ligipääsu kõigile kontodele. Soovitatav on kasutada **unikaalseid** 
ja **tugevaid** paroole iga teenuse jaoks.
`
  }
];

export default function Koolitaja1Leht() {
  const navigate = useNavigate();
  return (
    <div className="tutorial-page">
      {tutorialSections.map(sec => (
        <section key={sec.id} className="tutorial-section">
          <h2>{sec.title}</h2>
          <div className="tutorial-content">
            <ReactMarkdown>
              {sec.content.trim()}
            </ReactMarkdown>
          </div>
        </section>
      ))}
      <div className="tutorial-footer">
        <button onClick={() => navigate('/koolitaja1')}>
          Alusta teadmiste hindamist
        </button>
      </div>
    </div>
  );
}
