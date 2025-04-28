import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Infoturbe_juht3.css';

const initialEmails = [
  {
    id: 1,
    sender: "security@swedbank.ee",
    subject: "Kontohoiatus: kinnitage oma kontoandmed",
    content: `Lugupeetud klient! Oleme tuvastanud kahtlast aktiivsust teie kontol.\n
Palun ülevaatamiseks logige oma pangakontole sisse ja kinnitage oma isikuandmed.\n
Kui te ei kinnita 24 tunni jooksul, võib teie konto ligipääs peatuda.`,
    hint: "Saatja domeen on swedbank.ee – see on ametlik Swedbanki domeen. Kiri ei sisalda kahtlaseid linke.",
    isPhishing: false,
  },
  {
    id: 2,
    sender: "hr@ericsson.com",
    subject: "Töötajate hüvitiste registreerimine",
    content: `Tere kolleeg! Tuletame meelde, et hüvitiste registreerimine algab järgmisel nädalal.\n
Palun logige sisse siseportaali ja valige sobivad kindlustus- ning pensionivalikud.`,
    hint: "Sõnum tundub loogiline ja pärineb usaldusväärsest ettevõttest e-posti domeeniga ericsson.com.",
    isPhishing: false,
  },
  {
    id: 3,
    sender: "noreply@post.ee",
    subject: "Saadetise jälgimine: teie pakk on teel",
    content: `Tervist! Teie pakile on määratud jälgimisnumber EE123456789.\n
Saate selle oma koduukse juurde järgmise 2 päeva jooksul. Jälgimiseks klõpsake antud lingil.`,
    hint: "Posti ametlik domeen on post.ee – link ja tekst tunduvad loomulikud ja abistavad.",
    isPhishing: false,
  },
  {
    id: 4,
    sender: "alert@amazzon.com",
    subject: "Turvavärskendus teie Amazzoni kontol",
    content: `Tere! Oma turvalisuse huvides värskendage oma Amazzoni kontol parool ja makseviisid.\n
Logige sisse aadressil amazzon.com ja sisestage uus parool.\n
Amazzon ei saa praegu kinnitust, kui te ei uuenda.`,
    hint: "Kumbki sõnas 'amazon' on kirjutatud ühe `z`, domeen on vale – õige on amazon.com, mitte amazzon.com.",
    isPhishing: true,
  }
];

const Infoturbe_juht3 = () => {
  const navigate = useNavigate();
  const [emails, setEmails] = useState([...initialEmails].sort(() => Math.random() - 0.5));
  const [selections, setSelections] = useState({});
  const [emailStatus, setEmailStatus] = useState({});
  const [showHints, setShowHints] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLocked, setIsLocked] = useState(false);

  const handleChange = (id, value) => {
    if (!isLocked) {
      setSelections(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = () => {
    const newStatus = {};
    let allCorrect = true;
    emails.forEach(email => {
      const correct = email.isPhishing ? 'phishing' : 'safe';
      const user = selections[email.id];
      if (user !== correct) {
        newStatus[email.id] = 'wrong';
        allCorrect = false;
      } else {
        newStatus[email.id] = 'correct';
      }
    });
    setEmailStatus(newStatus);

    if (allCorrect) {
      setMessage({ text: 'Tubli töö! Kõik kahtlased e-kirjad on õigesti tuvastatud.', type: 'success' });
      setIsLocked(true);
    } else {
      setMessage({ text: 'Mõned e-kirjad on valesti hinnatud. Vaata vihjeid ja proovi uuesti.', type: 'error' });
    }
  };

  const handleReset = () => {
    setEmails([...initialEmails].sort(() => Math.random() - 0.5));
    setSelections({});
    setEmailStatus({});
    setShowHints({});
    setMessage({ text: '', type: '' });
    setIsLocked(false);
  };

  return (
    <div className="phishing-game">
      <h1>Andmepüügi tuvastamine</h1>
      <p className="storyline">
        Sa oled küberanalüütik ettevõttes, kus sinu ülesanne on eraldada usaldusväärsed e-kirjad kahtlastest. Märgi iga kirja juures, kas see on "Phishing" või "Safe".
      </p>

      <div className="email-list">
        {emails.map(email => {
          const status = emailStatus[email.id];
          return (
            <div key={email.id} className={`email-card ${status}`}>  
              <h3>{email.subject}</h3>
              <p className="sender">Saatja: {email.sender}</p>
              <p className="content">{email.content}</p>

              <div className="options">
                <label>
                  <input
                    type="radio"
                    name={`email-${email.id}`}
                    value="phishing"
                    checked={selections[email.id] === 'phishing'}
                    onChange={() => handleChange(email.id, 'phishing')}
                  /> Phishing
                </label>
                <label>
                  <input
                    type="radio"
                    name={`email-${email.id}`}
                    value="safe"
                    checked={selections[email.id] === 'safe'}
                    onChange={() => handleChange(email.id, 'safe')}
                  /> Safe
                </label>
              </div>

              <button
                className="hint-button"
                onClick={() => setShowHints(prev => ({ ...prev, [email.id]: true }))}
              >
                Vihje
              </button>
              {showHints[email.id] && (
                <div className="hint-box">
                  {email.hint}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="buttons">
        {!isLocked ? (
          <>  
            <button onClick={handleSubmit}>Esita hinnangud</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        ) : (
          <button className="next-button" onClick={() => navigate('/infoturbe_juht4')}>
            Edasi
          </button>
        )}
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
    </div>
  );
};

export default Infoturbe_juht3;