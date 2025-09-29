import React, { FunctionComponent } from 'react';
//import React, { FunctionComponent, useEffect, useState } from 'react';
//import Pokemon from './models/pokemon';
//import POKEMONS from './models/mock-pokemon';
import PokemonList from './pages/pokemon-list';
import PokemonDetail from './pages/pokemon-detail';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; // 14) importation à partir de la librairie 'react-router-dom'
/*
Pour les importations de la question n° 14 (ligne ci-dessus) nous avons:
L'élément Router permet de mettre en place notre système de navigation.
L'élément Switch permet d'afficher le contenu d'une seule route à la fois'.
L'élément Route permet de décrire chaque route de notre application.
*/
import PageNotFound from './pages/page-not-found';// 15) importation de la page d'erreur
import PokemonEdit from './pages/pokemon-edit';// 16) importation du composant pokemon-edit.tsx puis déclaration (plus bas dans le switch) d'une nouvelle route pour cet édition de pokemon

import PokemonAdd from './pages/pokemon-add';// 26) importation du composant pokemon-add.tsx puis ajout d'une nouvelle route pour cet ajout de pokemon
import Login from './pages/login'; // 31) importation du composant login.tsx puis ajout de la route de la page de connexion
import PrivateRoute from './PrivateRoute'; // 32) importation du composant PrivateRoute.tsx puis adaptation dans Switch pour gèrer la page de connexion par rapport aux autres routes


const App: FunctionComponent = () => {
// const name: String = 'React'; // code Hello World
// const name: any = 'React';  // Code de Tra via "any"

//const [name, setName] = useState<String>('React'); // Crochets pour le destructuring et String pour typer les données indiqué à notre state


/* 

A faire 1 --> Créer un état pour gérer les pokémons:

    (avant tout ne pas oublier l'étape d'importation --> cf ligne 2)
    Définir une variable d'état nommé pokemons dans le composant App.tsx
    Initialiser cet état avec la liste des pokemon contenus dans la constante pokemons
    Typer l'état pokemons afin qu'il contienne un tableau de pokemon
    enfin Afficher le nombre de pokémon présents dans notre state (dans l'état du composant) à l'utilisateur

    c'est à dire que notre composant App.tsx ne doit plus afficher Hello React mais plutôt "il y a 12 pokemons dans votre composant "

*/

//const [pokemons] = useState<Pokemon[]>(POKEMONS); // correction 1

/* 

A faire 2--> Ajouter un hook d'effet:

    (avant tout ne pas oublier l'étape d'importation --> cf ligne 2)
    Initialiser le state avec un tableau vide:[]
    Charger la liste POKEMONS du composant à l'initialisation dans le state
    Veiller à ce que la liste des pokémons ne soit chargée dans le state qu'une seule fois

*/

// Pour la partie 4: passer une prop depuis un composant: on n'a pas besoin de la correction 2 
/*
const [pokemons, setPokemons] = useState<Pokemon[]>([]); // correction 2

useEffect(()=>{
        setPokemons(POKEMONS);
    },[]);

*/
 return (

 //   <div> 
  //      <h1>Pokédex</h1>
  //      <p>Il y a {pokemons.length} pokémons dans le Pokédex.</p>
//   </div>
   
  //<h1>Hello World Test, {name} !</h1> // code Hello World

/* 

A faire 3--> Afficher la liste des pokémons:

    Pour cela nous devrons utiliser la méthode javascript "map"

*/

// correction 3
/*
<div>
    <h1 className="center">Pokédex</h1>
    <div className="container">
      <div className="row">    
        {pokemons.map(({id, name, picture, created}) => (
        <div className="col s6 m4" key={id}>
          <div className="card horizontal">
            <div className="card-image">
                <img src={picture} alt={name}/>  
            </div>
            <div className="card-stacked">
                <div className="card-content">
                    <p>{name}</p>
                    <p><small>{created.toString()}</small></p>
                </div>
            </div>
        </div>
    </div>  
    ))}
    </div>
  </div>
</div>
  */

// 14) On modifie le composant de la racine pour gérer les routes (on modifie le return et donc la partie 4 n'est plus prise en compte ici)

/*
// Partie 4: Passez une prop depuis le composant

<PokemonList />
*/

<Router>
  <div>
    {/* La barre de navigation commune à toutes les pages */}
    <nav>
      <div className="nav-wrapper teal">
        <Link to="/" className="brand-logo center">Pokédex</Link>
      </div>
    </nav>
    {/* Le système de gestion des routes de notre navigation */}
    <Switch>
      <PrivateRoute exact path="/" component={PokemonList} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/pokemons" component={PokemonList} />
      <PrivateRoute exact path="/pokemon/add" component={PokemonAdd}/>
      <PrivateRoute exact path="/pokemons/edit/:id" component={PokemonEdit} />
      <PrivateRoute path="/pokemons/:id" component={PokemonDetail} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
</Router>

 ) 
}
  
export default App;

/*
// Composant  de Classe
import React from 'react';

export default class App extends React.Component{
    const name: string = "React";

    render(){
        return <h1>Hello, {name}</h1>;
    }
}
*/



