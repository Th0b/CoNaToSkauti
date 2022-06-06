import React from 'react';
import {useState, useEffect} from 'react';

export default function App() {
  const [questions, setQuestions] = useState([null]);
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState(false);

  useEffect(() => {
    getQuestions();
  },[]);

  const getQuestions = async () => {
    try{
      const response = await fetch("./json/questions.JSON");
      const result = await response.json();
      setQuestions(result);
      setLoading(false)
    } catch (err) {
        console.error(err.message);
    }
  }

  return (
    <>
      <h1>Otázky</h1>
      {!loading && questions.map(question => <p onClick={()=>setTest(!test)}>{question.otazka}</p>)}
      <h2>{test?"Pravda":"Lež"}</h2>
    </>
  );
}