import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddGame.css";

const AddGame = () => {
  const navigate = useNavigate();
  const [game, setGame] = useState({
    title: "",
    description: "",
    players: "",
    categories: "",
  });

  const handleChange = (e) => {
    setGame({ ...game, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedGame = {
      ...game,
      title: game.title.charAt(0).toUpperCase() + game.title.slice(1),
    };

    fetch("http://localhost:3000/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedGame),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/");
        } else {
          throw new Error("Failed to add game");
        }
      })
      .catch((error) => {
        console.error("Error adding game", error);
      });
  };

  return (
    <div className="add-game">
      <button className="back-button" onClick={() => navigate("/")}>
        Atrás
      </button>
      <h2>Agregar Nuevo Deporte</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Nombre"
          value={game.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={game.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="players"
          placeholder="Cantidad de Jugadores"
          value={game.players}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="categories"
          placeholder="Categorías"
          value={game.categories}
          onChange={handleChange}
          required
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AddGame;
