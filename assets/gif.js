var topics = ["excited","angry","happy","hangry","surprised","sad","wild"]; 

// a function to run through a for loop of the array and create buttons for each index

var createButton = function (arr) {

    $("#btn-placement").empty();

    for(i = 0; i < arr.length; i ++) {
        var searchWord = arr[i];
        console.log(searchWord);
        var button = $("<button>").text(arr[i]);
        button.addClass("btn btn-dark gifs");
        
        

        //append button to HTML page for each index of array

        $("#btn-placement").append(button);
        
        //add data-search to each button that = the array index
       

        button.data("search", searchWord);
        var x = button.data("search");
        console.log("data search is " + x);

        //add text to each button that = the array index

        $("#gifbtn").text(searchWord);
        console.log("button text is " + searchWord);
    }
}

// on click function to GET gifs from Giphy based on data-search id's & prepend response.data[i] info to HTML

function getGIF () {

    $("button").on("click", function(){
        console.log("button clicked");
        var x = $(this).data("search");
        console.log(x);
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=Yto3qlUaI5924crOZKDBgZeRIvCm4xgz&limit=10";
        console.log(queryURL);
    
        $.ajax({url: queryURL, method: "GET"})
            .done(function(response){
                console.log(response);
                $("#GIF-area").empty();
                for (i = 0; i < response.data.length; i++) {
                
                    $("#GIF-area").append("<img src='" + response.data[i].images.downsized.url + "'>");
                    //$("#GIF-area").append("<p>rating: " + response.data[i].rating + "</p>");   
                }
            });
    })   
}



// take the value of the #add-GIF input text and add to topics array & create button

$("#add-GIF").on("click", function(event) {
    event.preventDefault();
    var GIF = $("#GIF-input").val().trim();
    topics.push(GIF);
    createButton(topics);
    $("#GIF-input").val("");
});

// Adding click event listeners to all elements with a class of "gifs"
$(document).on("click", ".gifs", getGIF);

createButton(topics);



