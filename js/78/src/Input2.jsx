import { useState } from "react";

export default function Input2({ onAddRecipe }) {
    const emptyForm = {
        id: "",
        name: "",
        ingredients: [""],
        picture: ""
    }
    const [data, setData] = useState(emptyForm)

    function handleSubmit(e) {
        e.preventDefault();
        onAddRecipe(data);
        setData(emptyForm);
    }

    function handleIngredientChange(i, value) {
        const copyIngArray = [...data.ingredients];
        copyIngArray[i] = value;
        setData({ ...data, ingredients: copyIngArray })
    }

    function addIngInput(){
         const newArray = [...data.ingredients,""];
         setData({ ...data, ingredients: newArray })
    }



    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input required type="text" value={data.id} onChange={e => setData({ ...data, id: e.target.value })} />
            <input required type="text" value={data.name} onChange={e => setData({ ...data, name: e.target.value })} />
            {/* <input required type="text" value={data.ingredients} onChange={e => setData({ ...data, ingredients: [e.target.value] })} /> */}


            {data.ingredients.map((ing, i) => (
                <input
                    key={i}
                    value={ing}
                    onChange={e => handleIngredientChange(i, e.target.value)}
                />
            ))}
            <button type="button" onClick={addIngInput}>add ingredient</button>

            <input required type="text" value={data.picture} onChange={e => setData({ ...data, picture: e.target.value })} />
            <button type="submit">Submit</button>
        </form>
    )
}
