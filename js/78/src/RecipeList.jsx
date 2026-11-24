import React from 'react'

export default function RecipeList({recipes, selectedRecipe, onSelectRecipe}) {
  return (
    <select id="recipes" value={selectedRecipe} onChange={e => onSelectRecipe(e.target.value)}>
      <option hidden>select a recipe</option>
      {recipes?.map((r, index) => <option key={/*r.id*/index} value={index}>{r.name}</option>)}
    </select>
  )
}
