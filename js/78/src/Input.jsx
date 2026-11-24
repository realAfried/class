import { useState } from "react";

export default function Input({ onAddRecipe }) {
    const [id, setId] =useState('');
    const [name, setName] =useState('');
    const [ing1, setIng1] =useState('');
    const [ing2, setIng2] =useState('');
    const [ing3, setIng3] =useState('');
    const [pic, setPic] =useState('');

    function handleSubmit(e) {
        e.preventDefault()
        const addRecipe =
        {
            id:id,
            name:name,
            ingredients: [ing1,ing2,ing3],
            picture: pic
        }
        onAddRecipe(addRecipe);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                Id <input type="text" value={id} onChange={e=> setId(e.target.value)}></input>
            </div>
            <div>
                Name <input type="text" value={name} onChange={e=> setName(e.target.value)}></input>
            </div>
            <div>
                Ingredient 1 <input type="text" value={ing1} onChange={e=> setIng1(e.target.value)}></input>
            </div>
            <div>
                Ingredient 2 <input type="text" value={ing2} onChange={e=> setIng2(e.target.value)}></input>
            </div>
            <div>
                Ingredient 3 <input type="text" value={ing3} onChange={e=> setIng3(e.target.value)}></input>
            </div>
            <div>
                Picture <input type="text" value={pic} onChange={e=> setPic(e.target.value)}></input>
            </div>
            <button>Add Recipe</button>

        </form>
    )
}
