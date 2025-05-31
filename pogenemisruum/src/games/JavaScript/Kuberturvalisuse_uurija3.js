import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_uurija3.css';

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const issues = [
  { id: 1, name: "Parool puudub administraatori paneelil", level: "high" },
  { id: 2, name: "Aegunud tarkvara versioon",               level: "medium" },
  { id: 3, name: "Kahtlane PowerShelli skript",              level: "high" },
  { id: 4, name: "HTTPS puudub veebilehel",                  level: "medium" },
  { id: 5, name: "Varukoopiad tegemata",                     level: "low" },
  { id: 6, name: "Logifailid pole kaitstud",                 level: "low" }
];

function Kuberturvalisuse_uurija3() {
  const navigate = useNavigate();

  const [rows, setRows] = useState(() => shuffleArray(issues));
  const [answers, setAnswers] = useState({});
  const [msg, setMsg] = useState("");
  const [locked, setLocked] = useState(false);

  const change = (id, val) => setAnswers((p) => ({ ...p, [id]: val }));

  const check = () => {
    const allFilled = rows.every((r) => answers[r.id]);
    const allRight = rows.every((r) => answers[r.id] === r.level);

    if (allFilled && allRight) {
      setMsg("✅ Täpne töö! Oled õigesti hinnanud tõsiduse. Jätkame järgmisena.");
      setLocked(true);
    } else {
      setMsg("⚠️ Mõni tase ei klapi. Kontrolli ja proovi uuesti.");
    }
  };

  const reset = () => {
    setRows(shuffleArray(issues));
    setAnswers({});
    setMsg("");
    setLocked(false);
  };

  const next = () => navigate("/kuberturvalisuse_uurija4");

  return (
    <div className="criticality-card">
      <h1>3. ETAPP: Probleemide tõsidus</h1>
      <p>Vali iga probleemi jaoks sobiv tase:</p>

      <table className="crit-table">
        <thead>
          <tr>
            <th>Probleem</th>
            <th>Tase</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            let cls = "";
            if (locked) {
              cls = answers[row.id] === row.level ? "correct" : "incorrect";
            }
            return (
              <tr key={row.id} className={cls}>
                <td>{row.name}</td>
                <td>
                  <select
                    value={answers[row.id] || ""}
                    onChange={(e) => change(row.id, e.target.value)}
                    disabled={locked}
                  >
                    <option value="">Vali…</option>
                    <option value="high">Kõrge</option>
                    <option value="medium">Keskmine</option>
                    <option value="low">Madal</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="buttons">
        {!locked ? (
          <>
            <button onClick={check}>Esita</button>
            <button onClick={reset}>Alusta uuesti</button>
          </>
        ) : (
          <button onClick={next}>Edasi</button>
        )}
      </div>

      {msg && <div className="message">{msg}</div>}
    </div>
  );
}

export default Kuberturvalisuse_uurija3;
