import React from 'react';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: ""
    };
  }

  componentDidMount() {
    this.setupMap();
  }

  setupMap() {
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

    map.controls[google.maps.ControlPosition.TOP].push(input);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      map: map
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });

    // Get the full place details when the user selects a place from the
    // list of suggestions.
    google.maps.event.addListener(autocomplete, 'place_changed',
      this.autocompleteCallback(infowindow, autocomplete, map, marker));
  }

  autocompleteCallback(infowindow, autocomplete, map, marker) {
    return () => {
      infowindow.close();
      var place = autocomplete.getPlace();
      console.log(place);
      this.setState({imgUrl: ""});
      if (place.photos) {
        let newImgUrl = place.photos[0].getUrl({'maxWidth': 1000, 'maxHeight': 1000});
        this.setState({imgUrl: newImgUrl});
      }
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

      this.setInfowindowContent(infowindow, place);

      infowindow.open(map, marker);
    };
  }

  setInfowindowContent(infowindow, place) {
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
    place.formatted_address + '</div>');
  }

 render() {
   return (
     <main className="create-page">
       <aside className="create-activity-ribbon"></aside>
       <section className="create-activity-form">
         <input type="text" placeholder="Search" id="pac-input"></input>
         <div id="map">This is the map</div>
         <form>
           {
             this.state.imgUrl ?
              <img
                src={this.state.imgUrl}
                className="location-preview-image"/> :
              ""
           }
         </form>
       </section>
     </main>
   );
 }
}

export default HomePage;
