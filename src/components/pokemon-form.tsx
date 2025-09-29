import React, { FunctionComponent, useState } from 'react'; // 17) importation du useState pour notre formulaire
import { useHistory } from 'react-router-dom'; // 19) importation du hook useHistory pour la redirection en cas de soumission du formulaire
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-type';
import PokemonService from '../services/pokemon-service';

  
// 29) Déclaration de la prop isEditForm créée à la question 28) 
type Props = {
  pokemon: Pokemon,
  isEditForm: boolean
};

// 17) suite) Déclaration de deux nouveaux types pour permettre de modeliser notre formulaire
type Field = {
    value?: any,
    error?: string,
    isValid?: boolean
}

// 30) Ajout du champ picture
type Form = {
    picture: Field,
    name: Field,
    hp: Field,
    cp: Field,
    types: Field
}
  
// 29) suite) Réception de la propriété isEditForm créée à la question 28) 
const PokemonForm: FunctionComponent<Props> = ({pokemon, isEditForm}) => {

    // 17) On déclare le state qui représente les champs et les données de notre formulaire (par défaut on initialise la valeur de chaque champ avec les données initiales du pokémon reçu en entrée c'est à dire en tant que prop)
            // 17) On pousse ensuite les valeurs dans le return en ajoutant les value

   // 19) après importation du hook useHistory, on le récupère dans une constante puis on ajoute la méthode HandleSubmit pour gérer la soumission du formulaire
    const history = useHistory();

    // 30) suite) Ajout du champ picture
    const [form, setForm] = useState<Form>({
        picture: { value: pokemon.picture },
        name: {value: pokemon.name, isValid: true},
        hp: {value: pokemon.hp, isValid: true},
        cp: {value: pokemon.cp, isValid: true},
        types: {value: pokemon.types, isValid: true},
    });


  const types: string[] = [
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
  ];

  // 17 ) On crée une méthode pour gérer la valeur par défaut des checkbox. (Ensuite on l'applique dans le DOM virtuel dans value et checked au même niveau que pour les autres données de la question 17) dans le return)
  const hasType = (type: string): boolean => {
    return form.types.value.includes(type);
  }
   

  // 18) suite) On crée une nouvelle méthode selectType qui prend en charge la le champ des types pour qu'on puisse récupérer les types cochés dans le state
  const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>): void => {
    const checked = e.target.checked;
    let newField: Field;

    if(checked) {
      // Si l'utilisateur coche un type, on l'ajoute à la liste des types du pokémon.
      const newTypes: string[] = form.types.value.concat([type]);
      newField = { value: newTypes };
    }else {
      // Si l'utilisateur décoche un type, on le retire de la liste des types du pokémon.
      const newTypes: string[] = form.types.value.filter((currentType: string) => currentType !== type);
      newField = { value: newTypes };
    }

    setForm({...form, ...{types: newField }});
  }


  // 18) On crée une nouvelle méthode  qui permettra de prendre en compte dans le state les modifications de notre formulaire
        // 18) On applique ensuite les changements dans les propriétés du DOM virtuel. Plus précisément n ajoute l'attribut name="name" aux inputs dans les parties pokemon name pokemon hp et pokemon cp puis sur la même ligne on ajoute l'événement onChange
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const fieldName: string = e.target.name;
     const fieldValue: string = e.target.value;
     const newField: Field = {[fieldName]: { value: fieldValue }};

    setForm({...form, ...newField});
  }

   // 30) suite) Ajout d'une condition pour le champ picture uniquement dans le cadre d'un ajout (et non d'une édition). Voir ensuite la règle de validation dans Validator url
   const isAddForm = () => {
    return !isEditForm;
  }


  // 20) On crée une méthode ValidateForm qui vérifie le respect de chaque champ du formulaire
  const validateForm = () => {
    let newForm: Form = form;

  // Validator url
    if(isAddForm()) {
      const start = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
      const end = ".png";

      if(!form.picture.value.startsWith(start) || !form.picture.value.endsWith(end)) {
        const errorMsg: string = "L\'url n\'est pas valide.";
        const newField: Field = { value: form.picture.value, error: errorMsg, isValid: false };
        newForm = { ...newForm, ...{ picture: newField } };
      } else {
        const newField: Field = { value: form.picture.value, error: '', isValid: true };
        newForm = { ...newForm, ...{ picture: newField } };
      }
    }
 
 

  // Validator name
    if(!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) {
      const errorMsg: string = 'Le nom du pokémon est requis (1-25).';
      const newField: Field = { value: form.name.value, error: errorMsg, isValid: false };
      newForm = { ...newForm, ...{ name: newField } };
    } else {
      const newField: Field = { value: form.name.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ name: newField } };
    }

    // Validator hp
    if(!/^[0-9]{1,3}$/.test(form.hp.value)) {
      const errorMsg: string = 'Les points de vie du pokémon sont compris entre 0 et 999.';
      const newField: Field = {value: form.hp.value, error: errorMsg, isValid: false};
      newForm = { ...newForm, ...{ hp: newField } };
    } else {
      const newField: Field = { value: form.hp.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ hp: newField } };
    }

    // Validator cp
    if(!/^[0-9]{1,2}$/.test(form.cp.value)) {
      const errorMsg: string = 'Les dégâts du pokémon sont compris entre 0 et 99';
      const newField: Field = {value: form.cp.value, error: errorMsg, isValid: false};
      newForm = { ...newForm, ...{ cp: newField } };
    } else {
      const newField: Field = { value: form.cp.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ cp: newField } };
    }

    setForm(newForm);
    return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
  }

  // 20) suite) On crée une méthode isTypesValide qui vérifie le respect du champ des types du formulaire
  const isTypesValid = (type: string): boolean => {
    // Cas n°1: Le pokémon a un seul type, qui correspond au type passé en paramètre.
    // Dans ce cas on revoie false, car l'utilisateur ne doit pas pouvoir décoché ce type (sinon le pokémon aurait 0 type, ce qui est interdit)
    if (form.types.value.length === 1 && hasType(type)) {
      return false;
    }
    
    // Cas n°2: Le pokémon a au moins 3 types.
    // Dans ce cas il faut empêcher à l'utilisateur de cocher un nouveau type, mais pas de décocher les types existants.
    if (form.types.value.length >= 3 && !hasType(type)) { 
      return false; 
    } 
    
    // Après avoir passé les deux tests ci-dessus, on renvoie 'true', 
    // c'est-à-dire que l'on autorise l'utilisateur à cocher ou décocher un nouveau type.
    return true;
  }

  // 19) après importation du hook useHistory, on le récupère dans une constante, puis on déclare la méthode HandleSubmit pour gérer le comportement de soumission du formulaire. On lie l'événement onSubmit du formulaire à notre méthode de gestionnaire d'événement du formulaire HandleSubmit à la première ligne du return dans l'élément form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // on bloque le comportement natif afin de gérer nous-même la soumission du formulaire
    // console.log(form); // on affiche les données du state du formulaire dans la console du navigateur
    const isFormValid = validateForm();   // 20) suite) (on met la ligne au dessus en commentaire car ici on n'en a pas besoin) On récupère le résultat de la validation de nos champs
    
    // 20) suite) On effectue le redirection vers la page de détail d'un pokémon seulement si le formulaire est valide
      // 24) Avant la redirection, on récupère les dernières données du formulaire depuis le state puis on les pousse dans l'API Rest
    if(isFormValid) {
      pokemon.picture = form.picture.value; // On ajoute la champ de l'image pour récupèrer les modifications effectuées sur ce champ
      pokemon.name = form.name.value; // 24) On récupère le nom depuis le state
      pokemon.hp = form.hp.value;
      pokemon.cp = form.cp.value;
      pokemon.types = form.types.value;
      //history.push(`/pokemons/${pokemon.id}`); // on redirige l'utilisateur vers la page de détail d'un pokémon
     // PokemonService.updatePokemon(pokemon).then(() => history.push(`/pokemons/${pokemon.id}`)); // On pousse les données avec updatePokemon puis on redirige avec le hook useHistory // mis en commentaire car on l'applique dans la constante updatePokemon question 31)

      isEditForm ? updatePokemon() : addPokemon(); // Selon le choix on appelle soit update soit add

      
    }
  }

  // 31) Déxlaration de addPokemon pour l'ajout; et de updatePokemon pour l'édition
    const addPokemon = () => {
      PokemonService.addPokemon(pokemon).then(() => history.push(`/pokemons`));
    }

    const updatePokemon = () => {
      PokemonService.updatePokemon(pokemon).then(() => history.push(`/pokemons/${pokemon.id}`)); // On pousse les données avec updatePokemon puis on redirige avec le hook useHistory
    }

  // 25) On implémente la méthode deletePokemon permettant de supprimer un pokémon. Ensuite; dans le DOM virtuel, on ajoute l'icone de suppression d'un pokémon juste en dessous de (la ligne de) l'image du pokemon
  const deletePokemon = () => {
    PokemonService.deletePokemon(pokemon).then(() => history.push(`/pokemons`));
  }

  // 21) On affiche (voir après les inputs des champs dans le DOM virtuel) des messages d'erreurs si les champs ne sont pas bien renseignés

  // 30) suite) on affiche l'image du pokémon uniquement dans le cas d'une édition (à la ligne où on ajoute isEditForm && ce qu'il y avait avant)
     // 30) suite) on ajoute le champ de l'image du pokémon uniquement dans le cas d'un ajout (/* Pokemon picture */)
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            {isEditForm && ( 
            <div className="card-image">
              <img src={pokemon.picture} alt={pokemon.name} style={{width: '250px', margin: '0 auto'}}/>
              <span className="btn-floating halfway-fab waves-effect waves-light">
                <i onClick={deletePokemon} className="material-icons">delete</i>
              </span>
            </div>
            )}          
            <div className="card-stacked">
              <div className="card-content">
                {/* Pokemon picture */}
                {isAddForm() && ( 
                  <div className="form-group">
                  <label htmlFor="name">Image</label>
                  <input id="picture" name="picture" type="text" className="form-control" value={form.picture.value} onChange={e => handleInputChange(e)}></input>
                  {/* error */}
                  {form.picture.error &&
                  <div className="card-panel red accent-1"> 
                   {form.picture.error} 
                  </div>} 
                </div>
                )}               
                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input id="name" name="name" type="text" className="form-control" value={form.name.value} onChange={e => handleInputChange(e)}></input>
                  {/* error */}
                  {form.name.error &&
                  <div className="card-panel red accent-1"> 
                   {form.name.error} 
                  </div>} 
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input id="hp" name="hp" type="number" className="form-control" value={form.hp.value} onChange={e => handleInputChange(e)}></input>
                  {/* error */}
                  {form.hp.error &&
                  <div className="card-panel red accent-1"> 
                   {form.hp.error}
                  </div>}
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input id="cp" name="cp" type="number" className="form-control" value={form.cp.value} onChange={e => handleInputChange(e)}></input>
                  {/* error */}
                  {form.cp.error &&
                  <div className="card-panel red accent-1"> 
                   {form.cp.error}
                  </div>}
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map(type => (
                    <div key={type} style={{marginBottom: '10px'}}>
                      <label>
                        <input id={type} type="checkbox" className="filled-in" value={type} disabled={!isTypesValid(type)} checked={hasType(type)} onChange={e => selectType(type, e)}></input>
                        <span>
                          <p className={formatType(type)}>{ type }</p>
                        </span>
                      </label>
                    </div>
                  ))}  
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">Valider</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
   
export default PokemonForm;