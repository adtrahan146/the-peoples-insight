//Views
//Render News layout here
import { getComments } from "./app.js";

const today = new Date();
const todaysDate = (today.getMonth()+1)+'-'+ today.getDate() +'-'+today.getFullYear();

export function displayTitle(selectedHTMLElement){
    selectedHTMLElement.innerHTML = `<h1>The People's Insight<br>${todaysDate}<hr></h1>`;
}

export async function formatData(divID, imgURL, responseData){
    //json data from reddit comes as: body.data.children
    const postTitle = responseData.data.children[0].data.title;
    const subreddit = responseData.data.children[0].data.subreddit;
    const newsLink = responseData.data.children[0].data.url;

    const postName = responseData.data.children[0].data.name;
    let topComment;
    try{
        topComment = await getComments(postName);
    }catch(err){
        return;
    }
    let thumbnail = imgURL;
    //{BASE_URL}/comments/{postName}.json?sort=top

    if(!responseData.data.children[0].data.thumbnail == ''){
        //put default thumbnail from somewhere
        thumbnail = responseData.data.children[0].data.thumbnail;
    }
    document.getElementById(divID).innerHTML = (`
        <h2 class='subreddit'>r/${subreddit}</h2>
        
        <img id='thumbnail' class='img-thumbnail' src='${thumbnail}'></img>
        
        <h5 class='post-title lead'>${postTitle}<h5>
        
        <h5 class='text-muted'>Top Comment:</h5>
        <p class='top-comment text-muted'>${topComment}</p>
        
        <a class='news-link' href='${newsLink}'>
            <button class='btn btn-secondary btn-sm'>Learn More</button>
        </a>
        
    `);
}

export function addUserChoice(inputText){
    let newArticle = document.createElement('div');
    newArticle.id = inputText;
    newArticle.className = 'col';

    return newArticle;
}