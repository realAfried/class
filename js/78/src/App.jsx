import './App.css';
import Header from './Header';
import NoRecipe from './NoRecipe';
import Recipe from './Recipe';
import { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
// import Input from './Input';
import Input2 from './Input2';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(0);
  const [addButton, setaddButton] = useState(false);
  // const [setAddRecipes] =useState()

  /*  const addRecipe = 
     {
       id: 4,
       name: 'macaroni test',
       ingredients: ['eggs', 'water'],
       picture: 'images/macaroni.jpg'
     } */

  function handleAddRecipe(recipe) {
    setRecipes([...recipes, recipe]);
    setaddButton(false)
  }


  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('recipes.json');
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const result = await response.json();
        // console.log(result);
        // setRecipes([...result, addRecipe]);
        setRecipes(result)
      }
      catch (e) {
        console.error('ooops', e);
      }
    })();
  }, []);

  console.log(recipes);

  return (
    <>
      <Header />

      <RecipeList recipes={recipes} selectedRecipe={selectedRecipe} onSelectRecipe={setSelectedRecipe} />

      <NoRecipe />
      <Recipe recipe={recipes[selectedRecipe] ?? {}} />
      {/* <Input onAddRecipe={handleAddRecipe}/> */}
      {/* {!addButton &&<button onClick={()=> setaddButton(true)}>add a new recipe</button>}
      {addButton && <Input2 onAddRecipe={handleAddRecipe}/>} */}

      {addButton
        ? <Input2 onAddRecipe={handleAddRecipe} />
        : <button onClick={() => setaddButton(true)}>add a new recipe</button>}
    </>
  )
}
