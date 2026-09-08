function getElement(selector){
    return document.querySelectorAll(selector);
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
    },speed);
    setTimeout(()=>{
    clearInterval(interval)
    },time);

}

function addClass(element, className){
    element.classList.add(className);
}

function setText(element, string){
    element.innerText = string;
}

function getText(element){
    return element.innerText;
}

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777217).toString('16').padStart(6, '0')}`;
}

function foreachHelper(elements, callback){
    if(elements && elements.length){
        elements.forEach(callback);
    }
}

export default function(selector){
    const elements = getElement(selector);

    return{
        text(string){
              if(arguments.length < 1){
                return getText(elements[0]);
            }else{
                foreachHelper(elements, (element)=>{ setText(element,string)});
                return this;
            }
        },
        css: function(property, value){
            if(arguments.length < 2){
                return getCss(elements[0], property);
            }else{
                foreachHelper(elements, (element)=>{ setCss(element, property, value) });
                return this;
            }
        },
        on(eventType, callback){
            foreachHelper(elements, (element)=>{ on(element,eventType,callback)});  
            return this;
        },
        click(callback){
            foreachHelper(elements, (element)=>{ click(element,callback)});     
            return this;
        },
        hide(){
            foreachHelper(elements, (element)=>{ setCss(element,'display', 'none')});
            return this;
        },
        display(){
            foreachHelper(elements, (element)=>{ setCss(element,'display','inline-block')});
            return this;
        },
        sparkle(property, time){
            foreachHelper(elements, (element)=>{ sparkle(element,property,time)});
            return this;
        },
        addClass(className){
            foreachHelper(elements, (element)=>{ addClass(element,className)});
            return this;
        }
    };
}