import { getUserChoice, updateClient } from './app.js';

export function initControls(){
    const input = document.createElement("div");
    const identifier = document.createElement("span");

    identifier.className = 'input-field-div';
    input.className = 'input-field-div';
    input.style = 'width: fit-content; font-size: 65%;';
    identifier.style = 'width: fit-content; font-size: 65%;';
    input.innerHTML = (`
        <input class='mx-1' id="input-text" type="text" placeholder="Add your own! (omit 'r/')"></input>
        <input class='mx-1 btn' id="submit-button" type="button" value="Submit"></input>
        <input class='mx-1 btn btn-danger' id="remove-button" type="button" value="Clear"></input>
        <hr>
    `);
    identifier.innerHTML = (`
        <input class='mx-1' id="UniqueID" type="text" placeholder="News For: " value=""></input>
        <input class='mx-1 btn' id="idCheck" type="button" value="Load/Save"></input>
        <hr>
    `);
    document.getElementById('lead').appendChild(identifier);
    document.getElementById('lead').appendChild(input);
    document.getElementById('remove-button').addEventListener('click', clearAll);
    document.getElementById('submit-button').addEventListener('click', getUserChoice);
    document.getElementById('idCheck').addEventListener('click', updateClient);
}

function clearAll(){
    document.getElementById('client-selection').innerHTML = ``;
    const rmName = document.getElementById('UniqueID').value;
    window.localStorage.removeItem(rmName);
}