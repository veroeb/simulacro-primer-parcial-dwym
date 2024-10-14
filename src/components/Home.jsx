import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

const Home = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/games")
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching games", error);
      });
  }, []);

  const deleteGame = (id) => {
    axios
      .delete(`http://localhost:3000/api/games/${id}`)
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.error("Error deleting game", error);
      });
  };

  return (
    <div className="home">
      <h1>Título de la aplicación</h1>
      <button className="add-game-button" onClick={() => navigate("/add")}>
        Agregar juego
      </button>
      <div className="games-list">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <h3>{game.title}</h3>
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
        ))}
      </div>
    </div>
  );
};

export default Home;
