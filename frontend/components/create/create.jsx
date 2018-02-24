import React from 'react';
import ActivityRibbon from '../activity/activity_ribbon';
import ActivityMenu from './activity_menu';
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrls: [],
      title: "",
      description: "",
      count: 1,
      duration: "",
      // experience: {}
    };
    this.handleBuild = this.handleBuild.bind(this);
    this.update = this.update.bind(this);
    this.showForm = this.showForm.bind(this);
    this.createActivity = this.createActivity.bind(this);
    this.setImageUrl = this.setImageUrl.bind(this);
    this.setFile = this.setFile.bind(this);
  }

  componentDidMount() {
    this.setupMap();
  }

  handleBuild(e) {
    e.preventDefault();
    console.log("handleBuild");
    this.setState({
      experience: {
        title: this.state.title,
        description: this.state.description,
        duration: 0,
        activities: {},
        files: [],
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

  createActivity(e, genre) {
    console.log("createActivity");
    e.preventDefault();
    let experience = this.state.experience;
    experience.duration = experience.duration + parseInt(this.state.duration);
    experience.activities[this.state.count] = {
      id: this.state.count,
      genre,
      description: this.state.description,
      title: this.state.title,
      imageUrl: this.state.imageUrl,
      lat: this.state.lat,
      long: this.state.long,
      duration: parseInt(this.state.duration),
    };
    console.log(experience);
    console.log(this.state);
    this.setState({
      activity: undefined,
      experience,
      count: this.state.count + 1,
      duration: "",
      lat: "",
      long: "",
      title: "",
      description: "",
      form: "",

    });
    console.log(this.state);
    // this.setupMap();
  }

  setImageUrl(imageUrl) {
    console.log(imageUrl);
    this.setState({
      imageUrl
    });
  }

  setFile(e) {
    e.preventDefault();
    let experience = this.state.experience;
    let reader = new FileReader();
    reader.onload = () => {
      experience.files.push(e.target.files[0]);
      this.setState({
        experience,
        file: reader.result,
        imageUrl: reader.result,
      });
    };
    reader.readAsDataURL(e.target.files[0]);


    console.log(e.target.files[0]);
    console.log(e.target.file);

  }

 render() {
   const icons = {
     Food: <i className="fas fa-utensils"></i>,
     Transit: <i className="fas fa-car"></i>,
     Views: <i className="far fa-image"></i>,
   };


   return (
     <main className="create-page">
      <ActivityRibbon experience={this.state.experience}/>

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
          <ActivityMenu showForm={this.showForm}/>


        }
        <input className={`google-maps-search ${this.state.activity ? "" : "hidden"}`} type="search" placeholder="Search" id="pac-input"></input>
        <div className={this.state.activity && this.state.form !== "Custom"? "" : "hidden"} id="map">This is the map</div>
        {this.state.activity && <form className="create-activity-form">

          <input type="text" ></input>

            <input
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

          <label className="duration-input">
            <span className="duration-input">Duration (minutes): </span>
            <input
              onChange={(e) => {
                console.log("fire");
                e.preventDefault();
                console.log(e.target.value);
                if (!e.target.value || ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ""].includes(e.target.value[e.target.value.length - 1])) {
                  console.log("hit");
                  this.update("duration")(e);
                }
              }}
              value={this.state.duration}
              className="duration-input"
              type="text"></input>
          </label>

          <label className="file-input">
            {this.state.file && <img src={this.state.file}></img>}
            <span className="file-input">Upload Image: </span>
            <input
              onChange={(e) => this.setFile(e)}
              className="file-input"
              type="file"></input>


          </label>

          <button
            onClick={(e) => this.createActivity(e, this.state.form)}
            className="activity-create btn">
            Add Activity
          </button>


          <p>Place: {this.state.name}</p>
          <ul className="google-maps-photos">{
            this.state.imgUrls &&
              this.state.imgUrls.map((imageUrl, index) => {

              return (<li
                key={index}
                className="google-maps-photo"><img
                src={imageUrl}
                onClick={(e) => this.setImageUrl(imageUrl)}
                className="location-preview-image"/></li>
            );})
          }</ul>
          <p>Latitude {this.state.lat}</p>
          <p>Longitude {this.state.lng}</p>
        </form>}
      </section>
    </main>
  );}


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
        imgUrls: [],
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
}
export default HomePage;
