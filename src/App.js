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
        <h2>T??my</h2>
        <h3>T??m 1.</h3>
        <input type="text" value={firstTeam} placeholder="Jm??no 1. t??mu" onChange={(e) => handleChange(e, "firstTeam")}/>
        <h3>T??m 2.</h3>
        <input type="text" value={secondTeam} placeholder="Jm??no 2. t??mu" onChange={(e) => handleChange(e, "secondTeam")}/>
        <h2>Zdroj ot??zek</h2>
        <select name="sourceQuestions" onChange={(e) => handleChange(e, "sourceQuestions")}>
          <option value="default">V??choz??</option>
          <option value="custom">Vlastn??</option>
        </select>
        {sourceQuestions==="custom" && <input type="file" onChange={(e) => importFile(e)}/>}
        <h2>D??lka hry</h2>
        <select onChange={(e) => handleChange(e, "endGame")} name="endGame">
          <option value="manual">Do m??ho ukon??en??</option>
          <option value="rounds">Po??et kol</option>
          <option value="points">Po??et bod??</option>
        </select>
        {endGame==="rounds" && <input type="number" value={endRounds} placeholder="Po??et kol" onChange={(e) => handleChange(e, "endRounds")}/>}
        {endGame==="points" && <input type="number" value={endPoints} placeholder="Po??et bod??" onChange={(e) => handleChange(e, "endPoints")}/>}
        <h2>Otev????t projekci</h2>
        <h2>D??le</h2>
      </div>
      {!loading && questions.map((question) => <p>{question.otazka}</p>)}
    </>
  );
}
