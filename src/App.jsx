import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [mangas, setMangas] = useState([]);
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [id, setId] = useState("");
  const [operationNumber, setOperationNumber] = useState(1); //1 = add; 2= update; 3= delete

  const fetchApi = async ({ method, endpoint, options }) => {
    try {
      const result = await axios({
        method,
        baseURL: "http://localhost:8000",
        url: endpoint,
        ...options,
      });

      return result.data;
    } catch (error) {
      throw error.message;
    }
  };

  const handleSubmit = (e, operationNumber, id) => {
    e.preventDefault();

    // Set method type
    let method;
    if (operationNumber == 1) method = "post";
    else if (operationNumber == 2) method = "put";
    else method = "delete";

    if (name && topic) {
      fetchApi({
        method,
        endpoint: method == "postF" ? "/manga" : `/manga/${id}`,
        options: {
          withCredentials: true,
          data: { name, topic },
        },
      }).then(() => {
        setName("");
        setTopic("");
        window.location = "/";
      });
    }
  };

  useEffect(() => {
    fetchApi({ method: "get", endpoint: "/manga" }).then((response) => {
      if (response) {
        setMangas(response);
      }
    });
  }, []);

  return (
    <div>
      <ol>
        {mangas &&
          mangas.map((manga) => (
            <li key={manga._id} style={{ listStyleType: "number" }}>
              Name: <strong>{manga.name}</strong> - Topic:{" "}
              <strong>{manga.topic}</strong>
              {/* For update a manga  */}
              <button
                type="button"
                onClick={() => {
                  setName(manga.name);
                  setTopic(manga.topic);
                  setId(manga._id);
                  setOperationNumber(2);
                }}
              >
                Update
              </button>
              
              {/* For delete a manga  */}
              <button
                type="button"
                onClick={() => {
                  setName(manga.name);
                  setTopic(manga.topic);
                  setId(manga._id);
                  setOperationNumber(3);
                }}
              >
                Delete
              </button>
            </li>
          ))}
      </ol>

      <button type="button" onClick={() => setOperationNumber(1)}>
        Add manga
      </button>

      <form onSubmit={(e) => handleSubmit(e, operationNumber, id)}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Topic"
        />
        <button type="submit">
          {operationNumber == 1
            ? "Submit"
            : operationNumber == 2
            ? "Update manga"
            : "Delete manga"}
        </button>
      </form>
    </div>
  );
}

export default App;
