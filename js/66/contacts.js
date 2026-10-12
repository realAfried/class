function getElement(selector) {
  return document.querySelector(selector);
}

function setCss(element, property, value) {
  // element.style.property = value;
  element.style[property] = value;
}

function on(element, eventType, callback) {
  element.addEventListener(eventType, callback);
}

function click(element, callback) {
  on(element, 'click', callback);
}

const contactsTable = getElement('#contactsTable tbody');
const addContactForm = getElement('#addContact');
const firstInput = getElement('#first');
const lastInput = getElement('#last');
const emailInput = getElement('#email');
const phoneInput = getElement('#phone');
const addContactButton = getElement('#add');
let contacts = [];
let loadedContacts = [];


function hideAddContactForm() {
  setCss(addContactForm, 'display', 'none');
  addContactForm.reset();
  setCss(addContactButton, 'visibility', 'visible');
}

on(addContactForm, 'submit', e => {
  e.preventDefault();

  const newContact = {
    first: firstInput.value,
    last: lastInput.value,
    email: emailInput.value,
    phone: phoneInput.value
  };

  // loadTheContacts([newContact]);
  loadTheContacts(newContact);

  hideAddContactForm();
});

click(addContactButton, () => {
  setCss(addContactForm, 'display', 'block');
  setCss(addContactButton, 'visibility', 'hidden');
});

click(getElement('#cancel'), hideAddContactForm);

const load = getElement('#load');

load.addEventListener('click', async () => {

  try {
    const response = await fetch('contacts.json');
    const data = await response.json();

    if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText} - ${data.message}`);
    }

    // loadedContacts = data;
    // loadTheContacts(loadedContacts);
    data.forEach(loadTheContacts);
  }catch (error) {
    console.error('Error loading contacts:', error);
  }
});

function loadTheContacts(contact) {
  
  // loadedContacts.forEach(contact => {
    if (!contacts.length) {
    contactsTable.innerHTML = '';
    }

    const newContact = {
      first: contact.first,
      last: contact.last,
      email: contact.email,
      phone: contact.phone
    };

    contacts.push(newContact);
    const row = contactsTable.insertRow();
  
    row.innerHTML = `
      <td>${contact.first}</td>
      <td>${contact.last}</td>
      <td>${contact.email}</td>
      <td>${contact.phone}</td>
      <td><button>delete</button></td>
    `;

    row.querySelector('button').addEventListener('click', () => {
      row.remove();

    contacts = contacts.filter(c => c !== newContact);

    if (!contacts.length) {
      contactsTable.innerHTML = `<tr>
          <td colspan="5">no contacts loaded</td>
        </tr>`;
    };
  });
// });
}
