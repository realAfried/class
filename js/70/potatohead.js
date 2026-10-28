const tray = document.querySelector('#tray');
const play = document.querySelector('#play');
let savedLoclImg =JSON.parse(localStorage.getItem('places')) ?? [];

async function fetchJson(url){
    const data = await fetch(url);
    if(!data.ok) {
        throw new Error(`${data.status} ${data.statusText}`);
    }
    return await data.json();
}

async function loadTray(url){
     try{
        const parts = await fetchJson(url);
        
        let classAdd = "tray-part";
        parts.forEach(part => {
             tray.insertAdjacentHTML('beforeend', `<img title="${part.name}" class="${classAdd}" src="${part.src}">`);
        });
    } catch(e) {
         console.error('oops', e);
    }
};

await loadTray("parts.json");


let zIndex = 1;
let offset;
let draggee = null;
const STORAGE_KEY = 'data';
let savedImg = [];


window.addEventListener('mousedown', e=>{
    if(e.target.classList.contains('tray-part')){
        e.preventDefault();

        offset = { x: e.offsetX, y: e.offsetY };
        
        window.addEventListener('mousemove', handleMouseMove);

        window.addEventListener('mouseup', handleMouseUp);

       
        const part = document.createElement('img');
        draggee = part;
        handleMouseMove(e);
        part.src = e.target.src;
        part.classList.add('board-part');
        if(e.target.title === "Body"){
            part.classList.add('img-body');
        }
        part.style.zIndex = zIndex++;
        play.appendChild(part);

        savedImg.push(part);
            
    };

      if(e.target.classList.contains('board-part')){
        e.preventDefault();

        offset = { x: e.offsetX, y: e.offsetY };
        
        window.addEventListener('mousemove', handleMouseMove);

        window.addEventListener('mouseup', handleMouseUp);
       
        draggee = e.target;;
        draggee.style.zIndex = zIndex++;
        savedImg.push(part);
    }
});

function handleMouseMove(e) {
  const rect = play.getBoundingClientRect();

  draggee.style.top = `${e.clientY - rect.top - offset.y}px`;
  draggee.style.left = `${e.clientX - rect.left - offset.x}px`;
}

function handleMouseUp(e) {
    const rect = play.getBoundingClientRect();  
    if(e.clientX < rect.left){
        draggee.remove();
    }

   const parts = savedImg.map(p =>{
            return{
                src: p.src,
                left: p.style.left,
                top: p.style.top,
                zIndex: p.style.zIndex,
                class: p.className

            }
        }
   )

    
    localStorage.setItem('places', JSON.stringify(parts));

  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseup', handleMouseUp);
}


async function loadSaved(parts){
     try{
        
        parts.forEach(part => {
             play.insertAdjacentHTML('beforeend',`<img src="${part.src}" class="${part.class}" style=" left:${part.left}; top:${part.top}">`)
        });
    } catch(e) {
         console.error('oops', e);
    }
};

// document.querySelector('#load').addEventListener('click',async ()=>{
    await loadSaved(savedLoclImg);
//     savedLoclImg =[];
// });


const backgrounds = await fetchJson('backgrounds.json')
let num = 0;
document.querySelector('#background').addEventListener('click',async e=>{
    play.style.backgroundImage = `url('${backgrounds[num].src}')`;

    num++
    if(num >= backgrounds.length){
        num = 0;
    }
});