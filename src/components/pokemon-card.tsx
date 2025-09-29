import React, { FunctionComponent, useState } from 'react'; // 7) importation de l'état
import Pokemon from '../models/pokemon'; // 1) nous importons l'entitée Pokemon
import './pokemon-card.css'; //4) importation du fichier css contenant la bordure grise pour tous les pokémons
import PokemonList from '../pages/pokemon-list';
import formatDate from '../helpers/format-date'; // 11) importation du fichier pour le format de la date
import formatType from '../helpers/format-type';// 13) importation du fichier pour le format du type
import { useHistory } from 'react-router-dom'; // 15) importation du hook useHistory depuis le paquet 'reac-router-dom'

// 2) on déclare un nouveau type (Props) pour typescript. ce type contient un objet pokemon
type Props = { 
  pokemon: Pokemon,
  borderColor?: string // 5) ajout d'une prop facultative (grâce au point d'interrogation) dans notre composant pokemonCard
};

// 3) On lie notre type Props à notre propiété d'entrée
const PokemonCard: FunctionComponent<Props> = ({pokemon, borderColor = '#009688'}) => {  // 5) définition d'une la valeur par défaut (ici couleur verte) de notre prop borderColor (ainsi si la prop est passée par un composant parent cela écrase la valeur par défaut donnée; sinon elle est prise en compte). On utilise ici ECMAScript 6

// 7) On définit l'état du composant pour stocker la couleur actuelle de la bordure puis dans la 1ère ligne du return on ajoute 2 gestionnaires d'événements showBorder et hideBorder
    const [color, setColor] = useState<string>();

// 14) On récupère un objet représentant l'historique du navigateur depuis le hook que nous avons importé
    const history = useHistory();

    const showBorder = () => {
        setColor(borderColor); 
    }

    const hideBorder = () => {
        setColor('#f5f5f5'); // On remet la bordure en gris.
    }

// 14) suite) On définit une nouvelle méthode de gestionnaire d'événements qui prend en paramètre l'identifiant du pokémon vers lequel on souhaite faire une redirection. Pour cela la méthode push prend en paramètre le chemin vers lequel on souhaite se rendre
    const goToPokemon = (id: number) => {
      history.push(`/pokemons/${id}`);
    }

    //  11) On supprime la déclaration de formatDate puis on fait une importation à la place comme nous avons créé un fichier forma-date.ts dans helpers
    /*
    // 8) On crée une méthode pour afficher la date de manière plus correcte pour l'utilisateur. Cette méthode prend en paramètre une date et retourne une chaîne de caractère au format jour/mois/année. A noter que dans le return on met le mois à +1 car pour le mois retourné il commence à 0 pour janvier
    const formatDate =  (date: Date): string => {
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    }
    */

    // 12 On supprime la déclaration de formatType puis on fait une importation à la place comme nous avons créé un fichier forma-type.ts dans helpers
    /*
    // 10) On récupère le code de la fonction prenant en paramètre le type d'un pokémon puis retournant une couleur pour chaque cas de type
    const formatType = (type: string): string => {
  let color: string;
 
  switch (type) {
    case 'Feu': 
      color = 'red lighten-1'; 
      break; 
    case 'Eau': 
      color = 'blue lighten-1'; 
      break; 
    case 'Plante': 
      color = 'green lighten-1'; 
      break; 
    case 'Insecte': 
      color = 'brown lighten-1'; 
      break; 
    case 'Normal': 
      color = 'grey lighten-3'; 
      break; 
    case 'Vol': 
      color = 'blue lighten-3'; 
      break; 
    case 'Poison': 
      color = 'deep-purple accent-1'; 
      break; 
    case 'Fée': 
      color = 'pink lighten-4'; 
      break; 
    case 'Psy': 
      color = 'deep-purple darken-2'; 
      break; 
    case 'Electrik': 
      color = 'lime accent-1'; 
      break; 
    case 'Combat': 
      color = 'deep-orange'; 
      break; 
    default: 
      color = 'grey'; 
      break; 
  }
 
  return `chip ${color}`;
}
*/
    return(

        /*
            // Ce code affiche la liste des pokemons via leurs noms
        <div>
            Ce composant est chargé d'afficher le pokémon : {pokemon.name}
        </div>

        */

        // 4) Le code suivant affiche les pokémons avec pour chaque grille de pokémon les informations nécessaires
                    // 5) à la ligne où il y a card horizontal: on applique en JSX un style à notre balise. Pour cela on modifie la couleur de notre bordure nommée borderColor (à gauche) et on lui passe comme valeur la couleur qu'on a déterminé.
                            //8) On créé après le paragraphe qui affiche le nom de pokemon, un autre paragraphe pour afficher la date selon la méthode qu'on a créé
                                    //9) On ajoute d'abord les types d'un pokémon sous sa carte après le paragraphe de la date
                                        // 14) On relie l'événement Click à notre gestionnaire d'événement goToPokemon et ainsi le click sur un pokemon déclenchera la navigation vers la fiche détaillée de ce pokémon 
        <div className="col s6 m4" onClick={() => goToPokemon(pokemon.id)} onMouseEnter={showBorder} onMouseLeave={hideBorder}>
      <div className="card horizontal" style={{ borderColor: color }}>
        <div className="card-image"> 
          <img src={pokemon.picture} alt={pokemon.name}/>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{pokemon.name}</p>
            <p><small>{formatDate(pokemon.created)}</small></p>
            {pokemon.types.map(type => (
                <span key={type} className={formatType(type)}>{type}</span>
            ))}
          </div>
        </div>
      </div> 
    </div>
    );
}

export default PokemonCard;