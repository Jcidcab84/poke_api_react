import { useState } from "react";
import MiApi from "./components/MiApi";
import Buscador from "./components/Buscador";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [pokemons, setPokemons] = useState([]);

  const handlePokemon = async (pokemonName) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );

    if (!response.ok) {
      console.error(`No se pudo cargar el Pokémon ${pokemonName}`);
      setSelectedPokemon("");
      return;
    }

    const data = await response.json();
    setSelectedPokemon(data);
  };

  return (
    <>
    <Header />
    <div className="app-container">
   
      <h1>Encuentra tu pokemon favorito</h1>
      <Buscador
        handlePokemon={handlePokemon}
       
      />
      <div className="container d-flex justify-content-center">
        {selectedPokemon && (
          <div className="card" style={{ width: "18rem" }}>
            {selectedPokemon.sprites && (
              <img
                src={selectedPokemon.sprites.front_default}
                className="card-img-top"
                alt={selectedPokemon.name}
              />
            )}
            <div className="card-body">
              <h5 className="card-title text-center">{selectedPokemon.name}</h5>
            </div>
          </div>
        )}
        {!selectedPokemon && (
          <MiApi pokemons={pokemons} setPokemons={setPokemons} />
        )}
        {/*estado de pokemons al componente MiApi */}
      </div>
      <Footer />
    </div>
    </>
  );
}

export default App;
