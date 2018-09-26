//This is where we will tack the actions done and execute code
var Location = {
    name: "",
    lat: "",
    long: "",
    videoIds: []
}

var Locations = [];
var currentLocation = 0;

function GetSearch(searchPlace) {

}

function AddLocation(location){
    var loc = {
        name: location.name,
        lat: location.lat,
        long: location.long,
        videoIds: location.videoIds.slice(0)
    };

    Locations.push(loc);
    currentLocation = Locations.length - 1;
    console.log(currentLocation);
    console.log(Locations);

    CallYoutube();
    favorites(loc.name);    
};

var favorites = function (name) {
    $(".list").append(
        '<li class="list-group-item active" data-name = "'+ name + '">' + name + '</li>');

    console.log(name);    
}

$(".list-group-item").on("click", function(){
    var name = $(this).attr("data-name");
    for (i = 0; i < Locations.length; i++) { 
    
        if(Locations[i].name === name){
            currentLocation = i;
        }

    }
    CreateYoutubePlayer();
});
