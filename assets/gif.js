var topics = ["excited","angry","happy"]; 


var createButton = function (arr) {
    for(i = 0; i < arr.length; i ++) {
        var searchWord = arr[i];
        console.log(searchWord);
        $("#btn-placement").append("<button class='btn btn-dark' id='gifbtn'>");
        
        $("#gifbtn").data("search", searchWord);
        var x = $("#gifbtn").data("search");
        console.log("data search is " + x);
        $("#gifbtn").text(searchWord);
        console.log("button text is " + searchWord);
    }
}

createButton(topics);










var queryURL = "https://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=Yto3qlUaI5924crOZKDBgZeRIvCm4xgz&limit=5";

