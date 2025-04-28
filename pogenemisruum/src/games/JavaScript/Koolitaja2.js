import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Koolitaja2.css';

function Koolitaja2() {
  const navigate = useNavigate();
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [error, setError] = useState('');

  const materials = ["Video", "Interaktiivne test", "Pikk tehniline tekst"];
  const correctMaterials = ["Video", "Interaktiivne test"];

  const toggleMaterial = (material) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter(m => m !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  const nextStage = () => {
    if (
      selectedMaterials.length === correctMaterials.length &&
      selectedMaterials.every(material => correctMaterials.includes(material))
    ) {
      setError('');
      navigate('/koolitaja3');
    } else {
      setError('Vale valik! Kontoritöötajatele sobivad kõige paremini Video ja Interaktiivne test.');
    }
  };

  return (
    <div className="stage stage2">
      <h2>Koolitusmaterjalide loomine</h2>
      <p>Vali materjalid, mis sobivad kõige paremini kontoritöötajatele:</p>
      <ul>
        {materials.map(material => (
          <li key={material}>
            <label>
              <input
                type="checkbox"
                checked={selectedMaterials.includes(material)}
                onChange={() => toggleMaterial(material)}
              />
              {material}
            </label>
          </li>
        ))}
      </ul>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={nextStage}>Edasi</button>
    </div>
  );
}

export default Koolitaja2;
