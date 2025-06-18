// src/components/Flashcard.jsx
import { useState } from "react";
import "./Flashcard.css";

const Flashcard = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="card-container">
      <div
        className={`flashcard ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="front">{card.question}</div>
        <div className="back">{card.answer}</div>
      </div>
      <p className="meta">
  {card.icon} <strong>{card.category}</strong> | Difficulty: {card.difficulty}
</p>
    </div>
  );
};

export default Flashcard;
