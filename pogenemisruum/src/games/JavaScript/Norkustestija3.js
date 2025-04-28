import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Norkustestija3.css';

function Norkustestija3() {
  const options = [
    { id: 'A', payload: "'; DROP TABLE users;--", description: "SQL Injection" },
    { id: 'B', payload: "<script>alert('XSS')</script>", description: "XSS" },
    { id: 'C', payload: "../../etc/passwd", description: "Path Traversal" },
    { id: 'D', payload: "", description: "Tühine sisend" }
  ];

  const correctId = 'B';
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  const handleOptionSelect = (id) => {
    setSelectedOption(id);
  };

  const handleSubmit = () => {
    if (selectedOption === correctId) {
      setMessage("Oled edukalt demonstreerinud haavatavuse ärakasutamist!");
      setIsLocked(true);
    } else {
      setMessage("Valik ei anna tulemusi. Proovi uuesti.");
    }
  };

  const handleReset = () => {
    setSelectedOption("");
    setMessage("");
  };

  const handleNext = () => {
    navigate("/norkustestija4");
  };

  return (
    <div className="exploitation">
      <h1>Süsteemi “murdmine”</h1>
      <p>Vali payload, mis antud sihtsüsteemis on edukalt ärakasutatav:</p>
      <table className="options-table">
        <thead>
          <tr>
            <th>Vali</th>
            <th>Kirjeldus</th>
            <th>Payload</th>
          </tr>
        </thead>
        <tbody>
          {options.map(option => (
            <tr key={option.id} 
                className={`option-row ${selectedOption === option.id ? "selected" : ""}`}
                onClick={() => handleOptionSelect(option.id)}>
              <td>
                <input 
                  type="radio" 
                  name="exploit" 
                  value={option.id} 
                  checked={selectedOption === option.id}
                  onChange={() => handleOptionSelect(option.id)}
                  disabled={isLocked}
                />
              </td>
              <td>{option.description}</td>
              <td>{option.payload || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons">
        {!isLocked && (
          <>
            <button onClick={handleSubmit}>Esita valik</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        )}
        {isLocked && (
          <button onClick={handleNext}>Edasi</button>
        )}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Norkustestija3;
