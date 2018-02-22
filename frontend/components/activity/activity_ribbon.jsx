import React from 'react';
import * as Vibrant from 'node-vibrant';
// THOUGHTS REGARDING THE ULTIMATE SHAPE OF ACTIVITIES:
// 1) Activities have a type, that will determine the underlying information
// 2) The types are as follows: Food, Outdoors, Venue, Transit, Views, Explore, (Other)
// 3) Each experience also has an overall genre.
// 4) These genres are as follows: Romantic, Solo, Group, Casual, Adventure
// 5) Not sure yet how they will affect the rendering of an activity.
// 6) Every activity will have a type, genre, duration, location, title, and description
// 7) Food will have a cuisine and a sit down or to go option.
// 8) Outdoor activities will have a strain level?
// 9) Transit activities will need a start location and an end location

class ActivityRibbon extends React.Component {
  constructor(props) {
    super(props);
    let experience = {
      duration: 180
    }
    let activities = [
      {
        id: 1,
        imageUrl: "https://b.zmtcdn.com/data/pictures/3/16844183/011d85755f62ab6ef3b8841f11f1c31f.png",
        title: "Meet at Gregoire's",
        location: "",
        genre: "food",
        duration: 60,
        description: "Meet up at this famous French takeout spot to pick up the materials for a tasty picnic. You can't afford to miss out on their delightful potato puffs!",
      },
      {
        id: 2,
        imageUrl: "https://cdn.pixabay.com/photo/2016/02/02/06/38/suzuki-1174859_1280.jpg",
        title: "Motorcycle Ride to the Berkeley Hills",
        location: "",
        genre: "transit",
        duration: 20,
        description: "Take your date on a thrilling ride up into Berkeley's famous hills, with a fantastc view of both sides of the Bay.",
      },
      {
        id: 3,
        imageUrl: "http://2.bp.blogspot.com/-W8wEx8paoU4/VgIr838Bb8I/AAAAAAAAIdI/4z58zv36hrQ/s1600/wtd90.jpg",
        title: "Hiking in the Berkeley Hills",
        location: "",
        genre: "views",
        duration: 60,
        description: "Climb up a variety of scenic trails in the cool Berkeley air. My personal favorite route is (Andrew tell me what it is because I didn't do any of this at Cal)",
      },
      {
        id: 4,
        imageUrl: "https://www.phillymag.com/wp-content/uploads/sites/3/2016/05/picnic.jpg",
        title: "Hillside Picnic",
        location: "",
        genre: "food",
        duration: 40,
        description: "Dig in to the food you picked up earlier in the day. Hope you were patient! In these unfortunately drought filled times, at least you're likely to get a clear view wherever you look!",
      },
    ];

    this.state = {
      activities,
      selectedActivity: undefined,
      colors: {},
    };
    let vibrant;

    activities.forEach(activity => {
      Vibrant.from(activity.imageUrl)
        .quality(10)
        .clearFilters()
        .getPalette()
        .then((palette) => {
          vibrant = palette;
          console.log(vibrant);
          console.log(vibrant.Vibrant.getHex());
          let newColors = this.state.colors
          newColors[activity.id].backgroundImage = `linear-gradient(to bottom right, ${this.state.vibrant.DarkVibrant.getHex()}, ${this.state.vibrant.LightMuted.getHex()})`;
          newColors[activity.id].height = `${activity.duration/experience.duration}%`;
          this.setState({
            styles: newColors,
          });
          activity.style = {
            height: `${activity.duration/experience.duration}%`,
            backgroundImage: `linear-gradient(to bottom right, ${this.state.vibrant.DarkVibrant.getHex()}, ${this.state.vibrant.LightMuted.getHex()})`
          }
        });
      }
    );






  }

  render() {

    const activityIndexItems = this.state.activities.map(activity => {
      return (
        <li
          key={activity.id}
          style={activity.style}
          className="activity-index-item">
          <div className="activity-overlay">
            <i className="fas fa-utensils"></i>
          </div>

        </li>
      );
    });

    return (
      <div className="activity-ribbon-container">
        <ul className="activity-ribbon-list">
          {activityIndexItems}
        </ul>
      </div>


    );

  }



}

export default ActivityRibbon;
