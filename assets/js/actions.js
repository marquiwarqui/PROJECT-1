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

function AddLocation(location) {
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
        '<li class="list-group-item active id="favorites">' + name + '</li>');

    console.log(name);
}

$(document).ready(function () {
    
    $("#prsearch").on("click", prevVideo);
    $("#nesearch").on("click", nextVideo);
});