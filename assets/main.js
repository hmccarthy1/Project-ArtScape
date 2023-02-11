
// sets index

var varIndex = 0
var objArray;
var selectedItem;
var imagePath;
// get various elements
var search = $("#searchText")
var searchBtn = $('#searchButton')
var tabRight = $('#nextButton')
var tabLeft = $('#previousButton')
var mainImage = $('#mainImg');
var imageTitle = $('#imageTitle');

var artArray = [

    $('#artwork1'),
    $('#artwork2'),
    $('#artwork3')


]

 
var artist1 = $('#artist1')
var artist2 = $('#artist2')
var artist3 = $('#artist3')



// Search button function
searchBtn.click(function () {
    varIndex = 0;
    console.log(search.val())

    fetch("https://api.artic.edu/api/v1/artworks/search?q=" + search.val()).
        then(function (response) {
            return response.json();
        }).
        then(function (data) {
            objArray = data.data;
            console.log(objArray)
        }).then(function () {

            if (objArray.length < 1) {window.alert("No results"); return}


            fetch("https://api.artic.edu/api/v1/artworks/" + objArray[varIndex].id).then(function (response) {
                return response.json()
            }).then(function (data) {
                imageTitle.html(data.data.title + "( " + data.data.date_end + " ) ")
                console.log(data.data)
                imagePath = data.data.image_id;
                console.log(mainImage)
                console.log(imagePath);
                mainImage.attr('src', "https://www.artic.edu/iiif/2/" + imagePath + "/full/843,/0/default.jpg");



                fetch("https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=" + search.val())
                    .then(function (response) {
                        return response.json()
                    }).then(function (data) {
                        console.log(data);

                        for (var i = 0; i < 3; i++) {
                            console.log(data[1][i]);
                            console.log(data[3][i])
                            if(data[1][i] == undefined || data[1][i] == "") {
                                artArray[i].html("")
                            } else {  artArray[i].html(data[1][i]);
                                artArray[i].attr('href', data[3][i])
                            };

                            
                            
                        }

                        


                    })
            })




        })
});



tabRight.click(function () {

    if (varIndex < objArray.length - 1) {
        varIndex++
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

    else window.alert("no more results")

});


tabLeft.click(function () {

    if (varIndex > 0) {
        varIndex--
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

    else window.alert("this is the first result, no previous results")

});







