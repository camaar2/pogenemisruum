import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../CSS/common.css';

const tutorialSections = [
{
    id: 1,
    title: "Failinimede ja asukohtade kontrollimine",
    content: `
- **Pahatahtlikud programmid** võivad kanda eksitavaid nimesid, et niimoodi peita oma tegelikku eesmärki (nt **trojan_mänguversioon.exe** või **dll-update.exe**, kuigi neid ei loodud mängu ega värskenduse jaoks).  
- • Need failid satuvad tihti sinu arvutisse **allalaadimise kaustadesse** (nt “Laaditud failid” või “Downloads”) või **tundmatutesse kaustadesse**, kus sa neid ei oota.  
- • Kui avad arvutis kausta “Laaditud failid” ja näed seal faili nimega “trojan_game.exe”, ole ettevaatlik – see ei ole tavaline mängufail. Samuti kui leiad faili, mis paikneb näiteks “C:\\Users\\Sina\\Dokumendid\\uuskaust” asemel “C:\\Users\\Sina\\AppData\\Temp\\viirustööriist.exe”, siis tasub tähelepanelikum olla.  
- **Reaalsed süsteemifailid** asuvad selgetes kohtades Windowsis, näiteks **C:\\Windows\\System32** või **C:\\Windows\\SysWOW64**. Kui näed seal “svchost.exe” või “explorer.exe”, siis need on süsteemi toimimiseks vajalikud programmid. Kui aga sama nimega fail asub mujal, võib see olla võlts.  
- **Kodune kontroll**: ava File Explorer ja mine kausta **C:\\Windows\\System32**. Kontrolli, kas tegelikult vajalik fail on õiges kaustas. Kui leiad sama faili nime näiteks **C:\\Users\\Sina\\MinuFailid\\svchost.exe**, võib see viidata pahavarale.`
},
{
    id: 2,
    title: "Shell-skriptide analüüs Linuxis",
    content: `
- **Shell-skript** on tekstifail, kus on käsurea käsud, mida Linux käivitab (näiteks faile kopeerib või programme käivitab). Tavaliselt asuvad sisu skriptid kaustas **/usr/local/bin** või **/home/kasutaja/bin**, aga pahavara kasutab mõnikord sama asukohta.  
- • **Näide pahavarast**: fail nimega **miner-tool** võib viidata krüptokaevandamisele – see tähendab, et pahatahtlik programm kasutab sinu arvuti protsessorit või graafikakaarti, et kaevandada krüptovaluutat sinu teadmata.  
- • Mõtle, et faili “miner-tool” sisu on kui käsukild, mis ütleb arvutile “kaevanda raha”, aga sinu taskust raha see ei küsi – kaevandab sinu elektrit ja ressursse.  
- • **Käsitsi kontroll**: ava terminal ja kirjuta "ls -l /usr/local/bin/miner-tool" , et näha, kes selle faili lõi ja millised õigused tal on. Kui fail kuulub tundmatule kasutajale või on seade “execute” (käivitamine) päritud ka kõigile erinevatest kontodest, võib see olla ohumärk.  
- • **Õiguste (permissions) selgitus**: kui faili õigustes on “rwxr-xr-x”, siis kirjutamisluba on vaid omanikul, aga käivitamise õigus on kõigil. Kui aga pahavara skriptil on lubatud kõikidel kirjutada ja käivitada, siis võib see ennast ise muuta ja importida uusi pahavarakoode.`
},
{
    id: 3,
    title: "Tuntud süsteemiprotsesside eristamine",
    content: `
- **Süsteemiprotsessid** on programmid, mis töötavad taustal nii Windowsis kui Linuxis ja on osa operatsioonisüsteemist. Näiteks Windowsis teevad mitmed osad tööd faili- või võrgijuhtimisega, kasutades protsessinimesid nagu **svchost.exe** või **explorer.exe**.  
- • **Õige asukoht**: reaalsed **svchost.exe** ja **explorer.exe** asuvad alati kaustas **C:\\Windows\\System32** (või 64-bit süsteemis ka **C:\\Windows\\SysWOW64**).  
- • Kui leiad **svchost.exe** mõnes muus kaustas (nt **C:\\Users\\Sina\\svchost.exe**), on see kindlasti pahavara, mis üritab end kehastada reaalseks protsessiks.  
- • Kui näed ressursside juhtimisel käimas programmi nimega “svchost.exe”, kontrolli Path (faili asukohta). Kui see on ikkagi “C:\\Windows\\System32\\svchost.exe”, siis kõik on korras – see on tõeline Windowsi komponent. Kui pole, siis on see nagu võlts autovahetus dokumentidest, mida ei tohi usaldada.  
- • **Lihtne kontroll**: ava Task Manager (Ctrl+Shift+Esc) ja otsi loendist “svchost.exe”. Kuna neid on mitu korraga, klõpsa igaühel parema nupuga ja vali “Open file location”. Kui see suunab kausta väljaspool **System32**, võib tegemist olla pahavaraga.`
},
{
    id: 4,
    title: "Manuste turvalisus ja allkirja kontrollimine",
    content: `
- **Manused** on failid, mis on kaasas e-kirjadega (nt Wordi dokumendid, arhiivifailid või PDF-id). Ründajad võivad panna pahavarafaili manusena, ootuses, et sa selle avad.  
- **Allkirja kontroll** tähendab, et iga digitaalne dokument või programm võib olla varustatud **digitaalse allkirjaga** – see on nagu elektrooniline templimärk, mis ütleb, kes faili lõi ja et seda poleks muudetud.  
- • Kui soovid avada faili, mis on manusena saadetud, parem klõpsa failil, vali “Properties” (Atribuudid) ja “Digital Signatures” (Digitaalallkirjad). Kui allkirja pole või see on valesti registreeritud (polnud usaldusväärne allikas), ära ava faili.  
- • **Usaldusväärsed allikad**: kui saad faili mõnelt tuttavalt, kelle e-posti aadress on kindlalt teada, on oht väiksem. Kui aga saad failiga e-kirja aadressilt, mis tundub võlts (nt **tootja@amaz0n.com** vs õige **info@amazon.com**), ära ava manusfaili enne, kui oled kontrollinud saatjat.  
- • **Nõuanne**: seadista e-posti server või viirusetõrje nii, et ta skaneerib automaatselt kõik manused. Kui süsteem teavitab “kahtlus: allkirja ei leitud” või “allkirja allikas pole tunnustatud”, jäta manus avamata ja kustuta või küsi saatjalt täpsust.`
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
