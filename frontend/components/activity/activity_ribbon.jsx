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


    this.state = {
      activities: props.activities,
      selectedActivity: undefined,
      colors: {},
    };
    let vibrant;

    props.activities.forEach(activity => {
      // Vibrant.from(activity.imageUrl)
      //   .quality(10)
      //   .clearFilters()
      //   .getPalette()
      //   .then((palette) => {
      //     vibrant = palette;
      //     console.log(vibrant);
      //     console.log(vibrant.Vibrant.getHex());
      //     let newColors = this.state.colors
      //     newColors[activity.id].backgroundImage = `linear-gradient(to bottom right, ${this.state.vibrant.DarkVibrant.getHex()}, ${this.state.vibrant.LightMuted.getHex()})`;
      //     newColors[activity.id].height = `${activity.duration/experience.duration}%`;
      //     this.setState({
      //       styles: newColors,
      //     });
          activity.style = {
            height: `${activity.duration/this.props.experience.duration * 100}%`,
            // backgroundImage: `linear-gradient(to bottom right, ${this.state.vibrant.DarkVibrant.getHex()}, ${this.state.vibrant.LightMuted.getHex()})`
          };
      //   });
      }


    );

  }



  render() {
    const icons = {
      Food: <i className="fas fa-utensils"></i>,
      Transit: <i className="fas fa-car"></i>,
      Views: <i className="far fa-image"></i>,
    };
    const activityIndexItems = this.state.activities.map(activity => {
      return (
        <li
          onMouseEnter={(e) => this.props.handleMouseEnter(e, activity.id)}
          onMouseLeave={(e) => this.props.handleMouseLeave(e, activity.id)}
          onClick={(e) => this.props.handleClick(e, activity.id)}
          key={activity.id}
          style={activity.style}
          className={"activity-index-item " + (this.props.clicked === activity.id ? "selected" : "")} >
          <div className="activity-overlay">
            {icons[activity.genre]}
          </div>
          <span className="activity-index-item title">
            {activity.title}
          </span>
          <img src={activity.imageUrl}>
          </img>
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
