import React from 'react';
import ActivityRibbon from '../activity/activity_ribbon';
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrls: [],
      title: "",
      description: "",
      // experience: {}
    };
    this.handleBuild = this.handleBuild.bind(this);
    this.update = this.update.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  componentDidMount() {
    this.setupMap();
  }

  handleBuild(e) {
    e.preventDefault();

    this.setState({
      experience: {
        title: this.state.title,
        description: this.state.description,
        activities: {},
      },
      title: "",
      description: "",
      // activity: {},

    });
    console.log(this.state.experience);
  }

  update(attribute) {
    return (e) => {
      this.setState({
        [attribute]: e.target.value
      });
    };
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
      this.setState({
        imgUrl: "",
        lat: undefined,
        lng: undefined,
        name: ""
      });
      if (place.photos) {
        const newImgUrls = place.photos.map(photo => {
          return photo.getUrl({'maxWidth': 1000, 'maxHeight': 1000});
        });
        console.log(place.photos.length);
        this.setState({imgUrls: newImgUrls});
      }
      if (!place.geometry) {
        return;
      }
      if (place.geometry.location.lat() && place.geometry.location.lng()) {
        this.setState({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        });
      }
      this.setState({name: place.name});

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

  showForm(genre) {
    return () => {
      console.log(genre);
      this.setState({
        form: genre,
        activity: {},
      });
    };
  }

 render() {
   const icons = {
     Food: <i className="fas fa-utensils"></i>,
     Transit: <i className="fas fa-car"></i>,
     Views: <i className="far fa-image"></i>,
   };
   return (
     <main className="create-page">
      <ActivityRibbon/>

      <section className={'create-activity-form-container'}>
        <div className="form-header">
        <h1 className="form-title">{this.state.experience ? this.state.experience.title : "Create an Experience"}</h1>
        </div>
        {!this.state.experience && <div className="experience-form"><input
          onChange={this.update("title")}
          className="title-input"
          placeholder="Add a Title"
          type="text"
          value={this.state.title}></input>
        <textarea
          onChange={this.update("description")}

          className="description-input"
          placeholder="Add a Description"
          type="text"
          value={this.state.description}></textarea>
        <button
          className="btn"
          onClick={(e) => this.handleBuild(e)}>Build your Experience</button></div>}
        {this.state.experience &&
          <ul className="activity-menu">
            <li
              className="activity-menu-button"
              onClick={this.showForm("Food")}
              >
              <i className="fas fa-utensils"></i>
              <span>Food</span>

            </li>
            <li
              className="activity-menu-button"
              onClick={this.showForm("Transit")}
              >
              <i className="fas fa-car"></i>
              <span>Transit</span>

            </li>
            <li
              className="activity-menu-button"
              onClick={this.showForm("Views")}
              >
              <i className="far fa-image"></i>
              <span>Views</span>

            </li>
            <li
              className="activity-menu-button"
              onClick={this.showForm("Outdoors")}
              >
              <i className="fas fa-tree"></i>
              <span>Outdoors</span>

            </li>
            <li
              className="activity-menu-button"
              onClick={this.showForm("Venues")}
              >
              <i className="fas fa-users"></i>
              <span>Venues</span>

            </li>
            <li
              className="activity-menu-button"
              onClick={this.showForm("Explore")}
              >
              <i className="fas fa-map-marker-alt"></i>
              <span>Explore</span>

            </li>
            <li
              className="activity-menu-button"
              onClick={this.showForm("Custom")}
              >
              <i className="fas fa-asterisk"></i>
              <span>Custom</span>

            </li>


          </ul>


        }
        <input className={`google-maps-search ${this.state.activity ? "" : "hidden"}`} type="search" placeholder="Search" id="pac-input"></input>
        <div className={this.state.activity && this.state.activity.genre !== "Custom"? "" : "hidden"} id="map">This is the map</div>
        {this.state.activity && <form className="create-activity-form">

          <input type="text" ></input>

            <input
              className="title-input"
              placeholder="Add a Title"
              type="text"
              value={this.state.title}></input>



            <textarea
              className="description-input"
              placeholder="Add a Description"
              type="text"
              value={this.state.description}></textarea>

          <label className="duration-input">
            <span className="duration-input">Duration: </span>
            <input
              className="duration-input"
              type="select"></input>
          </label>

          <p>Place: {this.state.name}</p>
          {
            this.state.imgUrls &&
              this.state.imgUrls.map(imgUrl => {

              return (<img
                src={imgUrl}
                className="location-preview-image"/>
            );})
          }
          <p>Latitude {this.state.lat}</p>
          <p>Longitude {this.state.lng}</p>
        </form>}
      </section>
    </main>
  );}
}

export default HomePage;
