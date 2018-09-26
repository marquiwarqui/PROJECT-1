
var key = "AIzaSyBFAX9rkeEQwVNOs8N3SVcQc448zfrAQ0s";
var youtubeSection = "#youtube-player";

var search = " music";
var videos = [];
var currentVid = 0;
var hight = 94.5;
var width = 380;
var maxResults = 5;


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
        var query = $("#search").val().trim() + search;
        console.log(query);
        // Use the JavaScript client library to create a search.list() API call.
        var request = gapi.client.youtube.search.list({
            maxResults: maxResults,
            part: 'snippet',
            q: query,
            type: "video"
        });
        // Send the request to the API server, call the onSearchResponse function when the data is returned
        request.execute(onSearchResponse);
    });
});

function CallYoutube(){
    var query = Locations[currentLocation].name + search;
        console.log(query);
        // Use the JavaScript client library to create a search.list() API call.
        var request = gapi.client.youtube.search.list({
            maxResults: maxResults,
            part: 'snippet',
            q: query,
            type: "video"
        });
        // Send the request to the API server, call the onSearchResponse function when the data is returned
        request.execute(onSearchResponse);
}

// Triggered by this line: request.execute(onSearchResponse);
function onSearchResponse(response) {
    console.log(response);
    response.items.forEach(item => {
        if (item.id.kind === "youtube#video") {
            console.log(Locations[currentLocation])
            Locations[currentLocation].videoIds.push(item.id.videoId)
        }
    });
    
    CreateYoutubePlayer();

    console.log(Locations);
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
    console.log(Locations[currentLocation].videoIds[currentVid])
    $(youtubeSection).empty();
    var youtubePlayer = $("<iframe>").attr("id", "ytplayer");
    youtubePlayer.attr("src", "https://www.youtube.com/embed/" + Locations[currentLocation].videoIds[currentVid]);
    youtubePlayer.attr("frameborder", "0");
    youtubePlayer.attr("type", "text/html");
    youtubePlayer.attr("width", width);
    youtubePlayer.attr("hight", hight);

    $(youtubeSection).append(youtubePlayer);
}