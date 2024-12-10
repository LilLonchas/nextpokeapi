// components/RandomPokemons.js
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap"; // Importamos los componentes de Bootstrap
import Head from "next/head"; 
const RandomPokemons = ({ generation }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Estado para el Pokémon seleccionado

  // Función para obtener 1 o 10 Pokémon aleatorios de una generación específica
  const fetchRandomPokemons = async () => {
    let min, max;

    // Determinar el rango de IDs basado en la generación seleccionada
    if (generation === 0) {
      // Para generación 0 (aleatorio de todas las generaciones)
      min = 1;
      max = 1010;
    } else if (generation === 2) {
      min = 152;
      max = 251;
    } //else if (generation === 3) {
      //min = 252;
      //max = 386;} 
      else if (generation === 1) {
      min = 1;
      max = 151;  // Usamos un rango amplio, considerando hasta Pokémon #1010
    }

    // Generar 1 o 10 IDs aleatorios dentro del rango de la generación seleccionada
    const getRandomId = () => Math.floor(Math.random() * (max - min + 1)) + min;

    // Si es '0', solo obtenemos un Pokémon aleatorio, si no, obtenemos 10.
    const randomIds = Array.from({ length: generation === 0 ? 1 : 10 }, getRandomId);

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
    if (notFound) {
      setLoading(false);
     }
  };

  useEffect(() => {
    setLoading(true); // Asegurarse de que se muestre el estado de carga al cambiar la generación
    fetchRandomPokemons();
  }, [generation]); // Dependencia en `generation`

  const handleShowModal = (pokemon) => {
    setSelectedPokemon(pokemon); // Guardamos el Pokémon seleccionado
    setShowModal(true); // Mostramos el modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerramos el modal
    setSelectedPokemon(null); // Limpiamos la selección
  };

  if (loading) {
    return <img src="/load-32_256.gif" alt="cargando"></img>;
  }
  

  return (
    <div>
      <Head>
  <link rel="icon" href={showModal ? "/descarga.png" : "/default-icon.ico"} />
</Head>

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
            <button
              onClick={() => handleShowModal(pokemon)}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Saber más
            </button>
          </div>
        ))}
      </div>

    
      <Modal show={showModal} onHide={handleCloseModal} >
        <Modal.Header closeButton>
          <Modal.Title>{selectedPokemon?.name} (# {selectedPokemon?.id})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: "center" }}>
            <img
              src={selectedPokemon?.image}
              alt={selectedPokemon?.name}
              style={{ width: "100%", maxWidth: "300px", marginBottom: "20px" }}
            />
            <p>HP: {selectedPokemon?.hp}</p>
            <p>Ataque: {selectedPokemon?.attack}</p>
            <p>Defensa: {selectedPokemon?.defense}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
  <a href="/">
    <Button variant="secondary">
      Cerrar
    </Button>
  </a>
  <Button>
    anterior {}
  </Button>
</Modal.Footer>
      </Modal>
    </div>
  );
};

export default RandomPokemons;
