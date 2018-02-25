import React from 'react';

class DetailDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({mounted: true});
    if (this.props.experience) {
      this.setupMap(this.props);
    }
  }

  setupMap(props) {
    let mapOptions = this.computeMapOptions(props);
    if (mapOptions.center.lat) {
      let map = new google.maps.Map(document.getElementById('show-map'), {
        zoom: 10,
        scrollwheel: true,
        center: mapOptions.center  // Australia.
      });
      this.setState({ map });

      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        markerOptions: {animation: google.maps.Animation.DROP}
      });

      directionsDisplay.addListener('directions_changed', () => {
        directionsDisplay.getDirections();
      });
      this.displayRoute(mapOptions.startPoint, mapOptions.endPoint,
        directionsService, directionsDisplay, mapOptions.waypoints);

    }

  }

  computeMapOptions(props) {
    let minLat, minLng, maxLat, maxLng, startLat, startLng, endLat, endLng;
    let waypoints = [];
    let activities = Object.values(props.experience.Activities);
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
      if (maxLng === undefined || activity.lng > maxLng) {
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
      avoidTolls: false
    }, function(response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  componentWillReceiveProps(newProps) {
    if (this.state.map && !this.state.defaultZoom) {
      if (this.state.map.getZoom() < 16) {
        this.setState({defaultZoom: this.state.map.getZoom()});
      } else {
        this.setState({defaultZoom: 16});
      }
    }
    if (this.state.mounted) {
      if (this.state.map === undefined && newProps.experience) {
        this.setupMap(newProps);
      }
      if (this.state.map && newProps.experience) {
        if (newProps.selectedActivity && newProps.selectedActivity.lat &&
        newProps.selectedActivity.lng) {
          this.state.map.panTo({
            lat: newProps.selectedActivity.lat,
            lng: newProps.selectedActivity.lng
          });
          this.state.map.setZoom(16);
        } else {
          let mapOptions = this.computeMapOptions(newProps);
          this.state.map.panTo(mapOptions.center);
          this.state.map.setZoom(this.state.defaultZoom);
        }
      }
    }
  }



  render() {
    let itemToDisplay = this.props.selectedActivity ?
      this.props.selectedActivity : this.props.experience;
    return (
      <div className="detail-display">
        <div className="detail-display-header">
          <h1>{itemToDisplay.Title}</h1>
          <span>Time: {this.props.precisionRound(itemToDisplay.Duration/60, 1)} hours</span>
        </div>
        <div id="show-map">

        </div>

        <ul className="details-details-details">
          <span className="label">Details:</span>
          <li>
            Genre: {itemToDisplay.Genre}

          </li>

        </ul>
        <div className="detail-display-description">
          <span className="label">
            Description:
          </span>
          <p>
            {itemToDisplay.Description}
          </p>
        </div>

      </div>
    );
  }
}

export default DetailDisplay;
