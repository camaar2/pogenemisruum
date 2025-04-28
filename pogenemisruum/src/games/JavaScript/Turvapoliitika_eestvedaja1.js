import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Turvapoliitika_eestvedaja1.css';

function Turvapoliitika_eestvedaja1() {
  const navigate = useNavigate();

  const correctThreats = ['Riiklikult toetatud ründegrupp'];

  const threats = shuffleArray([
    'Tõenäoline DDoS rünnak',
    'Pahavara levik',
    'Riiklikult toetatud ründegrupp'
  ]);

  const [selectedThreats, setSelectedThreats] = useState([]);
  const [feedback, setFeedback] = useState('');

  function shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  useEffect(() => {
    if (selectedThreats.length === 0) return;
    const timer = setTimeout(() => {
      const isCorrect =
        selectedThreats.length === correctThreats.length &&
        selectedThreats.every(threat => correctThreats.includes(threat));
      if (isCorrect) {
        setFeedback("Õige! Ülesanne täidetud.");
        navigate('/turvapoliitika_eestvedaja2');
      } else {
        setFeedback('Vale valik! Õige oht täidetakse automaatselt...');
        setSelectedThreats(correctThreats);
        setTimeout(() => {
          navigate('/stage2');
        }, 1000);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [selectedThreats, navigate]);

  const toggleThreat = (threat) => {
    if (selectedThreats.length === correctThreats.length) return;
    if (selectedThreats.includes(threat)) {
      setSelectedThreats(selectedThreats.filter(t => t !== threat));
    } else {
      setSelectedThreats([...selectedThreats, threat]);
    }
  };

  return (
    <div className="stage stage1">
      <h2>1. Etapp: Riikliku tasandi ohtude tuvastamine</h2>
      <p>Vali ohud, mis on riigi kriitilise taristu seisukohalt prioriteetsed:</p>
      <ul className="threat-list">
        {threats.map(threat => (
          <li 
            key={threat}
            onClick={() => toggleThreat(threat)}
            className={selectedThreats.includes(threat) ? "selected" : ""}
          >
            <input type="checkbox" checked={selectedThreats.includes(threat)} readOnly />
            {threat}
          </li>
        ))}
      </ul>
      {feedback && <p className="feedback">{feedback}</p>}
      {/* Kontrolli nuppu ei kuvata – kontroll toimub automaatselt */}
    </div>
  );
}

export default Turvapoliitika_eestvedaja1;
