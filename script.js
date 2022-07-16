// api url
const api_url = 
      "https://playlist-history.herokuapp.com/lookup/";
  
// Defining async function
async function getapi(url) {

    var query_var = getQueryVariable("URL")
    if (query_var === null) {
        hideloader();
        showerror();
        return;
    }
    var split = query_var.split('?list=')
    if (split.length < 2) {
        hideloader();
        showerror();
        return;
    }
    
    // Storing response
    const response = await fetch(url + split[1]);
    
    // Storing data in form of JSON
    var data = await response.json();
    if (response) {
        hideloader();
        if(data.hasOwnProperty('error')){
            showerror();
        } else {
            show(data);
        }
        return;
    } else {
        hideloader();
        showerror();
        return;
    }
}
// Calling that async function
getapi(api_url);
  
// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}
// Function to hide the loader
function showerror() {
    document.getElementById('error_msg').innerHTML = "Invalid URL"
}
// Function to define innerHTML for HTML table
function show(data) {
    document.getElementById("table").innerHTML = JSON.stringify(data, undefined, 2);
}
// Parse Query String
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
    return null;
}