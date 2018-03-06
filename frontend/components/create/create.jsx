import React from 'react';
import ActivityRibbon from '../activity/activity_ribbon';
import ActivityMenu from './activity_menu';
class NewExperience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: new FormData()
,
      // imgUrls: [],
      title: "",
      description: "",
      count: 1,
      duration: "",
      genres: "",
      genre: "",
      // experience: {}
    };
    this.handleBuild = this.handleBuild.bind(this);
    this.update = this.update.bind(this);
    this.showForm = this.showForm.bind(this);
    this.createActivity = this.createActivity.bind(this);
    this.setImageUrl = this.setImageUrl.bind(this);
    this.setFile = this.setFile.bind(this);
    this.validateActivity = this.validateActivity.bind(this);
    this.validateExperience = this.validateExperience.bind(this);
    this.validateSave = this.validateSave.bind(this);
    this.handleSave= this.handleSave.bind(this);
    this.addGenre = this.addGenre.bind(this);
  }

  componentDidMount() {
    this.setupMap();
  }

  addGenre(e) {
    e.preventDefault();
    if (this.state.genre && !(this.state.genres.split("|*|").includes(this.state.genre))) {

      this.setState({
        genres: this.state.genres + `|*|${this.state.genre}`,
        genre: "",
        genreError: "",
      });
    } else if (this.state.genres.split("|*|").includes(this.state.genre)) {
      if (this.state.genre === "") {

      } else {
        this.setState({
          genreError: true
        });
      }
    }

  }

  validateExperience(experience) {
    const errors = {};
    if (!experience) {
      if (!this.state.title) {
        errors.Title = ("Please include a title.");
      }
      if (!this.state.description) {
        errors.Description = ("Please include a description.");
      }
      if (!this.state.genres){
        errors.Genres = ("Please include at least one tag.");
      }


      this.props.receiveFormErrors(errors);
      return false;
    }
    if (!experience.Title) {
      errors.Title = ("Please include a title.");
    }
    if (!experience.Description) {
      errors.Description = ("Please include a description.");
    }
    if (!experience.Genre) {
      errors.Genres = ("Please include at least one tag.");
    }
    this.props.receiveFormErrors(errors);
    return !(Object.keys(errors).length > 0);
  }

  validateSave(experience) {
    let errors = {};
    let bool = true;
    if (!this.validateExperience(experience)) {
      // errors.Experience = ("Please finish building your experience.");
      // this.props.receiveFormErrors(errors);
      return false;
    }
    let activities = Object.values(experience.Activities);
    if (Object.values(activities).length < 2) {
      errors.ActivitiesCount = ("Please add at least two activities to your experience.");
      this.props.receiveFormErrors(errors);
      return false;
    }
    activities.forEach(activity => {
      if (bool) {
        bool = this.validateActivity(activity);
      }
    });
    return bool;
  }

  handleBuild(e) {
    this.props.clearFormErrors();
    e.preventDefault();
    let experience = {
      User_ID: this.props.currentUser.id,
      UserName: this.props.currentUser.name,
      UserPictureURL: this.props.currentUser.pictureURL,
      Title: this.state.title,
      Description: this.state.description,
      Genre: this.state.genres,
      Duration: 0,
      Score: 1,
      Activities: {},

    };
    if (this.validateExperience(experience)) {
      this.setState({
        experience,
        title: "",
        description: "",
        // activity: {},
      });
    }
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

      this.setState({
        form: genre,
        activity: {},
      });
      // this.setupMap();

    };
  }

  validateActivity(activity) {
    const errors = {};
    if (!activity.Title) {
      errors.Title = "Please include a title.";
    }
    if (!activity.Description) {
      errors.Description = "Please include a description.";
    }
    if (!activity.ImageUrl) {
      errors.ImageUrl = "Please select an image.";

    }
    if (!activity.Duration) {
      errors.Duration = "Please provide a duration.";
    }

    this.props.receiveFormErrors(errors);
    return !(Object.keys(errors).length > 0);
  }

  createActivity(e, Genre) {
    this.props.clearFormErrors();

    e.preventDefault();
    let experience = this.state.experience;
    let activity = {
      ID: this.state.count,
      Genre,
      Description: this.state.description,
      Title: this.state.title,
      ImageUrl: this.state.ImageUrl,
      Lat: this.state.lat,
      Lng: this.state.lng,
      Duration: parseInt(this.state.duration),
    };
    if (this.validateActivity(activity)) {
      experience.Duration = experience.Duration + parseInt(this.state.duration);
      experience.Activities[this.state.count] = activity;
      this.setState({
        activity: undefined,
        experience,
        count: this.state.count + 1,
        duration: "",
        Lat: "",
        Lng: "",
        title: "",
        description: "",
        form: "",
        imgUrls: undefined,
        file: undefined,
        ImageUrl: ""

      });
      this.resetMap();
      this.setState({
        imgUrls: undefined,
        lat: undefined,
        lng: undefined,
        name: ""
      });
      this.props.clearFormErrors();
    }
  }



  setImageUrl(ImageUrl) {
    this.setState({
      ImageUrl
    });
  }

  setFile(e) {

    e.preventDefault();
    e.persist();
    let files = this.state.files;
    files.append('file', e.target.files[0]);
    files.append('data', this.state.count);
    let reader = new FileReader();
    reader.onload = () => {

      this.setState({
        files,
        file: reader.result,
        ImageUrl: reader.result,
      });
    };

    reader.readAsDataURL(e.target.files[0]);
  }

  handleSave(e) {
    this.props.clearFormErrors();

    e.preventDefault();
    let experience = this.state.experience;
    if (this.validateSave(experience)) {
      experience.ActivitiesString = JSON.stringify(this.state.experience.Activities);

      this.props.createExperience(experience, this.state.files).then(experience2 => {

        this.props.history.push(`/experience/${experience2.ID}`);
      });
    }
  }

 render() {



   return (
     <main className="create-page">
      <ActivityRibbon
        handleMouseEnter={()=>{}}
        handleMouseLeave={()=>{}}
        handleClick={()=>{}}
        handleSave={this.handleSave}
        experience={this.state.experience}/>

      <section className={'create-activity-form-container'}>
        <div className="form-header">
          <h1 className="form-title">{this.state.experience ? this.state.experience.Title : "Create an Experience"}</h1>


            <ul className="genre-tags">
              {this.state.genres && this.state.genres.split("|*|").map(genre => {
                if (genre) {
                  return (<li
                    key={genre}
                    className="genre-tag"
                    >#{genre}</li>);
                }
              })}
              {this.state.genreError && <div className="genre-tag-errors">Please don't duplicate tags</div>}
              <div className="error-container">
                {this.props.errors.Genres && this.props.errors.Genres}
              </div>
            </ul>
        </div>
        {!this.state.experience && <div className="experience-form">
          <div className="genre-container">
            <input
              onChange={this.update("genre")}
              className="genre-input"
              placeholder="Add a Genre"
              type="text"
              value={this.state.genre}
              onKeyPress={e => {if (e.key === 'Enter') this.addGenre(e);}}>
            </input>
            <button
             onClick={(e) => this.addGenre(e)}>
             <i className="fas fa-plus-square"></i></button>
          </div>
        <div className="error-container">
          {this.props.errors.Title && this.props.errors.Title}
        </div>
          <input
          onChange={this.update("title")}
          className="title-input"
          placeholder="Add a Title"
          type="text"
          value={this.state.title}></input>
          <div className="error-container">
            {this.props.errors.Description && this.props.errors.Description}
          </div>
        <textarea
          onChange={this.update("description")}

          className="description-input"
          placeholder="Add a Description"
          type="text"
          value={this.state.description}></textarea>
        <button
          className="btn"
          onClick={(e) => this.handleBuild(e)}>Build your Experience</button></div>}
        {this.state.experience && !this.props.errors.ActivitiesCount && <div className="activity-menu-header">{this.state.form ? "" : 'Select an activity type:' }</div>}
        {this.props.errors.ActivitiesCount && <div className="activity-menu-header red">{this.props.errors.Experience ? this.props.errors.Experience : this.props.errors.ActivitiesCount }</div>}
        {this.state.experience &&
          <ActivityMenu showForm={this.showForm}/>
        }
        <div className="maps-header">
          {this.state.activity && this.state.form !== "Custom" && !this.state.imgUrls ? "Search the Map to Find Photos": ""}
        </div>
        <input className={`google-maps-search ${this.state.activity && this.state.form !== "Custom" ? "" : "hidden"}`} type="search" placeholder="Search" id="pac-input"></input>
        <div className={this.state.activity && this.state.form !== "Custom"? "" : "hidden"} id="map">This is the map</div>
        {this.state.activity && <form className="create-activity-form">
          {this.state.file && <div className="custom-preview"><img src={this.state.file}></img></div>}
          {!this.props.ImageUrl && this.state.imgUrls && !this.state.file && <span className="photos-header">Choose a photo</span>}
          <div className="error-container img">
            {this.props.errors.ImageUrl && this.props.errors.ImageUrl}
          </div>
          {this.state.imgUrls && !this.state.file ? <div className="hide-scrollbar-div">
          <ul className="google-maps-photos" style={{overflowX: "scroll"}}>


            {this.state.imgUrls &&
              this.state.imgUrls.map((ImageUrl, index) => {

              return (<li
                key={index}
                className="google-maps-photo"><img
                src={ImageUrl}
                onClick={(e) => this.setImageUrl(ImageUrl)}
                className="location-preview-image"/></li>
            );})

          }</ul>
          <div className="gradient-overlay">
          </div>
        </div> : ""}
        {this.state.form !== "Custom" && <label className="file-input">
            <span className="file-input btn">Or Upload Your Own</span>
            <input
              onChange={(e) => this.setFile(e)}
              className="file-input"
              type="file"></input>



          </label>}
          {this.state.form === "Custom" && <label className="file-input">
              <span className="file-input btn">Upload Image</span>
              <input
                onChange={(e) => this.setFile(e)}
                accept="image/*"
                className="file-input"
                type="file"></input>
                {this.state.file && <img className="custom-preview" src={this.state.file}></img>}


            </label>}
            <div className="error-container">
              {this.props.errors.Duration && this.props.errors.Duration}
            </div>
          <label className="duration-input">

            <input
              placeholder="Add a Duration (minutes)"
              onChange={(e) => {

                e.preventDefault();

                if (!e.target.value || ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ""].includes(e.target.value[e.target.value.length - 1])) {

                  this.update("duration")(e);
                }
              }}
              value={this.state.duration}
              className="duration-input"
              type="text"></input>
          </label>


          <div className="error-container">
            {this.props.errors.Title && this.props.errors.Title}
          </div>
            <input
              onChange={this.update("title")}
              className="title-input"
              placeholder="Add a Title"
              type="text"
              value={this.state.title}></input>


              <div className="error-container">
                {this.props.errors.Description && this.props.errors.Description}
              </div>
            <textarea
              onChange={this.update("description")}
              className="description-input"
              placeholder="Add a Description"
              type="text"
              value={this.state.description}></textarea>




          <button
            onClick={(e) => this.createActivity(e, this.state.form)}
            className="activity-create btn">
            Add Activity
          </button>


        </form>}
      </section>
    </main>
  );}


  setupMap() {
    var mapOptions = {
      center: {lat: 37.7749, lng: -122.4194},
      zoom: 11,
      scrollwheel: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      styles: [
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
    this.setState({map});
    this.setState({autocomplete});
    this.setState({ marker });
    this.setState({ input });
    this.setState({ infowindow });
  }

  autocompleteCallback(infowindow, autocomplete, map, marker) {
    return () => {
      infowindow.close();
      var place = autocomplete.getPlace();
      this.setState({
        imgUrls: undefined,
        lat: undefined,
        lng: undefined,
        name: ""
      });
      if (place.photos) {
        const newImgUrls = place.photos.map(photo => {
          return photo.getUrl({'maxWidth': 1000, 'maxHeight': 1000});
        });

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
  resetMap() {
    this.state.map.setCenter({lat: 37.7749, lng: -122.4194});
    this.state.map.setZoom(11);
    this.state.marker.setVisible(false);
    this.state.infowindow.close();
    this.state.input.value = "";


  }
}
export default NewExperience;
