import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
  {
    id: 1,
    title: "Mis on ohumärgid andmetes?",
    content: `
Ohumärgid (indikaatorid) andmetes on elemendid, mis viitavad pahatahtlikule tegevusele:
- **Failinimed** – ebatavalised või kahtlased laiendid (näiteks .exe, .sh või muu fail, mis pole tavakasutuses), mis võivad viidata pahavarale
- **IP-aadressid** – musta nimekirja kantud või muul viisil kahtlase reputatsiooniga aadressid, millele suunatud liikumine võib näidata võrgus toimuvat pahatahtlikku tegevust
- **C2-serverid** – käsu-ja kontrollserverite aadressid või nimed, mida botnetid või muud pahatahtlikud projektid kasutavad, et suunata nakatatud seadmeid ja juhtida rünnakuid
`
  },
  {
    id: 2,
    title: "Kuidas eristada ohumärke tavatekstist?",
    content: `
- **Tavatekst** kasutab lihtsaid sõnu ja lauseid, mida me iga päev näeme, näiteks „kogutud“, „ja“, „tavaline“, „süsteem“, „andmed“. See kõlab sujuvalt ja loogiliselt, ilma et tekiks ootamatuid kombinatsioone või erimärke.  
- **Ohumärgid** paistavad silma, sest neil on oma tunnused, mis ei sobitu tavalise lausevooga:
- • Sisaldavad sageli spetsiifilisi sümboleid või märke (nt punktid ja numbrid IP-aadressides, näiteks \`192.168.1.10\`).  
- • Tekivad kahtlased faililaiendid (\`.exe\`, \`.dll\`, \`.sh\`) või failinimed, mis ei ole tavapärased (näiteks \`setup_backdoor.exe\`).  
- • Näevad välja nagu juhuslikud tähekombinatsioonid või kontrollsummad (failisignatuurid), näiteks pikk koodijada heksade kujul: \`5f4dcc3b5aa765d61d8327deb882cf99\`.  
- • Võivad sisaldada tundmatuid domeeninimesid või URL-e, mis ei meenuta tavapäraseid veebisaite (nt \`http://malicious-domain.example.com\`).  
- • Tõenäoliselt mainitakse C2-aadresse (käsu-ja-kontrollserverid), mis koosnevad tihti IP-aadressist või kahtlasest alamdomeenist.  
  
  **Kokkuvõttes**: kui tekst koosneb lihtsalt üldistest sõnadest ja lausetest, on see tavatekst. Kui aga tekib mingi kindel mustriline või vormiline eripära (IP-aadressid, failihashid(lühike fikseeritud pikkusega bitijada), domeenid, kahtlased failinimed), siis on tõenäoliselt tegemist ohumärgiga.`
  },
  {
    id: 3,
    title: "IP-aadresside roll analüüsis",
    content: `
  • **IP-aadress** on arvuti “aadress” internetis või võrgus (näiteks \`192.168.1.5\`).  
  • Analüütik vaatab, kas näeb ebatavalist või välisvõrgust tulevat aadressi, sest see võib tähendada, et keegi üritab ilma loata sisse pääseda.`
  }
  ,
  {
    id: 4,
    title: "Pahavara tuvastamine failinimede kaudu",
    content: `
  • **Failinimi** on see nimi, mida näed arvutis või e-kirjas (nt "setup.exe" või "dokument.pdf").  
  • Kui failinimes on sõnu nagu **"trojan"** või **"malware"**, või kui fail lõpeb kahtlase laiendiga (nt “.exe”, “.bat”), võib see olla pahatahtlik tarkvara.  
  • Selliseid faile tuleb kohe eraldi uurida, sest need võivad arvutit kahjustada või andmeid varastada.`
  }
];

export default function KuberturbeOhuanaluutik2Leht() {
  const navigate = useNavigate();

  return (
    <div className="tutorial-page">
      {tutorialSections.map(sec => (
        <section key={sec.id} className="tutorial-section">
          <h2>{sec.title}</h2>
          <div className="tutorial-content">
            {}
            <ReactMarkdown>{sec.content}</ReactMarkdown>
          </div>
        </section>
      ))}
      <div className="tutorial-footer">
        <button onClick={() => navigate('/kuberturbe_ohuanaluutik2')}>
          Alusta andmete analüüsi
        </button>
      </div>
    </div>
  );
}
