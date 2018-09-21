
var key = "AIzaSyBFAX9rkeEQwVNOs8N3SVcQc448zfrAQ0s";

var search = "pakistan music";

// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms
// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    gapi.client.setApiKey(key);
}

$(document).ready(function () {
    // Called when the search button is clicked in the html code
    $(".button").on("click", function () {
        var query = $("#search").val().trim() + " music";
        // Use the JavaScript client library to create a search.list() API call.
        var request = gapi.client.youtube.search.list({
            part: 'snippet',
            q: query
        });
        // Send the request to the API server, call the onSearchResponse function when the data is returned
        request.execute(onSearchResponse);
    });
});
// Triggered by this line: request.execute(onSearchResponse);
function onSearchResponse(response) {
    console.log(response);
    $("#youtube-player").empty();
    response.items.forEach(item => {
        if(item.id.kind === "youtube#video"){
            console.log(item.id.videoId)
            CreateYoutubePlayer(item.id.videoId);
        }
    });

    /* var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML = responseString; */
}


function CreateYoutubePlayer(videoId){
   /*  <iframe id="ytplayer" type="text/html" width="640" height="360" 
    src="https://www.youtube.com/embed?listType=search&list=pakistan+music+modern"
      frameborder="0"></iframe> */
      var youtubePlayer = $("<iframe>").attr("id","ytplayer");
        youtubePlayer.attr("src", "https://www.youtube.com/embed/" + videoId);
        youtubePlayer.attr("frameborder","0");
        youtubePlayer.attr("type","text/html");
        youtubePlayer.attr("width",400);
        youtubePlayer.attr("hight",360);


      $("#youtube-player").append(youtubePlayer);


      //<iframe width="700" height="525" src="https://www.youtube.com/embed/humHxTNzSoY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
}