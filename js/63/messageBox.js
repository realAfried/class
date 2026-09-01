
export default function(msg, buttons = ['OK'],callback = () => {}){

    const div = document.createElement('div');
    const msgDiv = document.createElement('div');
    msgDiv.innerText = msg;
    msgDiv.style.overflow = 'auto';
    msgDiv.style.height = '6.5em';
    div.appendChild(msgDiv); 

    div.style.backgroundColor = 'lightcyan';
    div.style.border = '1px solid black';
    div.style.padding = '1em';
    div.style.boxSizing = 'border-box';
    div.style.height = '8.5em';
    div.style.width = '15em';
    div.style.position = 'absolute';
    div.style.top ='50%';
    div.style.left ='50%';
    div.style.marginTop = '-4.5em';
    div.style.marginLeft = '-7.5em';


    const buttonDiv = document.createElement('div');

    buttons.forEach(element => {
        const okButton = document.createElement('button');
        okButton.innerText = element;
        okButton.addEventListener('click', ()=>{
            div.remove();
            callback(element);
        });
        buttonDiv.appendChild(okButton);
    });
  

    // okButton.innerText = 'OK';

    // okButton.addEventListener('click', ()=>{
    //    div.remove();
    // });
    buttonDiv.style.position = 'absolute';
    buttonDiv.style.width = '100%';
    buttonDiv.style.bottom = '1em';
    buttonDiv.style.left ='0';
    buttonDiv.style.textAlign = 'center';



    // buttonDiv.appendChild(okButton);
    div.appendChild(buttonDiv);
    document.body.appendChild(div);
}