import React, { useState, useEffect } from "react";
import { useShareState } from "./components/hooks";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [sourceQuestions, setSourceQuestions] = useState(null);
  const [endGame, setEndGame] = useState("");
  const [endPoints, setEndPoints] = useState("");
  const [endRounds, setEndRounds] = useState("");
  const [questions, setQuestions] = useShareState("questions", "");
  const [actualQuestion, setActualQuestion] = useShareState("actualQuestion", "");
  const [firstTeam, setFirstTeam] = useShareState("firstTeam", "");
  const [secondTeam, setSecondTeam] = useShareState("secondTeam", "");
  const [pointsFirstTeam, setPointsFirstTeam] = useShareState("pointsFirstTeam", "");
  const [pointsSecondTeam, setPointsSecondTeam] = useShareState("pointsSecondTeam", "");
  const [gameState, setGameState] = useShareState("gameState", "");

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

  const handleChange = (e, type) => {
    if(type==="firstTeam")
      setFirstTeam(e.target.value);
    else if(type==="secondTeam")
      setSecondTeam(e.target.value);
    else if(type==="endGame")
      setEndGame(e.target.value);
    else if(type==="endPoints")
      setEndPoints(e.target.value);
    else if(type==="endRounds")
      setEndRounds(e.target.value);
    else if(type==="sourceQuestions"){
      setSourceQuestions(e.target.value);
      if(e.target.value==="default")
        getQuestions();
    }
      
  };

  const importFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      setQuestions(JSON.parse(e.target.result));
    };
    reader.readAsText(file);
  }

  return (
    <>
      <div className="beginningEditContainer">
        <h1>Co na to skauti</h1>
        <h2>Týmy</h2>
        <h3>Tým 1.</h3>
        <input type="text" value={firstTeam} placeholder="Jméno 1. týmu" onChange={(e) => handleChange(e, "firstTeam")}/>
        <h3>Tým 2.</h3>
        <input type="text" value={secondTeam} placeholder="Jméno 2. týmu" onChange={(e) => handleChange(e, "secondTeam")}/>
        <h2>Zdroj otázek</h2>
        <select name="sourceQuestions" onChange={(e) => handleChange(e, "sourceQuestions")}>
          <option value="default">Výchozí</option>
          <option value="custom">Vlastní</option>
        </select>
        {sourceQuestions==="custom" && <input type="file" onChange={(e) => importFile(e)}/>}
        <h2>Délka hry</h2>
        <select onChange={(e) => handleChange(e, "endGame")} name="endGame">
          <option value="manual">Do mého ukončení</option>
          <option value="rounds">Počet kol</option>
          <option value="points">Počet bodů</option>
        </select>
        {endGame==="rounds" && <input type="number" value={endRounds} placeholder="Počet kol" onChange={(e) => handleChange(e, "endRounds")}/>}
        {endGame==="points" && <input type="number" value={endPoints} placeholder="Počet bodů" onChange={(e) => handleChange(e, "endPoints")}/>}
        <h2>Otevřít projekci</h2>
        <h2>Dále</h2>
      </div>
      {!loading && questions.map((question) => <p>{question.otazka}</p>)}
    </>
  );
}
