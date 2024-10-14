import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/GameDetails.css";

const GameDetails = () => {
  const [game, setGame] = useState(null);
  const navigate = useNavigate();
  const { gameId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/games/${gameId}`)
      .then((response) => {
        setGame(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching game details", error);
      });
  }, [gameId]);

  if (!game) return <div>Loading...</div>;

  return (
    <div className="game-details">
      <button className="back-button" onClick={() => navigate("/")}>
        Atrás
      </button>
      <h2>{game.title}</h2>
      <p>Descripción: {game.description}</p>
      <p>Cantidad de Jugadores: {game.players}</p>
      <p>Categorías: {game.categories}</p>
    </div>
  );
};

export default GameDetails;
