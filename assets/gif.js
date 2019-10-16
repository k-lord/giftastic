var topics = ["excited","angry","happy","hangry"]; 

// a function to run through a for loop of the array and create buttons for each index

var createButton = function (arr) {
    for(i = 0; i < arr.length; i ++) {
        var searchWord = arr[i];
        console.log(searchWord);

        //append button to HTML page for each index of array

        $("#btn-placement").append("<button class='btn btn-dark' id='gifbtn'>");
        
        //add data-search to each button that = the array index

        $("#gifbtn").data("search", searchWord);
        var x = $("#gifbtn").data("search");
        console.log("data search is " + x);

        //add text to each button that = the array index

        $("#gifbtn").text(searchWord);
        console.log("button text is " + searchWord);
    }
}

createButton(topics);

// on click function to GET gifs from Giphy based on data-search id's & prepend to HTML


$("button").on("click", function(){
    var x = $(this).data("search");
    console.log(x);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=Yto3qlUaI5924crOZKDBgZeRIvCm4xgz&limit=10";
    console.log(queryURL);

    $.ajax({url: queryURL, method: "GET"})
        .done(function(response){
            console.log(response);
            for (i = 0; i < response.data.length; i++) {
                $("#GIF-area").prepend("<p>Rating: " + response.data[i].rating + "</p>");
                $("#GIF-area").prepend("<img src='" + response.data[i].images.downsized.url + "'>");
    


            }
        });
})





