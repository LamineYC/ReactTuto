import React, { FunctionComponent, useState, useEffect } from 'react';
import Pokemon from '../models/pokemon';
// import POKEMONS from '../models/mock-pokemon'; // 23) cet import a été supprimé suite à l'utilisation de pokemon-service
import PokemonCard from '../components/pokemon-card';
import PokemonService from '../services/pokemon-service';
import { Link } from 'react-router-dom'; // 27) importation de Link puis ajout dans le DOM virtuel du bouton d'ajout
import PokemonSearch from '../components/pokemon-search';// importation du composant pokemon-search.tsx et intégration dans le DOM virtuel au dessus de la liste des pokemons
  
const PokemonList: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  
// 22) à l'interieur du useEffect nous mettions en place la liste des pokémons avec la constante en dur POKEMONS. Ce code a été mis en commentaire puis nous avons démarré notre API Rest avec la méthode fetch
     // 23) On supprime la méthode fetch (mis en commentaire) pour utiliser directement la classe pokemon-service après importation
  useEffect(() => {
    //setPokemons(POKEMONS);
     
    /*fetch('http://localhost:3001/pokemons')
      .then(response => response.json())
      .then((pokemons) => {
        setPokemons(pokemons)
      });*/

    PokemonService.getPokemons().then(pokemons => setPokemons(pokemons));

  }, []);
  
// 6) à la ligne où il y a PokemonCard key =... : Passage d'une prop supplémentaire à notre pokemonCard.
  return (
    <div>
      <h1 className="center">Pokédex</h1>
      <div className="container"> 
        <div className="row">
          <PokemonSearch  />
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
        </div>
        <Link className="btn-floating btn-large waves-effect waves-light red z-depth-3"
          style={{position: 'fixed', bottom: '25px', right: '25px'}}
          to="/pokemon/add">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div> 
  );
}
  
export default PokemonList;