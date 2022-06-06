import React, { useState, useEffect } from "react";
import { useShareState } from "./components/hooks";

export default function App() {
  const [questions, setQuestions] = useState([null]);
  const [loading, setLoading] = useState(true);
  const [otazka, setOtazka] = useShareState("body", "");

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const response = await fetch("./json/questions.JSON");
      const result = await response.json();
      setQuestions(result);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (e) => {
    setOtazka(e.target.value);
  };

  return (
    <>
      <h1>Otázky</h1>
      {!loading && questions.map((question) => <p>{question.otazka}</p>)}
      <input value={otazka} placeholder="Otázka" onChange={handleChange} />
      <h5>Otázka: {otazka}.</h5>
    </>
  );
}
