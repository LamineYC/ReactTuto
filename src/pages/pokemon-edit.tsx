import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';
//import POKEMONS from '../models/mock-pokemon'; // 23) cet import a été supprimé suite à l'utilisation de pokemon-service
import PokemonService from '../services/pokemon-service';
import Loader from '../components/loader'; // 31) Importation du composant puis utilisation de l'icone de chargement en bas du DOM virturel (à la place de "Aucun pokémon à afficher!")
 
type Params = { id: string };
  
const PokemonEdit: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
    
  const [pokemon, setPokemon] = useState<Pokemon|null>(null);
  
  // 22) suite) à l'interieur du useEffect nous utilisions la constante en dur POKEMONS. Ce code a été mis en commentaire puis nous écrit une requête permettant d'éditer les données d'un seul pokémon
      // 23) On supprime la méthode fetch (mis en commentaire) pour utiliser directement la classe pokemon-service après importation

  useEffect(() => {
   /* POKEMONS.forEach(pokemon => {
      if (match.params.id === pokemon.id.toString()) {
        setPokemon(pokemon);
      }
    })*/
    
    /*fetch(`http://localhost:3001/pokemons/${match.params.id}`)
    .then(response => response.json())
    .then(pokemon => {
      if(pokemon.id) setPokemon(pokemon);  
     });*/

     PokemonService.getPokemon(+match.params.id).then(pokemon => setPokemon(pokemon)); // le caractère + permet de convertir une chaîne de caract en un nombre
     

  }, [match.params.id]);
  
  // 28) Ajout d'une prop "isEditForm" mise à true à la ligne où il y a PokemonForm pour distinguer l'édition. Ajout dans le composant pokemon-add.tsx de la prop isEditForm à false pour distinguer l'ajout
  return (
    <div>
      { pokemon ? (
        <div className="row">
            <h2 className="header center">Éditer { pokemon.name }</h2>
            <PokemonForm pokemon={pokemon} isEditForm={true}></PokemonForm>
        </div>
      ) : (
        <h4 className="center"><Loader/></h4>
      )}
    </div>
  );
}
  
export default PokemonEdit;