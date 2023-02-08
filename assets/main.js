console.log("Hello, World!");

fetch("https://api.artic.edu/api/v1/artworks/search?129884").then(function(response) {
    return response.json();
}).then(function(data) {

    console.log(data);
})