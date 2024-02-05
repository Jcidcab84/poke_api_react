import  { useState } from "react";

function Buscador({ handlePokemon }) {
  const [selectPokemon, setSelectPokemon] = useState('');

  const handleClick = async (e) => {
    e.preventDefault()
    await handlePokemon(selectPokemon);
    setSelectPokemon('');
  };

  return (
    <>
    <div className="container d-flex justify-content-center my-5">
      <input 
        type="text"
        placeholder="Caza tu pokemon" 
        value={selectPokemon}
        onChange={(e) => setSelectPokemon(e.target.value)}
        className="text-center btn btn-light border border-danger mx-5 px-5"
      />
      <button className="btn btn-danger mx-5 px-3" type="button" onClick={handleClick}>Atrapalos ya!</button>
      </div>
    </>
  );
}

export default Buscador;



