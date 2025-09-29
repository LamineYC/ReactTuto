import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom'; 
import Pokemon from '../models/pokemon';
//import POKEMONS from '../models/mock-pokemon'; // 23) cet import a été supprimé suite à l'utilisation de pokemon-service
import formatDate from '../helpers/format-date';
import formatType from '../helpers/format-type';
import PokemonService from '../services/pokemon-service';
import Loader from '../components/loader'; // 31) Importation du composant puis utilisation de l'icone de chargement en bas du DOM virturel (à la place de "Aucun pokémon à afficher!")
  
type Params = { id: string };
  
const PokemonsDetail: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
    
  const [pokemon, setPokemon] = useState<Pokemon|null>(null);
 
  // 22) suite) à l'interieur du useEffect nous utilision la constante en dur POKEMONS. Ce code a été mis en commentaire puis nous écrit une requête permettant de récupérer les données d'un seul pokémon
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
    // ajout du bouton d'édition de formulaire à la ligne après l'image du pokemon (L31 à L33)
  return (
    <div>
      { pokemon ? (
        <div className="row">
          <div className="col s12 m8 offset-m2"> 
            <h2 className="header center">{ pokemon.name }</h2>
            <div className="card hoverable"> 
              <div className="card-image">
                <img src={pokemon.picture} alt={pokemon.name} style={{width: '250px', margin: '0 auto'}}/>
                <Link to={`/pokemons/edit/${pokemon.id}`} className="btn btn-floating halfway-fab waves-effect waves-light">
                  <i className="material-icons">edit</i>
                </Link>
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <table className="bordered striped">
                    <tbody>
                      <tr> 
                        <td>Nom</td> 
                        <td><strong>{ pokemon.name }</strong></td> 
                      </tr>
                      <tr> 
                        <td>Points de vie</td> 
                        <td><strong>{ pokemon.hp }</strong></td> 
                      </tr> 
                      <tr> 
                        <td>Dégâts</td> 
                        <td><strong>{ pokemon.cp }</strong></td> 
                      </tr> 
                      <tr> 
                        <td>Types</td> 
                        <td>
                          {pokemon.types.map(type => (
                           <span key={type} className={formatType(type)}>{type}</span>
                          ))}</td> 
                      </tr> 
                      <tr> 
                        <td>Date de création</td> 
                        <td>{formatDate(pokemon.created)}</td> 
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card-action">
                  <Link to="/">Retour</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4 className="center"><Loader/></h4>
      )}
    </div>
  );
}
  
export default PokemonsDetail;