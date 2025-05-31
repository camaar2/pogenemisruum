import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Failinimede ja asukohtade kontrollimine",
    content: `
Pahatahtlikud programmid kannavad sageli eksitavaid nimesid (nt **trojan_*.exe**)  
ning paiknevad allalaadimise või tundmatutes kaustades.  
Legitiimsed süsteemifailid asuvad Windowsi kaustades (nt **System32**).
`
  },
  {
    id: 2,
    title: "Shell-skriptide analüüs Linuxis",
    content: `
Shell-skriptid (` + "`/usr/local/bin`" + `) nimega **miner-tool** võivad viidata  
krüptokaevandamisele. Kontrolli skripti sisu ja õigusi.
`
  },
  {
    id: 3,
    title: "Tuntud süsteemiprotsesside eristamine",
    content: `
Õiged Windowsi protsessid (**svchost.exe**) töötavad System32 kaustas.  
Liigsed koopiafailid teistes kaustades võivad olla pahavaralised.
`
  },
  {
    id: 4,
    title: "Manuste turvalisus ja allkirja kontrollimine",
    content: `
Lae alla ainult pahavaraallkirjastusega failid usaldusväärsetest allikatest.  
Kontrolli digitaalallkirja ja tootjat enne täitmist.
`
  }
];

export default function InfoturbeJuht4Leht() {
  const navigate = useNavigate();
  return (
    <div className="tutorial-page">
      {tutorialSections.map(sec => (
        <section key={sec.id} className="tutorial-section">
          <h2>{sec.title}</h2>
          <div className="tutorial-content">
            <ReactMarkdown>
              {sec.content}
            </ReactMarkdown>
          </div>
        </section>
      ))}
      <div className="tutorial-footer">
        <button onClick={() => navigate('/infoturbe_juht4')}>
          Alusta failide analüüsi
        </button>
      </div>
    </div>
  );
}
