// components/RandomPokemons.js
import { useState, useEffect } from "react";

const RandomPokemons = ({ generation }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener 10 Pokémon aleatorios de una generación específica
  const fetchRandomPokemons = async () => {
    let min, max;

    // Determinar el rango de IDs de la generación seleccionada
    if (generation === 1) {
      min = 1;
      max = 151;
    } else if (generation === 2) {
      min = 152;
      max = 251;
    } else if (generation === 3) {
      min = 252;
      max = 386;
    }

    // Generar 10 IDs aleatorios dentro del rango de la generación seleccionada
    const getRandomId = () => Math.floor(Math.random() * (max - min + 1)) + min;
    const randomIds = Array.from({ length: 10 }, getRandomId);

    // Hacer fetch de cada Pokémon
    const pokemonData = await Promise.all(
      randomIds.map(async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return {
          id: data.id,
          name: data.name,
          image: data.sprites.other["official-artwork"].front_default,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
        };
      })
    );

    setPokemonList(pokemonData);
    setLoading(false); // Dejar de mostrar "Cargando"
  };

  useEffect(() => {
    setLoading(true); // Asegurarse de que se muestre el estado de carga al cambiar la generación
    fetchRandomPokemons();
  }, [generation]); // Dependencia en `generation`

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {pokemonList.map((pokemon) => (
        <div
          key={pokemon.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            width: "200px",
            textAlign: "center",
          }}
        >
          <h4>{pokemon.name} (# {pokemon.id})</h4>
          <img src={pokemon.image} alt={pokemon.name} style={{ width: "100%" }} />
          <p>HP: {pokemon.hp}</p>
          <p>Ataque: {pokemon.attack}</p>
          <p>Defensa: {pokemon.defense}</p>
        </div>
      ))}
    </div>
  );
};

export default RandomPokemons;
