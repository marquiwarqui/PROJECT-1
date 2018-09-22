
var key = "AIzaSyBFAX9rkeEQwVNOs8N3SVcQc448zfrAQ0s";
var youtubeSection = "#youtube-player";

var search = "music";
var videos = [];
var currentVid = 0;

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
            maxResults: 5,
            part: 'snippet',
            q: query,
            type: "video"
        });
        // Send the request to the API server, call the onSearchResponse function when the data is returned
        request.execute(onSearchResponse);
    });
});

// Triggered by this line: request.execute(onSearchResponse);
function onSearchResponse(response) {
    console.log(response);
    response.items.forEach(item => {
        if (item.id.kind === "youtube#video") {
            console.log(item.id.videoId)
            videos.push(item.id.videoId)
        }
    });
    CreateYoutubePlayer();
}

function nextVideo(){
    if(currentVid + 1 >= videos.length){
        currentVid = 0;
    }else{
        currentVid++;
    }
    CreateYoutubePlayer();
}

function prevVideo(){
    if(currentVid - 1 < 0){
        currentVid = videos.length - 1;
    }else{
        currentVid--;
    }
    CreateYoutubePlayer();
}


function CreateYoutubePlayer() {
    $(youtubeSection).empty();
    var youtubePlayer = $("<iframe>").attr("id", "ytplayer");
    youtubePlayer.attr("src", "https://www.youtube.com/embed/" + videos[currentVid]);
    youtubePlayer.attr("frameborder", "0");
    youtubePlayer.attr("type", "text/html");
    youtubePlayer.attr("width", 400);
    youtubePlayer.attr("hight", 360);

    $(youtubeSection).append(youtubePlayer);
}