import React from 'react';
import {useState, useEffect} from 'react';

export default function App() {
  const [questions, setQuestions] = useState([null]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    getQuestions();
    //synchronizace mezi okny - poslouchání a inicializace
    setStatus((JSON.parse(localStorage.getItem("status"))) || "");
    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    };
  },[]);

  //synchronizace mezi okny - update
  const onStorageUpdate = (e) => {
    const { key, newValue } = e;
    if (key === "status") {
      setStatus(JSON.parse(newValue));
    }
  };

  //synchronizace mezi okny - test
  const handleChange = (typ,e) => {
    const newStatus = [...status];
    if(typ==="body")
      newStatus.body = e.target.value;
    else if(typ==="otazka")
      newStatus.otazka = e.target.value;
    setStatus(newStatus);
    console.log(status);
    localStorage.setItem("status", JSON.stringify(status));
  };

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
      {!loading && questions.map(question => <p>{question.otazka}</p>)}
      <input value={status.body} placeholder="Body" onChange={(e) => handleChange("body",e)} />
      <input value={status.otazka} placeholder="Otázka" onChange={(e) => handleChange("otazka",e)} />
      <h5>Body: {status.body}</h5>
      <h5>Otázka: {status.otazka}</h5>
    </>
    )
}
