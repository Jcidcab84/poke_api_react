import { useState, useEffect } from "react";

function MiApi({ pokemons, setPokemons }) {
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=18"
        );
        if (!response.ok) {
          throw new Error("No se pudo cargar la lista de Pokémon");
        }

        const data = await response.json();
        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            if (!pokemonResponse.ok) {
              throw new Error(`No se pudo cargar el Pokémon ${pokemon.name}`);
            }

            const pokemonData = await pokemonResponse.json();
            return {
              name: pokemonData.name,
              imageUrl: pokemonData.sprites?.front_default,
            };
          })
        );

        setPokemons(detailedPokemons);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemons();
  }, [setPokemons]);

  const handleSortAscending = () => {
    const sortedPokemons = [...pokemons].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setPokemons(sortedPokemons);
    setSortOrder("asc");
  };

  const handleSortDescending = () => {
    const sortedPokemons = [...pokemons].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    setPokemons(sortedPokemons);
    setSortOrder("desc");
  };

  return (
    <div>
      <div className="container d-flex justify-content-between align-items-center mb-2">
        <div className="  d-grid gap-2 col-6 mx-auto my-5 ">
          <div className="d-flex justify-content-evenly">
            <button
              type="button"
              className="btn btn-danger mx-3"
              onClick={handleSortAscending}
            >
              Ordenar menor a mayor
            </button>
            <button
              type="button"
              className="btn btn-danger mx-3"
              onClick={handleSortDescending}
            >
              Ordenar mayor a menor
            </button>
          </div>
        </div>
      </div>
      <div className="container row row-cols-1 row-cols-md-3 g-4">
        {pokemons.map((pokemon, id) => (
          <div key={id} className="col">
            <div className="card h-100 border border-danger">
              <h5 className="card-title text-center pt-3">{pokemon.name}</h5>
              <div className="card-body">
                {pokemon.imageUrl && (
                  <img 
                    src={pokemon.imageUrl}
                    className="card-img-top "
                    alt={pokemon.name}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MiApi;
