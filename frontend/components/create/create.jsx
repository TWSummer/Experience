import React from 'react';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: ""
    };
  }

  componentDidMount() {
    var mapOptions = {
      center: {lat: 37.7749, lng: -122.4194},
      zoom: 11,
      scrollwheel: true
    };
    var map = new google.maps.Map(document.getElementById('map'),
      mapOptions);

    var input = /** @type {HTMLInputElement} */(
        document.getElementById('pac-input'));

    // Create the autocomplete helper, and associate it with
    // an HTML text input box.
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      map: map
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });

    // Get the full place details when the user selects a place from the
    // list of suggestions.
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      infowindow.close();
      var place = autocomplete.getPlace();
      console.log(place);
      let newImgUrl = place.photos[0].getUrl({'maxWidth': 1000, 'maxHeight': 1000});
      this.setState({imgUrl: newImgUrl});
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(16);
      }

      // Set the position of the marker using the place ID and location.
      marker.setPlace(/** @type {!google.maps.Place} */ ({
        placeId: place.place_id,
        location: place.geometry.location
      }));
      marker.setVisible(true);

      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          '<img src=' + place.photos[0].getUrl({'maxWidth': 80, 'maxHeight': 80}) + '/><br>' +
          place.formatted_address + '</div>');
      infowindow.open(map, marker);
    });
  }

 render() {
   return (
     <main className="create-page">
       <input type="text" placeholder="Search" id="pac-input"></input>
       <div id="map">This is the map</div>
       <img src={this.state.imgUrl} />
     </main>
   );
 }
}

export default HomePage;
