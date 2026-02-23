import React, { useState } from 'react';
import questions from './data/q.json';

const HEBREW_UI = {
  next: "לשאלה הבאה",
  finish: "סיימתי!",
  correct: "כל הכבוד! נכון מאוד",
  wrong: "טעות, התשובה הנכונה היא: ",
  score: "הציון הסופי שלך הוא:"
};

export default function App() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const q = questions[current];

  const handleCheck = (idx) => {
    if (isAnswered) return;
    setSelected(idx);
    setIsAnswered(true);
    if (idx === q.answer) setScore(s => s + 1);
  };

  const next = () => {
    setCurrent(c => c + 1);
    setSelected(null);
    setIsAnswered(false);
  };

  if (current >= questions.length) {
    return (
      <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen text-2xl font-bold">
        {HEBREW_UI.score} {Math.round((score / questions.length) * 100)}
      </div>
    );
  }

  return (
    <div dir="rtl" className="max-w-xl mx-auto p-6 font-sans text-right">
      <div className="mb-8 p-4 bg-blue-100 rounded-lg">
        <h2 className="text-xl font-bold">{q.question}</h2>
        {q.image && <img src={q.image} alt="question" className="mt-4 mx-auto rounded shadow" />}
      </div>

      <div className="grid gap-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleCheck(i)}
            className={`p-4 border-2 rounded-xl text-lg transition-all ${
              isAnswered && i === q.answer ? 'bg-green-100 border-green-500' :
              isAnswered && i === selected ? 'bg-red-100 border-red-500' : 'bg-white border-gray-200'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className="mt-6">
          <p className="font-bold mb-4">{selected === q.answer ? HEBREW_UI.correct : HEBREW_UI.wrong}</p>
          <button onClick={next} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">
            {current === questions.length - 1 ? HEBREW_UI.finish : HEBREW_UI.next}
          </button>
        </div>
      )}
    </div>
  );
}
