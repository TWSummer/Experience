import React from 'react';

class DetailDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedActivity: props.selectedActivity
    };
    this.zoomIn = this.zoomIn.bind(this);
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
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        center: mapOptions.center,
        styles:[
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#000000"
            },
            {
                "lightness": -100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#939393"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#797979"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#8d8c8c"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#dddddd"
            },
            {
                "saturation": -100
            },
            {
                "lightness": -3
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#000000"
            },
            {
                "saturation": -100
            },
            {
                "lightness": -100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#000000"
            },
            {
                "saturation": -100
            },
            {
                "lightness": -100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#bbbbbb"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 26
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#000000"
            },
            {
                "lightness": -100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#000000"
            },
            {
                "saturation": -100
            },
            {
                "lightness": -100
            },
            {
                "visibility": "off"
            }
        ]
    }
]
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

      if (this.props.selectedActivity) {
        map.panTo({
          lat: this.props.selectedActivity.Lat,
          lng: this.props.selectedActivity.Lng
        });
        map.setZoom(15);
      }
    }
  }


  computeMapOptions(props) {
    let minLat, minLng, maxLat, maxLng, startLat, startLng, endLat, endLng;
    let waypoints = [];
    let activities = Object.values(props.experience.Activities);
    activities.forEach((activity) => {
      if (minLat === undefined || activity.Lat < minLat) {
        minLat = activity.Lat;
      }
      if (minLng === undefined || activity.Lng < minLng) {
        minLng = activity.Lng;
      }
      if (maxLat === undefined || activity.Lat > maxLat) {
        maxLat = activity.Lat;
      }
      if (maxLng === undefined || activity.Lng > maxLng) {
        maxLng = activity.Lng;
      }
      if (startLat === undefined || startLng === undefined) {
        startLat = activity.Lat;
        startLng = activity.Lng;
      }
      if (activity.Lat !== undefined && activity.Lng!== undefined) {
        waypoints.push({location: new google.maps.LatLng(activity.Lat, activity.Lng)});
        endLat = activity.Lat;
        endLng = activity.Lng;
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
    }, (response, status) => {
      if (status === 'OK') {
        display.setDirections(response);
        setTimeout(this.zoomIn, 75);
      } else {
        service.route({
          origin: origin,
          destination: destination,
          waypoints: waypoints,
          travelMode: 'WALKING',
          avoidTolls: false
        }, (res2, stat2) => {
          if (stat2 === 'OK') {
            display.setDirections(res2);
            setTimeout(this.zoomIn, 75);
          } else {
            alert('Could not display directions due to: ' + stat2);
          }
        });
      }
    });
  }

  zoomIn() {
    if (this.props.selectedActivity && this.props.selectedActivity.Lat &&
    this.props.selectedActivity.Lng) {
      this.state.map.panTo({
        lat: this.props.selectedActivity.Lat,
        lng: this.props.selectedActivity.Lng
      });
      this.state.map.setZoom(15);
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.state.map && !this.state.defaultZoom) {
      if (this.state.map.getZoom() < 15) {
        this.setState({defaultZoom: this.state.map.getZoom()});
      } else {
        this.setState({defaultZoom: 15});
      }
    }
    if (this.state.mounted) {
      if (this.state.map === undefined && newProps.experience) {
        this.setupMap(newProps);
      }
      if (this.state.map && newProps.experience) {
        if (newProps.selectedActivity && newProps.selectedActivity.Lat &&
        newProps.selectedActivity.Lng) {
          this.state.map.panTo({
            lat: newProps.selectedActivity.Lat,
            lng: newProps.selectedActivity.Lng
          });
          this.state.map.setZoom(15);
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
            <ul className="genre-tags">
              {itemToDisplay && itemToDisplay.Genre.split("|*|").map(genre => {
                if (genre) {
                  return (<li
                    key={genre}
                    className="genre-tag"
                    >#{genre}</li>);
                }
              })}
            </ul>

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
        <div className="detail-user-info">
          <div className="detail-user-pic">
            <img src={ this.props.experience.UserPictureURL }></img>
          </div>
          <div className="detail-user-name">
            <div className="created-by">CREATED BY<br /></div>
            { this.props.experience.UserName }
          </div>
        </div>
      </div>
    );
  }
}

export default DetailDisplay;
