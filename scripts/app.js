import * as http from './http.js'
import * as view from './view.js'
import * as controls from './controls.js'

//Model
//Tell view to render page > GET data from reddit > Display accordingly

const BASE_URL = `https://www.reddit.com`;

const title = document.getElementById('title');
const rTech = document.getElementById('tech');
const rWorldNews = document.getElementById('worldnews');
const rTechnology = document.getElementById('technology');
const rUpliftingNews = document.getElementById('upliftingnews');
const rFuturology = document.getElementById('futurology');
const rScience = document.getElementById('science');
let list = [rTech, rWorldNews, rTechnology, rUpliftingNews, rFuturology, rScience];

let userChoices = [];
let uniqueID = 'client';
let oldDataParsed = false;

function setUp(){
    view.displayTitle(title);
    controls.initControls();
    getDataInit(list);
}

window.onload = setUp();


//Gets initial data for default subreddits...Calls view.formatData
async function getDataInit(listOfSubreddits){
    //get reddit posts to display
    for(let i=0; i<listOfSubreddits.length; i++){
        let divID = listOfSubreddits[i].id;
        let responseData = await http.makeGETRequest(BASE_URL + "/r/" + divID + "/top.json?t=day&limit=3");
        let imgURL = await getDefaultImage(divID);
        view.formatData(divID, imgURL, responseData);
    }
}

async function getNewData(inputText){
    let newArticle = view.addUserChoice(inputText);
    document.getElementById('client-selection').appendChild(newArticle);
    list.push(newArticle);
    let preSubredditRender = newArticle;
    let divID = preSubredditRender.id;
    let responseData = await http.makeGETRequest(BASE_URL + "/r/" + divID + "/top.json?t=day&limit=3");
    let imgURL = await getDefaultImage(divID);
    view.formatData(divID, imgURL, responseData);
}

async function getDefaultImage(divID){
    /* 
    GET /r/subreddit/about
    Return information about the subreddit.
    Data includes the subscriber count, description, and header image.
    I will use the header img.
    */
    const response = await http.makeGETRequest(BASE_URL + "/r/" + divID + "/about.json");
    let img;

    if(response.data.banner_img == ''){
        let preImg = response.data.banner_background_image.split("?");
        img = preImg[0];   //returns url of img
    }else{
        img = response.data.banner_img;   //returns url of .png
    }
    return img;
}

export function getUserChoice(){
    const inputText = document.getElementById('input-text').value;
    userChoices.push(inputText);
    
    console.log(userChoices);
    document.getElementById('input-text').value = '';
    getNewData(inputText);
}


export function updateClient(){
    // if(uniqueID == 'client'){
    //     uniqueID = document.getElementById('UniqueID').value;
    // }
    if(JSON.parse(window.localStorage.getItem(uniqueID)) && oldDataParsed==false){
        //window.localStorage.setItem(uniqueID, JSON.stringify(userChoices));
        //if it exists, get it
        userChoices = JSON.parse(localStorage.getItem(uniqueID) || "[]");
        for(let i=0; i<userChoices.length; i++){
            getNewData(userChoices[i]);
        }
        oldDataParsed = true;
    }else{
        //This section should only be called for each new item a unique user adds or removes
        window.localStorage.setItem(uniqueID, JSON.stringify(userChoices));
    }
}

export function clearAll(){
    document.getElementById('client-selection').innerHTML = ``;
    userChoices = [];
    window.localStorage.removeItem(uniqueID);
}


export async function getComments(postName){
    //get rid of first 3 chars 't3_faksdfas' where t3_ says the type of element 
    postName = postName.substring(3);
    const responseData = await http.makeGETRequest(BASE_URL + "/comments/" + postName + "/top.json?limit=10");
    let indexer = 0;

    //Since there are many subreddits that have bot mods post comments at the top,
    //I check the JSON data coming in for a 'distinguished' variable which
    //says if the poster of the comment is a moderator or not.
    if(responseData[1].data.children[indexer].data.distinguished == 'moderator'){
        indexer++;
    }
    let text = responseData[1].data.children[indexer].data.body;
    let author = responseData[1].data.children[indexer].data.author;
    return text + " ... -" + author;
}