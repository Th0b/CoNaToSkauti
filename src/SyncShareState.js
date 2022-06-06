import React, { useEffect, useState } from "react";

function SyncLocalStorage() {
  const [name, setName] = useState("");

  const onStorageUpdate = (e) => {
    const { key, newValue } = e;
    if (key === "name") {
      setName(newValue);
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
    localStorage.setItem("name", e.target.value);
  };

  useEffect(() => {
    setName(localStorage.getItem("name") || "");
    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    };
  }, []);

  return <input value={name} onChange={handleChange} />;
}

export default SyncLocalStorage;
