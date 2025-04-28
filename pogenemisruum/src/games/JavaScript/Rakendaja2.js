import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Rakendaja2.css';

function Rakendaja2() {
  const navigate = useNavigate();

  const rules = [
    { id: 1, text: 'Luba ainult HTTPS liiklus', correct: true },
    { id: 2, text: 'Luba kogu liiklus ilma piiranguteta', correct: false },
    { id: 3, text: 'Keela tundmatud sissetulevad ühendused', correct: true },
    { id: 4, text: 'Luba FTP liiklus igast allikast', correct: false }
  ];

  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  const toggleSelection = (id) => {
    if (isLocked) return;
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSubmit = () => {
    const correctIds = rules.filter(r => r.correct).map(r => r.id).sort();
    const selectedIds = [...selected].sort((a, b) => a - b);
    if (JSON.stringify(correctIds) === JSON.stringify(selectedIds)) {
      setMessage('Tulemüüri reeglid on õigesti valitud!');
      setIsLocked(true);
    } else {
      setMessage('Mõni reegel on vale. Proovi uuesti.');
    }
  };

  const goToNext = () => {
    navigate('/rakendaja3');
  };

  return (
    <div className="stage">
      <h1>2. Etapp: Tulemüüri reeglite optimeerimine</h1>
      <p>Vali, millised tulemüüri reeglid on vajalikud turvaliseks võrgu kaitsmiseks:</p>
      <ul className="rule-list">
        {rules.map(rule => (
          <li key={rule.id} onClick={() => toggleSelection(rule.id)} className={selected.includes(rule.id) ? 'selected' : ''}>
            <input type="checkbox" checked={selected.includes(rule.id)} readOnly /> {rule.text}
          </li>
        ))}
      </ul>
      <div className="buttons">
        {!isLocked ? (
          <button onClick={handleSubmit}>Kontrolli valikuid</button>
        ) : (
          <button onClick={goToNext}>Edasi</button>
        )}
      </div>
      {message && <div className="feedback">{message}</div>}
    </div>
  );
}

export default Rakendaja2;