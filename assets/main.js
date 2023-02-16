
// sets index

var varIndex = 0
var objArray;
var selectedItem;
var imagePath;
var maxLength;
var currentIndex;
// get various elements
var search = $("#searchText")
var searchBtn = $('#searchButton')
var tabRight = $('#nextButton')
var tabLeft = $('#previousButton')
var mainImage = $('#mainImg');
var imageTitle = $('#imageTitle');
var paginationChildren = $(".pagination").children('li');
var artistName = $("#artistName");
console.log(paginationChildren);
var createdOn = $("#dateCreated");
var artworkDescription = $('#artDescription')

var artArray = [

    $('#artwork1'),
    $('#artwork2'),
    $('#artwork3')


]

var artistArray = [

    $('#artist1'),
$('#artist2'),
$('#artist3')


];


$('li').click(function(target) {
    $( paginationChildren[varIndex]).removeClass('active');

    varIndex = $(target.currentTarget).data('descr')
    console.log($(target.currentTarget).data('descr'));
    $( paginationChildren[varIndex]).addClass('active');

    updateInfo();

})


function fetchSecondApi(id, results) {
    fetch("https://api.artic.edu/api/v1/artworks/" + id).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log("SECOND API DATA: " + data.data)
        objArray[currentIndex].artist = data.data.artist_title;
        objArray[currentIndex].dateCreated = data.data.date_end;
        objArray[currentIndex].image_id = data.data.image_id;
        objArray[currentIndex].artworkDescription = data.data.thumbnail.alt_text
        
       
        currentIndex++;
        if (currentIndex < maxLength) {
            fetchSecondApi(results[currentIndex].id, results)
        } else updateInfo();
    })
    
}

// Search button function
searchBtn.click(function () {
    fetch("https://api.artic.edu/api/v1/artworks/search?q=" + search.val()).then(function(response) {
    return response.json();
}).then(function(data) {
    

    objArray = data.data;
    if (objArray.length < 1) { 
        
    $('#modalText').html('No Results Found')
    $('#mainModal').removeClass('hidden');
    $('.overlay').removeClass('hidden');
    $('.overlay').css('display', 'block'); return }
    else {
    console.log((objArray))
    maxLength = data.data.length;   
    currentIndex = 0;
    fetchSecondApi(objArray[0].id, objArray)
}})})


function updateInfo() {
    console.log(objArray)

           

           
                imageTitle.html("Artwork Name: " + objArray[varIndex].title + "( " + objArray[varIndex].dateCreated + " ) ");
                artistName.html("Artist Name: " + objArray[varIndex].artist);
                createdOn.html("Created On: " + objArray[varIndex].dateCreated)
                console.log(JSON.stringify(objArray))
                imagePath = objArray[varIndex].image_id;
                console.log(mainImage)
                console.log(imagePath);
                mainImage.attr('src', "https://www.artic.edu/iiif/2/" + imagePath + "/full/843,/0/default.jpg");
                artworkDescription.html(objArray[varIndex].artworkDescription)



                fetch("https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=" + objArray[varIndex].title)
                    .then(function (response) {
                        return response.json()
                    }).then(function (data) {
                        console.log(data);

                        for (var i = 0; i < 3; i++) {
                            console.log(data[1][i]);
                            console.log(data[3][i])
                            if(data[1][i] == undefined || data[1][i] == "") {
                                artArray[i].html("");
                                artistArray[i].html("");
                            } else {  
                                artArray[i].html(data[1][i]);
                            
                                artArray[i].attr('href', data[3][i]);
                                
                            };

                            
                            
                        }

                    


                    }).then(function() {

                        
                        fetch("https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=" + objArray[varIndex].artist)
                    .then(function (response) {
                        return response.json()
                    }).then(function (data) {
                        console.log(data);

                        for (var i = 0; i < 3; i++) {
                            console.log(data[1][i]);
                            console.log(data[3][i])
                            if(data[1][i] == undefined || data[1][i] == "") {
                                artArray[i].html("");
                                artistArray[i].html("");
                            } else {  
                                artistArray[i].html(data[1][i]);
                            
                                artistArray[i].attr('href', data[3][i]);
                                
                            };

                            
                            
                        }

                    
                    })})
                }




        
;



tabRight.click(function () {

    if (varIndex < objArray.length - 1) {

        varIndex++;
        console.log(paginationChildren[varIndex -1 ])
       $( paginationChildren[varIndex-1]).removeClass('active');
       $( paginationChildren[varIndex]).addClass('active');
       updateInfo()


            ;

        fetch("https://api.artic.edu/api/v1/artworks/" + objArray[varIndex].id).then(function (response) {
            return response.json()
        }).then(function (data) {

            console.log(data.data)
            imagePath = data.data.image_id;
            imageTitle.html(data.data.title + "( " + data.data.date_end + " ) ")
            console.log(imagePath);
            mainImage.attr('src', "https://www.artic.edu/iiif/2/" + imagePath + "/full/843,/0/default.jpg");
            console.log(varIndex)
        })
    }

    else   {
        $('#modalText').html('No Additional Results')
        $('#mainModal').removeClass('hidden');
        $('.overlay').removeClass('hidden');
        $('.overlay').css('display', 'block');
    }

});


tabLeft.click(function () {

    if (varIndex > 0) {
        varIndex--;
        $( paginationChildren[varIndex+1]).removeClass('active');
        $( paginationChildren[varIndex]).addClass('active');
        updateInfo();
 

            ;

        fetch("https://api.artic.edu/api/v1/artworks/" + objArray[varIndex].id).then(function (response) {
            return response.json()
        }).then(function (data) {

            console.log(data.data)
            imagePath = data.data.image_id;
            imageTitle.html(data.data.title + "( " + data.data.date_end + " ) ")
            console.log(imagePath);
            mainImage.attr('src', "https://www.artic.edu/iiif/2/" + imagePath + "/full/843,/0/default.jpg");
            console.log(varIndex)
        })
    }

    else  {
        $('#modalText').html('No Previous Results')
        $('#mainModal').removeClass('hidden');
        $('.overlay').removeClass('hidden');
        $('.overlay').css('display', 'block');
    }
});


$("#closeModal").click( function() {
   
    $('#mainModal').addClass('hidden');
})

