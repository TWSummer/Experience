import React from 'react';

class DetailDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setupMap();
  }

  setupMap() {
    let mapOptions = this.computeMapOptions();
    let map = new google.maps.Map(document.getElementById('show-map'), {
      zoom: 10,
      center: mapOptions.center  // Australia.
    });
    this.setState({map});

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: map
    });

    directionsDisplay.addListener('directions_changed', () => {
      this.computeTotalDistance(directionsDisplay.getDirections());
    });
    this.displayRoute(mapOptions.startPoint, mapOptions.endPoint,
      directionsService, directionsDisplay, mapOptions.waypoints);
  }

  computeMapOptions() {
    let minLat, minLng, maxLat, maxLng, startLat, startLng, endLat, endLng;
    let waypoints = [];
    let activities = this.props.experience.activities;
    activities.forEach((activity) => {
      if (minLat === undefined || activity.lat < minLat) {
        minLat = activity.lat;
      }
      if (minLng === undefined || activity.lng < minLng) {
        minLng = activity.lng;
      }
      if (maxLat === undefined || activity.lat > maxLat) {
        maxLat = activity.lat;
      }
      if (maxLng === undefined || activity.lng < maxLng) {
        maxLng = activity.lng;
      }
      if (startLat === undefined || startLng === undefined) {
        startLat = activity.lat;
        startLng = activity.lng;
      }
      if (activity.lat !== undefined && activity.lng!== undefined) {
        waypoints.push({location: new google.maps.LatLng(activity.lat, activity.lng)});
        endLat = activity.lat;
        endLng = activity.lng;
      }
    });
    waypoints = waypoints.slice(1, waypoints.length - 1);
    let center =  {lat: (minLat + maxLat)/2,lng: (minLng + maxLng)/2 };
    let startPoint = new google.maps.LatLng(startLat, startLng);
    let endPoint = new google.maps.LatLng(endLat, endLng);
    return { center, startPoint, endPoint, waypoints};
  }

  displayRoute(origin, destination, service, display, waypoints) {
    service.route({
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      travelMode: 'DRIVING',
      avoidTolls: true
    }, function(response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.selectedActivity && newProps.selectedActivity.lat &&
    newProps.selectedActivity.lng) {
      this.state.map.setCenter({
        lat: newProps.selectedActivity.lat,
        lng: newProps.selectedActivity.lng
      });
    }
  }



  render() {
    let itemToDisplay = this.props.selectedActivity ?
      this.props.selectedActivity : this.props.experience;
    console.log(itemToDisplay);
    return (
      <div className="detail-display">
        <div className="detail-display-header">
          <h1>{itemToDisplay.title}</h1>
          <span>Time: {this.props.precisionRound(itemToDisplay.duration/60, 1)} hours</span>
        </div>
        <div id="show-map">

        </div>

        <ul className="details-details-details">
          <span className="label">Details:</span>
          <li>
            Genre: {itemToDisplay.genre}

          </li>

        </ul>
        <div className="detail-display-description">
          <span className="label">
            Description:
          </span>
          <p>
            {itemToDisplay.description}
          </p>
        </div>

      </div>
    );
  }
}

export default DetailDisplay;
