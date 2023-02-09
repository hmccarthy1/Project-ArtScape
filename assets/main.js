console.log("Hello, World!");

fetch("https://api.artic.edu/api/v1/artworks/search?q=starrynight").then(function(response) {
    return response.json();
}).then(function(data) {

    console.log(data);
})
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, options);
  });

  $(document).ready(function(){
    $('.datepicker').datepicker();
  });