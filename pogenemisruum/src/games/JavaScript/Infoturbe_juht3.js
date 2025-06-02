import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Infoturbe_juht3.css';

const initialEmails = [
  {
    id: 1,
    sender: "security@swedbank.ee",
    subject: "Kontohoiatus: kinnitage oma kontoandmed",
    content:
      "Lugupeetud klient! Oleme tuvastanud kahtlast aktiivsust teie kontol.\n" +
      "Palun logige 24 tunni jooksul sisse ja kinnitage oma andmed, et vältida juurdepääsu peatamist.",
    hint:
      "Saatja domeen on swedbank.ee – ametlik Swedbanki domeen. Kiri ei sisalda kahtlaseid linke.",
    explanation:
      "Saatja on tõepoolest Swedbank ja sõnum ei nõua kiiret tegutsemist turvariski tõttu. Kui sa ei ole ootamas erakorralist teavitust, on see tõenäoliselt üldine hoiatus, mitte andmepüük.",
    isPhishing: false
  },
  {
    id: 2,
    sender: "hr@ericsson.com",
    subject: "Töötajate hüvitiste registreerimine",
    content:
      "Tere! Hüvitiste registreerimine algab järgmisel nädalal.\n" +
      "Logige sisse siseportaali ja valige sobivad kindlustus- ning pensionivalikud.",
    hint:
      "Saatja on usaldusväärne ning sõnum ei sunni tegema midagi turvariskset.",
    explanation:
      "Kirjas mainitud tegevus on siseringi teavitus, mis ei nõua tundlike andmete jagamist ega suuna kahtlastele linkidele – tegemist on reaalse infoga töötajatele.",
    isPhishing: false
  },
  {
    id: 3,
    sender: "noreply@post.ee",
    subject: "Saadetise jälgimine: teie pakk on teel",
    content:
      "Tere! Teie pakil on jälgimisnumber EE123456789.\n" +
      "Jälgimiseks klõpsake ametlikku linki Posti portaalis.",
    hint:
      "Posti domeen on õige ja link viib ametlikule saidile.",
    explanation:
      "Kirja domeen ja lingid on ametlikud ning ei palu sisestada tundlikke andmeid – turvaline kiri.",
    isPhishing: false
  },
  {
    id: 4,
    sender: "alert@amazzon.com",
    subject: "Turvavärskendus teie Amazoni kontol",
    content:
      "Palun värskendage oma Amazoni kontol parool aadressil amazzon.com.\n" +
      "Muidu võidakse teie ostmisvõimalus peatada.",
    hint:
      "Domeen on valetatud (“amazzon.com”), õige on amazon.com.",
    explanation:
      "Saatja domeen on vale (“amazzon.com” mitte “amazon.com”) ning link viib pahatahtlikule saidile – tegu on andmepüügi e-kirjaga.",
    isPhishing: true
  }
];

export default function Infoturbe_juht3() {
  const navigate = useNavigate();
  const [emails, setEmails] = useState(() =>
    [...initialEmails].sort(() => Math.random() - 0.5)
  );
  const [selections, setSelections] = useState({});
  const [status, setStatus] = useState({});
  const [showHints, setShowHints] = useState({});
  const [checked, setChecked] = useState(false);
  const [locked, setLocked] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const phishingCount = initialEmails.filter(e => e.isPhishing).length;
  const safeCount = initialEmails.length - phishingCount;

  const handleSelect = (id, value) => {
    if (locked) return;
    setSelections(prev => ({ ...prev, [id]: value }));
  };

  const handleHint = id => {
    setShowHints(prev => ({ ...prev, [id]: true }));
  };

  const handleSubmit = () => {
    if (Object.keys(selections).length < emails.length) {
      setMessage({ text: 'Palun märgi iga kirja puhul “Phishing” või “Safe”.', type: 'error' });
      return;
    }
    setChecked(true);
    let allCorrect = true;
    const newStatus = {};
    emails.forEach(e => {
      const correct = e.isPhishing ? 'phishing' : 'safe';
      if (selections[e.id] === correct) {
        newStatus[e.id] = 'correct';
      } else {
        newStatus[e.id] = 'wrong';
        allCorrect = false;
      }
    });
    setStatus(newStatus);

    if (allCorrect) {
      setMessage({
        text: `🎉 Õige! Märkisid kirjad õigesti.`,
        type: 'success'
      });
      setLocked(true);
    } else {
      setMessage({ text: '❌ Mõned valikud olid valed. Kasuta vihjeid või proovi uuesti.', type: 'error' });
    }
  };

  const handleReset = () => {
    setEmails([...initialEmails].sort(() => Math.random() - 0.5));
    setSelections({});
    setStatus({});
    setShowHints({});
    setChecked(false);
    setLocked(false);
    setMessage({ text: '', type: '' });
  };

  return (
    <div className={`phishing-game ${locked ? 'correct-bg' : checked ? 'incorrect-bg' : ''}`}>
      <h1>Andmepüügi tuvastamine</h1>
      <p className="scenario">
        <em>Ülesanne on tuvastada, millised e-kirjad on ohutud ja millised kahtlased.</em>
      </p>
      <p className="instruction">
        Märgi täpselt <strong>{phishingCount}</strong> “Phishing” ja ülejäänud <strong>{safeCount}</strong> “Safe”.
      </p>
      <p className="instructions">
        Kui kõik valikud on tehtud, klõpsake nupul “Esita valikud”.
      </p>

      <div className="email-list">
        {emails.map(email => (
          <div key={email.id} className={`email-card ${status[email.id] || ''}`}>
            <h3>{email.subject}</h3>
            <p className="sender">Saatja: {email.sender}</p>
            <pre className="content">{email.content}</pre>

            <div className="options">
              <label className={selections[email.id] === 'phishing' ? 'selected' : ''}>
                <input
                  type="radio"
                  name={`mail-${email.id}`}
                  value="phishing"
                  checked={selections[email.id] === 'phishing'}
                  onChange={() => handleSelect(email.id, 'phishing')}
                  disabled={locked}
                /> Phishing
              </label>
              <label className={selections[email.id] === 'safe' ? 'selected' : ''}>
                <input
                  type="radio"
                  name={`mail-${email.id}`}
                  value="safe"
                  checked={selections[email.id] === 'safe'}
                  onChange={() => handleSelect(email.id, 'safe')}
                  disabled={locked}
                /> Safe
              </label>
            </div>

            <button
              className="hint-button"
              onClick={() => handleHint(email.id)}
              disabled={locked || showHints[email.id]}
            >
              Vihje
            </button>
            {showHints[email.id] && (
              <div className="hint-box">{email.hint}</div>
            )}

            {locked && status[email.id] === 'correct' && (
              <div className="explanation exp-correct">
                {email.explanation}
              </div>
            )}
            {locked && status[email.id] === 'wrong' && (
              <div className="explanation exp-wrong">
                {email.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="buttons" style={{ display: 'flex', justifyContent: 'space-between' }}>
        {!checked ? (
          <>
            <button onClick={handleReset}>Alusta uuesti</button>
            <button className="primary" onClick={handleSubmit}>
              Esita valikud
            </button>
          </>
        ) : locked ? (
          <button className="primary" onClick={() => navigate('/infoturbe_juht4_leht')}>
            Edasi
          </button>
        ) : (
          <button onClick={handleReset}>Proovi uuesti</button>
        )}
      </div>

      {message.text && (
        <div className={`message ${message.type === 'success' ? 'message-correct' : 'message-incorrect'}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
