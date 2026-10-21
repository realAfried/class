const recipeSelecet = document.querySelector("#recipeSelect");
const showRecipe = document.querySelector("#showRecipe");
const nameRecipe = document.querySelector("#name");
const imgRecipe = document.querySelector("#imgRecipe");
const ing = document.querySelector("#ing");

async function fetchJson(url){
    const data = await fetch(url);
    if(!data.ok) {
        throw new Error(`${data.status} ${data.statusText}`);
    }
    return await data.json();
}

async function load2(){
    try{
        const list = await fetchJson('recipes.json');

        list.forEach(e => {
            const option = document.createElement('option');
            option.value = e.id;
            option.innerText = e.name
            recipeSelecet.appendChild(option);
        });
    } catch(e) {
        console.error('oops', e);
    }
}

load2();

recipeSelecet.addEventListener('change',async ()=>{
    const fileName = recipeSelecet.value + '.json'
     try{
        const loaded = await fetchJson(fileName);
        showRecipe.style.display = 'block'
        nameRecipe.innerText = loaded.name
        imgRecipe.src = loaded.picture

        ing.replaceChildren();

        loaded.ingredients.forEach(e => {
            const li = document.createElement('li');
            li.innerText = e;
            ing.appendChild(li);
        });
    } catch(e) {
         console.error('oops', e);
    }
})

/* recipeSelecet.addEventListener('change',async ()=>{
    const fileName = recipeSelecet.value + '.json'
    // console.log(fileName)
     try{
        const response = await fetch(fileName);

        if(!response.ok) {
        throw new Error('error');
        }

        const loaded = await response.json();
        showRecipe.style.display = 'block'
        nameRecipe.innerText = loaded.name
        imgRecipe.src = loaded.picture

        ing.replaceChildren();

        loaded.ingredients.forEach(e => {
            const li = document.createElement('li');
            li.innerText = e;
            ing.appendChild(li);
        });

        console.log(loaded);

        } catch(e) {
            console.error('oops', e);
    }

}) */

/* async function load(){

    try{
        const response = await fetch('recipes.json');

        if(!response.ok) {
        throw new Error('error');
        }

        const loaded = await response.json();
        console.log(loaded);

        loaded.forEach(e => {
            const option = document.createElement('option');
            option.value = e.id;
            option.innerText = e.name
            recipeSelecet.appendChild(option);
            
        });

        } catch(e) {
            console.error('oops', e);
    }
} */

// load();


/* async function returnJson(url){
    try{
        const response = await fetch(url);

        if(!response.ok) {
        throw new Error('error');
        }
        return await response.json();
    } catch(e) {
        console.error('oops', e);
    }
}*/
 
