import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

const Home = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/games", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      })
      .catch((error) => {
        console.error("Error fetching games", error);
      });
  }, []);

  const deleteGame = (id) => {
    fetch(`http://localhost:3000/api/games/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setGames((prevGames) => prevGames.filter((game) => game.id !== id));
        } else {
          throw new Error("Failed to delete game");
        }
      })
      .catch((error) => {
        console.error("Error deleting game", error);
      });
  };

  return (
    <div className="home">
      <div className="header">
        <h1>Juegos Olímpicos</h1>
        <button className="add-game-button" onClick={() => navigate("/add")}>
          Agregar juego
        </button>
      </div>

      <div className="games-list">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <h3>{game.title}</h3>
            <div className="spacer"></div>{" "}
            <div className="button-group">
              <button
                className="details-button"
                onClick={() => navigate(`/game/${game.id}`)}
              >
                Detalles
              </button>
              <button
                className="delete-button"
                onClick={() => deleteGame(game.id)}
              >
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
