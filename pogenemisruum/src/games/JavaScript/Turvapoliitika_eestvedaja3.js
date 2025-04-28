import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Turvapoliitika_eestvedaja3.css';

function Turvapoliitika_eestvedaja3() {
  const navigate = useNavigate();

  const correctItems = ['Turvapoliitika dokumentatsioon', 'Juurdepääsukontrollide logid'];

  const items = shuffleArray([
    'Turvapoliitika dokumentatsioon',
    'Töötajate isiklikud e-kirjad',
    'Juurdepääsukontrollide logid',
    'Kohvikumenüü'
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
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

  const toggleItem = (item) => {
    if (isChecked) return;
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const checkAnswers = () => {
    const isCorrect =
      selectedItems.length === correctItems.length &&
      selectedItems.every(i => correctItems.includes(i));
    if (isCorrect) {
      setFeedback("Õige! Auditiks vajalikud materjalid on olemas.");
    } else {
      setFeedback("Vale! Õiged materjalid on nüüd valitud.");
      setSelectedItems(correctItems);
    }
    setIsChecked(true);
  };

  const goToNextStage = () => {
    navigate('/turvapoliitika_eestvedaja4');
  };

  return (
    <div className="stage stage3">
      <h2>Auditiks valmistumine</h2>
      <p>Vali andmed ja dokumendid, mis peavad auditiks valmis olema:</p>
      <ul className="item-list">
        {items.map(item => (
          <li 
            key={item}
            onClick={() => toggleItem(item)}
            className={selectedItems.includes(item) ? "selected" : ""}
          >
            <input type="checkbox" checked={selectedItems.includes(item)} readOnly />
            {item}
          </li>
        ))}
      </ul>
      {!isChecked && (
        <button onClick={checkAnswers} className="check-button">Kontrolli</button>
      )}
      {feedback && <p className="feedback">{feedback}</p>}
      {isChecked && (
        <button onClick={goToNextStage} className="next-button">Edasi</button>
      )}
    </div>
  );
}

export default Turvapoliitika_eestvedaja3;
