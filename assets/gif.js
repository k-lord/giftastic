// the array of gif button topics
var topics = ["hangry","shrug","no","OMG","mind blown","facepalm","shame","dancing","shocked","get money","popcorn","eye roll","confused","WTF","K","SMH","nope","LOL","why"];
// empty array to eventually push topics once a button is closed
var closes = [];

// the function to run through a for loop of the topics array and create buttons for each index
var createButton = function (arr) {
    //clears btn-placement div so we don't get repeat buttons each time we add a new button
    $("#btn-placement").empty();

    for(i = 0; i < arr.length; i ++) {
        var searchWord = arr[i];
        //creating a button for each item in the array
        var topicButton = $("<button>");
        topicButton.addClass("btn btn-dark gifs");
        topicButton.attr("data-search", searchWord);
        topicButton.text(searchWord);
        $("#btn-placement").append(topicButton);

        //appending a close button to each button made
        var closeButton = $("<button>");
        closeButton.attr("id", i);
        closeButton.addClass("close").text("x");
        closes.push(closeButton);
        $(topicButton).append(closeButton);

    }
}

// the on-click function to .ajax(GET) gifs from Giphy based on data-search id's & prepend response.data[i] info to HTML
function getGIF (str) {

        var str = $(this).data("search");
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + str + "&api_key=Yto3qlUaI5924crOZKDBgZeRIvCm4xgz&limit=10";
    
        $.ajax({url: queryURL, method: "GET"})
            .done(function(response){
                console.log(response);
                $("#GIF-area").empty(); 
                for (i = 0; i < response.data.length; i++) {
                    var imageDiv = $("<div>");
                    var p = $("<p>");
                    p.text("rating: " + response.data[i].rating);
                    p.addClass("textbox");
                    var image = $("<img>");
                    image.addClass("gifImage");
                    image.attr("src", response.data[i].images.fixed_height_still.url);
                    imageDiv.append(p);
                    imageDiv.append(image);
                    $("#GIF-area").prepend(imageDiv);
                    
                    
                }
            });   
}

// take the value of the #add-GIF input text from HTML, add to topics array & add the new button to HTML
$("#add-GIF").on("click", function(event) {
    event.preventDefault();
    var GIF = $("#GIF-input").val().trim();
    topics.push(GIF);
    createButton(topics);
    $(".gifs").addClass("newGIF");
    var newGIF = $(".newGIF").data("search");
    console.log(newGIF);
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

// Adding click event listeners to all elements with a class of ".gifs" to GET the gifs from Giphy API once clicked
$(document).on("click", ".gifs", getGIF);

// Adding click event to remove topics from array with the close button
$(document).on("click", ".close", function(event){
    event.preventDefault();
    console.log("button closed");
    removeID = $(this).attr("id");
    topics = topics.filter(function(obj, id) {return id != removeID});
    console.log(topics);
    createButton(topics);
  });


createButton(topics);



