function getElement(selector){
    return document.querySelector(selector);
}

function setCss(element, property, value){
    element.style[property] = value;
}

function getCss(element , property){
    return getComputedStyle(element)[property];
}

function on(element, eventType, callback){
    element.addEventListener(eventType, callback);
}

function click(element, callback){
    on(element, 'click', callback)
}

function sparkle(element,property,speed, time){
    time = time ?? 6000;
    let interval =  setInterval(()=>{
        setCss(element,property,getRandomColor());
    },speed)
    setTimeout(()=>{
    clearInterval(interval)
    },time)

}

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777217).toString('16').padStart(6, '0')}`;
}

export default function(selector){
    const element = getElement(selector);

    return{
        css: function(property, value){
            if(arguments.length < 2){
                return getCss(element,property);
            }else{
                setCss(element,property,value)
            }
        },
        on: (eventType, callback)=> on(element,eventType,callback),
        click: callback => click(element, callback),
        hide: ()=> setCss(element,'display', 'none'),
        display: ()=> setCss(element,'display','inline-block'),
        sparkle:(property, time) => sparkle(element,property,time)
        
    };
}