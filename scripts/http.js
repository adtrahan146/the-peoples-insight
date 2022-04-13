//To make GET requests to all subreddit endpoints

export const makeGETRequest = async (url) => {
    const options = new Object();
    options.method = "GET";
    options.mode = 'cors';
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

//makePUTrequest -- Was testing with JSONBin, but will implement later to make full stack
// export const makePUTrequest = async (url, data) =>{
//     const options = new Object();
//     options.method = "PUT";
//     options.headers = {"Content-type": "application/json"};
//     options.body = JSON.stringify(data);
//     const response = await fetch(url, options);
//     return response;
// }

// export const makeJSONPutRequest = async (url, data) =>{
//     const options = new Object();
//     options.method = "PUT";
//     options.headers = {"Content-type": "application/json"};
//     options.body = JSON.stringify(data);
//     const response = await fetch(url, options);
//     return response;
// }