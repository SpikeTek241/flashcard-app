// src/App.jsx
import { useState } from "react";
import Flashcard from "./components/Flashcard";
import flashcards from "./data/flashcards";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [seenCards, setSeenCards] = useState([]);

  // Filter flashcards based on search input
  const filteredFlashcards = flashcards.filter((card) =>
    card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle random card generation + progress tracking
  const handleNextCard = () => {
    if (filteredFlashcards.length === 0) return;

    let newIndex = Math.floor(Math.random() * filteredFlashcards.length);
    while (newIndex === currentIndex && filteredFlashcards.length > 1) {
      newIndex = Math.floor(Math.random() * filteredFlashcards.length);
    }

    const cardId = filteredFlashcards[newIndex].id;
    if (!seenCards.includes(cardId)) {
      setSeenCards((prev) => [...prev, cardId]);
    }

    setCurrentIndex(newIndex);
  };

  return (
    <div className="App" style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Trivia Flashcards</h1>
      <p>Test your knowledge with this simple quiz app.</p>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search by keyword or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "0.5rem",
          marginBottom: "1rem",
          width: "60%",
          fontSize: "1rem",
          border: "1px solid #ccc",
          borderRadius: "6px"
        }}
      />

      <p>Total Cards: {filteredFlashcards.length}</p>
      <p>
        Cards Studied: {seenCards.length} / {filteredFlashcards.length}
      </p>

      {/* 🧠 Flashcard Display */}
      {filteredFlashcards.length > 0 ? (
        <Flashcard card={filteredFlashcards[currentIndex % filteredFlashcards.length]} />
      ) : (
        <p>No cards match your search.</p>
      )}

      {/* ➡️ Next Card Button */}
      <button
        onClick={handleNextCard}
        style={{
          marginTop: "1.5rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "1px solid #333",
          backgroundColor: "#f0f0f0",
          cursor: "pointer"
        }}
      >
        Next Card
      </button>
    </div>
  );
};

export default App;