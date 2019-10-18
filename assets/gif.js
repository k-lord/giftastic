// the array of gif button topics
var topics = ["excited","angry","happy","hangry","surprised","sad","high five","bye","shrug","yes","thumbs up","what","no","whatever","OMG","mind blown","facepalm","shame","dancing","shocked","get money","popcorn","eye roll","confused","yay","WTF","K","applause","SMH","nope","LOL","why"];

//boolean statement to call on later on to toggle the GIFs between paused and playing
var gifPaused = true;

// the function to run through a for loop of the topics array and create buttons for each index
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

// the on-click function to .ajax(GET) gifs from Giphy based on data-search id's & prepend response.data[i] info to HTML
function getGIF () {

    $("button").on("click", function(){
        console.log("button clicked");
        var x = $(this).data("search");
        console.log("the data-search for the clicked button is: " + x);
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=Yto3qlUaI5924crOZKDBgZeRIvCm4xgz&limit=12";
        console.log(queryURL);
    
        $.ajax({url: queryURL, method: "GET"})
            .done(function(response){
                console.log(response);
                $("#GIF-area").empty(); 
                for (i = 0; i < response.data.length; i++) {
                
                    $("#GIF-area").append("<img class='gifImage' src='" + response.data[i].images.fixed_height_still.url + "'>");
                    
                    //$("#GIF-area").append("<p>rating: " + response.data[i].rating + "</p>");
                }


            });
    })   
}

// take the value of the #add-GIF input text from HTML, add to topics array & add the new button to HTML
$("#add-GIF").on("click", function(event) {
    event.preventDefault();
    var GIF = $("#GIF-input").val().trim();
    topics.push(GIF);
    createButton(topics);
    $("#GIF-input").val("");
});

//function to toggle between paused imgs and playing gifs

$(document).on("click", ".gifImage", function() {
    var src = $(this).attr("src");
    if($(this).hasClass('playing')){
     //stop
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
        $(this).removeClass('playing');
        console.log("this image is paused");
    } else {
    //play
    $(this).addClass('playing');
    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"));
    console.log("this image is playing");
  }
});



// Adding click event listeners to all elements with a class of ".gifs"
$(document).on("click", ".gifs", getGIF);


createButton(topics);



