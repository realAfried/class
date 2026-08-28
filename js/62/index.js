let count = 2;
// document.querySelector('#btn').addEventListener('click', createNewButton);
document.querySelector('#btnDiv').addEventListener('click',createNewButton);
const container = document.querySelector('#btnDiv');

function createNewButton(){
    const myNewBtn = document.createElement('button');
    myNewBtn.textContent = count++;
    container.appendChild(myNewBtn);
    // myNewBtn.addEventListener('click',createNewButton);
    
    return myNewBtn;
}

