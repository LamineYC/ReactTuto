import React, { FunctionComponent, useState } from 'react';
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';

const PokemonAdd: FunctionComponent = () => {
    const [id] = useState<number>(new Date().getTime()); // On génére un identifiant unique pour notre futur pokémon. Pour cela la méthode getTime qui est native en javascript renvoit le nombre de milliseconds écoulés depuis le 1er janvier 1970 (on parle d'un Timestamp en informatique)
    const [pokemon] = useState<Pokemon>(new Pokemon(id)); // On crée un nouveau pokémon vierge en lui passant cet identifiant

    // à la ligne où il y a PokemonForm On met en place notre nouveau formulaire d'édition pour le moment avec un nouveau pokemon vierge et on laisse à l'utilisateur le soin de renseigner les infos pour ce nouveau pokemon
    
     // 28) Ajout d'une prop "isEditForm" mise à false à la ligne où il y a PokemonForm pour distinguer l'ajout. Ajout dans le composant pokemon-edit.tsx de la prop isEditForm à true pour distinguer l'édition
    return (
      <div className="row">
        <h2 className="header center">Ajouter un pokémon</h2>
        <PokemonForm pokemon={pokemon} isEditForm={false}></PokemonForm>
      </div>
    );
}

export default PokemonAdd;