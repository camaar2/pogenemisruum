import React, { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';  
import '../CSS/Infoturbe_juht1.css';  

const allPossibleRules = [  
  { id: 1, name: 'Seaduspärane veebiliiklus (HTTP/HTTPS)', correct: 'allow' },  
  { id: 2, name: 'E-posti liiklus (SMTP)', correct: 'allow' },  
  { id: 3, name: 'Kahtlane port 666', correct: 'block' },  
  { id: 4, name: 'SSH port 22', correct: 'allow' },  
  { id: 5, name: 'Telnet port 23', correct: 'block' },  
  { id: 6, name: 'DNS port 53', correct: 'allow' },  
  { id: 7, name: 'FTP port 21', correct: 'allow' }  
];  

const hints = {  
  1: 'Veebiliiklus kasutab peamiselt porte 80 (HTTP) ja 443 (HTTPS).',  
  2: 'E-posti läbiliikumiseks kasutatakse sageli porti 25 (SMTP).',  
  3: 'Port 666 on IRC daemonite jaoks ja võib olla turvarisk.',  
  4: 'SSH turvaliseks kaugjuurdepääsuks töötab port 22.',  
  5: 'Telnet (port 23) on vananenud ja ebaturvaline.',  
  6: 'DNS päringud käivad porti 53 kaudu.',  
  7: 'FTP failiedastuseks kasutatakse porti 21.'  
};  

function shuffleArray(arr) {  
  return arr  
    .map(a => ({ sort: Math.random(), value: a }))  
    .sort((a, b) => a.sort - b.sort)  
    .map(({ value }) => value);  
}  

const Infoturbe_juht1 = () => {  
  const [rules, setRules] = useState([]);  
  const [selections, setSelections] = useState({});  
  const [message, setMessage] = useState({ text: '', type: '' });  
  const [isLocked, setIsLocked] = useState(false);  
  const [showHints, setShowHints] = useState({});  
  const navigate = useNavigate();  

  useEffect(() => {  
    setRules(shuffleArray(allPossibleRules).slice(0, 3));  
  }, []);  

  const handleSelect = (id, value) => {  
    setSelections(prev => ({ ...prev, [id]: value }));  
  };  

  const handleToggleHint = (id) => {  
    setShowHints(prev => ({ ...prev, [id]: !prev[id] }));  
  };  

  const handleSubmit = () => {  
    const allCorrect = rules.every(r => selections[r.id] === r.correct);  
    if (allCorrect) {  
      setMessage({ text: 'Tubli töö! Nüüd on tulemüür tugevam.', type: 'success' });  
      setIsLocked(true);  
    } else {  
      setMessage({ text: 'Mõni valik on ekslik. Vaata vihjet või proovi uuesti.', type: 'error' });  
    }  
  };

  const handleReset = () => {  
    setSelections({});  
    setMessage({ text: '', type: '' });  
    setIsLocked(false);  
    setShowHints({});  
    setRules(shuffleArray(allPossibleRules).slice(0, 3));  
  };

  return (  
    <div className="software-puzzle">  
      <h1>Digifortressi ehitamine</h1>  
      <div className="storyline">  
        Sa oled küberanalüütik aastal 2030, vastutades globaalse korporatsiooni võrgu turvalisuse eest.  
      </div>  

      <div className="table-container">  
        <table>  
          <thead>  
            <tr>  
              <th>Liiklus</th>  
              <th>Luba</th>  
              <th>Blokeeri</th>  
              <th>Vihje</th>  
            </tr>  
          </thead>  
          <tbody>  
            {rules.map(rule => (  
              <tr key={rule.id}>  
                <td>{rule.name}</td>  
                <td>  
                  <input  
                    type="radio"  
                    name={`rule-${rule.id}`}  
                    disabled={isLocked}  
                    checked={selections[rule.id] === 'allow'}  
                    onChange={() => handleSelect(rule.id, 'allow')}  
                  />  
                </td>  
                <td>  
                  <input  
                    type="radio"  
                    name={`rule-${rule.id}`}  
                    disabled={isLocked}  
                    checked={selections[rule.id] === 'block'}  
                    onChange={() => handleSelect(rule.id, 'block')}  
                  />  
                </td>  
                <td>  
                  {showHints[rule.id] ? (  
                    <span className="hint-box">{hints[rule.id]}</span>  
                  ) : (  
                    <button  
                      className="hint-button"  
                      onClick={() => handleToggleHint(rule.id)}  
                      disabled={isLocked}  
                    >  
                      Vihje  
                    </button>  
                  )}  
                </td>  
              </tr>  
            ))}  
          </tbody>  
        </table>  
      </div>  

      <div className="buttons">  
        {!isLocked ? (  
          <>  
            <button onClick={handleSubmit}>Esita valikud</button>  
            <button onClick={handleReset}>Alusta uuesti</button>  
          </>  
        ) : (  
          <button className="next-button" onClick={() => navigate('/infoturbe_juht2')}>Edasi</button>  
        )}  
      </div>  

      {message.text && <div className={`message ${message.type}`}>{message.text}</div>}  
    </div>  
  );  
};  

export default Infoturbe_juht1;  