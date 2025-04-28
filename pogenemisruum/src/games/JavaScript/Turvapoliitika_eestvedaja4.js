import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Turvapoliitika_eestvedaja4.css';

function Turvapoliitika_eestvedaja4() {
  const navigate = useNavigate();

  const correctActions = ['Teavitamine andmekaitseametile', 'Mõjutatud isikute informeerimine'];

  const actions = shuffleArray([
    'Teavitamine andmekaitseametile',
    'Kahju eitamine',
    'Mõjutatud isikute informeerimine',
    'Juhtunu varjamine'
  ]);

  const [selectedActions, setSelectedActions] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  function shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  const toggleAction = (action) => {
    if (isChecked) return;
    if (selectedActions.includes(action)) {
      setSelectedActions(selectedActions.filter(a => a !== action));
    } else {
      setSelectedActions([...selectedActions, action]);
    }
  };

  const checkAnswers = () => {
    const isCorrect =
      selectedActions.length === correctActions.length &&
      selectedActions.every(a => correctActions.includes(a));
    if (isCorrect) {
      setFeedback("Õige! Rikkumisele reageerimise sammud on õigesti valitud.");
    } else {
      setFeedback("Vale! Õiged sammud on nüüd valitud.");
      setSelectedActions(correctActions);
    }
    setIsChecked(true);
  };

  const goToNextStage = () => {
    alert("Tubli! Oled edukalt lõpetanud Küberõiguse ja Vastavuse spetsialisti koolituse!");
    navigate('/');
  };

  return (
    <div className="stage stage4">
      <h2>Reageerimine rikkumistele</h2>
      <p>Vali õiged tegevused, mida tuleb teha andmerikkumise korral:</p>
      <ul className="action-list">
        {actions.map(action => (
          <li 
            key={action}
            onClick={() => toggleAction(action)}
            className={selectedActions.includes(action) ? "selected" : ""}
          >
            <input type="checkbox" checked={selectedActions.includes(action)} readOnly />
            {action}
          </li>
        ))}
      </ul>
      {!isChecked && (
        <button onClick={checkAnswers} className="check-button">Kontrolli</button>
      )}
      {feedback && <p className="feedback">{feedback}</p>}
      {isChecked && (
        <button onClick={goToNextStage} className="next-button">Lõpeta mäng</button>
      )}
    </div>
  );
}
export default Turvapoliitika_eestvedaja4;
