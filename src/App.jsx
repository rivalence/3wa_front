import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [mangas, setMangas] = useState([]);

  const fetchApi = async (method, endpoint) => {
    try {
      const result = await axios({
        method,
        baseURL: "http://localhost:8000",
        url: endpoint,
      });

      return result.data;
    } catch (error) {
      throw error.message;
    }
  };

  useEffect(() => {
    fetchApi("get", "/manga").then((response) => {
      if (response) {
        setMangas(response);
      }
    });
  }, []);

  return (
    <ol>
      {mangas &&
        mangas.map((manga) => (
          <li key={manga._id} style={{ listStyleType: "number" }}>
            Name: <strong>{manga.name}</strong> - Topic: <strong>{manga.topic}</strong>
          </li>
        ))}
    </ol>
  );
}

export default App;
