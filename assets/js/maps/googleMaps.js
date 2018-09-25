 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyALSTGEwrPQvGDjfoyUQ5d-OUTASX6WW-c",
  authDomain: "musical-maps-project.firebaseapp.com",
  databaseURL: "https://musical-maps-project.firebaseio.com",
  projectId: "musical-maps-project",
  storageBucket: "musical-maps-project.appspot.com",
  messagingSenderId: "933657167227"
};
firebase.initializeApp(config);

var database = firebase.database();


function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });

    var input = document.getElementById('pac-input');

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
      map: map
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    autocomplete.addListener('place_changed', function() {
      console.debug("Search Is Here!")
      infowindow.close();
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      // Set the position of the marker using the place ID and location.
      marker.setPlace({
        placeId: place.place_id,
        location: place.geometry.location
      });
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());

      marker.setVisible(true);

      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-id'].textContent = place.place_id;
      infowindowContent.children['place-address'].textContent =
          place.formatted_address;
      infowindow.open(map, marker);
      console.log(place.name);

      var location = Location;
      location.lat = place.geometry.location.lat();
      location.long = place.geometry.location.lng();
      location.name = place.name;

      console.log(location);
      AddLocation(location);
      CallYoutube();

    });
  }




    
    
    /* Old Version, with 'click' buttons 
    
    // Map options. 
    var map;
    function initMap() {

      //Map options
      var options = {
        zoom: 8,
        center: { lat: 42.3601, lng: -71.0589 }
      }


      // New Map
      map = new google.maps.Map(document.getElementById('map'), options);

      // Listen for click on map 
      google.maps.event.addListener(map, 'click',
        function(event){
          // Add marker
          addMarker({coords:event.latLng});
          console.log(event);
          console.log("latitude : " + event.latLng.lat());
          console.log("longitude : " + event.latLng.lng());
          console.log(event.latLng.lat());
          console.log(event.latLng.lng());
      });

      /*
        //Add marker
          var marker = new google.maps.Marker({
            position:{lat: 42.4668, lng: -70.9495},
            map:map,
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
          });
  
    // Info Window        
    var infoWindow = new google.maps.InfoWindow({
      content:'<h1>Norwegian Death</h1>'
    })
  
    marker.addListener('click', function(){
      infoWindow.open(map, marker);
    });
          

/////////////////////below, just text box//////////////////////
      //Small Text Box on top of map.
          function makeInfoBox(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '2px';
    controlUI.style.marginBottom = '22px';
    controlUI.style.marginTop = '10px';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);

  //Small Text Box on top of map. 
    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '100%';
    controlText.style.padding = '6px';
    controlText.innerText = 'The map shows all clicks made in the last 10 minutes.';
    controlUI.appendChild(controlText);
  }
  //Small Text Box on top of map. 
  // Create the DIV to hold the control and call the makeInfoBox() constructor
  // passing in this DIV.
  var infoBoxDiv = document.createElement('div');
  var infoBox = new makeInfoBox(infoBoxDiv, map);
  infoBoxDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);
//////////////////////above, just text box//////////////////////////


///////////below/////////From Video Markers//////////////////

      // Array of markers
      var markers = [
        {
          coords: { lat: 42.4668, lng: -70.9495 },
          iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          content: '<h1>Lynn MA</h1>'
        },
        {
        coords: { lat: 42.8584, lng: -70.9300 },
        content: '<h1>Amesbury MA</h1>'
      },
      { 
        coords: { lat: 42.7762, lng: -71.0773 } 
      }
      ];

      // Loop through markers
      for(var i = 0; i < markers.length;i++){
        // Add Marker Function
        addMarker(markers[i]);
      }

      //Add marker function
      function addMarker(props) {
        var marker = new google.maps.Marker({
          position: props.coords,
          map: map
          //icon:props.iconImage
        });

        //Check for customicon
        if (props.iconImage) {
          //set icon image
          marker.setIcon(props.iconImage);
        }

        // Check content 
        if (props.content) {
          var infoWindow = new google.maps.InfoWindow({
            content: props.content
          })

          marker.addListener('click', function () {
            infoWindow.open(map, marker);
            console.log(marker);
          });

        }
      }
      ///////////above////////From video make markers/////////

    }

    */// Everything above this is the old map version, with 'click button'//

  
