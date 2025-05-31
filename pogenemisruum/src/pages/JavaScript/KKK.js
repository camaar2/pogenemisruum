import React, { useState } from "react";
import "../CSS/KKK.css";
export default function KKK() {
  const faqs = [
    {
      q: "Kas platvorm sobib täielikele algajatele?",
      a:
        "Jah. Iga mängu eel on lühike slaid, mis tutvustab vajalikke mõisteid ja annab näpunäiteid. Ei ole vaja eelteadmisi programmeerimisest ega küberturvalisusest—õppimine toimub samm‑sammult mängu käigus.",
    },
    {
      q: "Kas saan platvormi kasutada klassiruumis ilma registreerimiseta?",
      a:
        "Praegune prototüüp ei nõua sisselogimist. Õpetaja saab lihtsalt jagada lingi ning õpilased saavad alustada mängimist kohe – tulemused kuvatakse kohapeal brauseris.",
    },
    {
      q: "Kuidas mängude tulemusi tulevikus salvestatakse?",
      a:
        "Valmivas täisversioonis lisatakse kasutajakontod ja turvaline andmebaas (nt Firebase), mille abil saab jälgida edenemist, analüüsida testide tulemusi ja kohandada raskusastet.",
    },
    {
      q: "Milliseid seadmeid ja brausereid platvorm toetab?",
      a:
        "Rakendus on ehitatud Reactile ja testitud kaasaegsetes brauserites (Chrome, Firefox, Edge, Safari) nii lauaarvutis kui ka mobiilis. Parima kasutuskogemuse saamiseks soovitame uuemaid brausereid.",
    },
    {
      q: "Kuidas on tagatud minu andmete turvalisus?",
      a:
        "Platvorm järgib GDPR‑i ja NIS2 nõudeid. Isikuandmeid ei koguta ilma selge nõusolekuta ning kõik salvestatud andmed krüpteeritakse nii transportimisel (TLS) kui ka puhkeolekus.",
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <div className="kkk-container">
      <h1 className="kkk-title">KKK</h1>

      {faqs.map(({ q, a }, i) => (
        <div key={i} className={`kkk-item ${open === i ? "open" : ""}`}>
          <button
            className="kkk-question"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{q}</span>
            <svg
              className={`kkk-icon ${open === i ? "flip" : ""}`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && <div className="kkk-answer">{a}</div>}
        </div>
      ))}
    </div>
  );
}
