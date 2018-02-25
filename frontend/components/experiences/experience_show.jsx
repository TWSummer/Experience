import React from 'react';
import ActivityRibbon from '../activity/activity_ribbon';
import DetailDisplay from './detail_display';



class ExperienceShow extends React.Component {
  constructor(props) {
    super(props);
    let activities = {
      "1": {
        id: 1,
        imageUrl: "https://b.zmtcdn.com/data/pictures/3/16844183/011d85755f62ab6ef3b8841f11f1c31f.png",
        Title: "Meet at Gregoire's",
        lat: undefined,
        lng: undefined,
        Genre: "Food",
        Duration: 60,
        Description: "Meet up at this famous French takeout spot to pick up the materials for a tasty picnic. You can't afford to miss out on their delightful potato puffs!",
      },
      "2": {
        id: 2,
        imageUrl: "https://www.cycleworld.com/sites/cycleworld.com/files/styles/2000_1x_/public/images/2017/10/2018-suzuki-gsx-s750-hero.jpg?itok=9oc76nHH&fc=50,50",
        Title: "Motorcycle Ride to the Berkeley Hills",
        lat: 37.9,
        lng: -122.5,
        Genre: "Transit",
        Duration: 20,
        Description: "Take your date on a thrilling ride up into Berkeley's famous hills, just north of UC Berkeley's campus. Enjoy a fantastc view of both sides of the Bay.",
      },
      "3": {
        id: 3,
        imageUrl: "http://2.bp.blogspot.com/-W8wEx8paoU4/VgIr838Bb8I/AAAAAAAAIdI/4z58zv36hrQ/s1600/wtd90.jpg",
        Title: "Hiking in the Berkeley Hills",
        lat: 37.7747,
        lng: -122.43,
        Genre: "Views",
        Duration: 60,
        Description: "Climb up a variety of scenic trails in the cool Berkeley air. My personal favorite route is (Andrew tell me what it is because I didn't do any of this at Cal)",
      },
      "4": {
        id: 4,
        imageUrl: "https://www.phillymag.com/wp-content/uploads/sites/3/2016/05/picnic.jpg",
        Title: "Hillside Picnic",
        lat: 37.79,
        lng: -121.95,
        Genre: "Food",
        Duration: 40,
        Description: "Dig in to the food you picked up earlier in the day. Hope you were patient! In these unfortunately drought filled times, at least you're likely to get a clear view wherever you look!",
      },
    };
    let experience = {
      "Duration": 180,
      "Title": "North Berkeley Date Night",
      "Genre": "Romantic",
      "Description": "A casual but romantic night out exploring the natural beauty of the East Bay. Start in North Berkeley's famed gourmet ghetto, wind your way up to the Berkeley hills, and enjoy the sights as you chow down on a hillside picnic",
      ActivitiesString: JSON.stringify(activities),
      Activities: activities,
    };
    this.state = {
      experience,
      activities,
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.props.createExperience(experience);

  }

  componentDidMount() {
    this.props.fetchExperience(this.props.match.params.id)
      .then((result) => console.log(result));
  }

  componentWillReceiveProps(newProps, oldProps) {
    // if (!oldProps.match) {
    //   this.props.fetchExperience(newProps.match.params.id);
    // } else if (oldProps.match.params.id !== newProps.match.params.id) {
    //   this.props.fetchExperience(newProps.match.params.id);
    // }
  }

  handleMouseEnter(e, activityId) {

    this.setState({selected: this.state.activities[activityId - 1]});
  }

  handleMouseLeave(e, activityId) {

    if (!this.state.clicked) {
      // this.setState({selected: undefined});
    } else {
      this.setState({selected: this.state.activities[this.state.clicked - 1]});
    }
  }

  handleClick(e, activityId) {

    if (this.state.clicked === activityId) {
      this.setState({
        clicked: undefined,
        selected: undefined, // This makes it so that when you click, it immediately unselects the activity
                            // Comment that line out to keep the activity selected until mouse leave.
      });
    } else {
      this.setState({
        clicked: activityId,
        selected: this.state.activities[activityId - 1]
      });
    }
  }

  precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  render() {


    return (
      <div className="experience-show-container">
      <ActivityRibbon
        clicked={this.state.clicked}
        experience={this.state.experience}
        handleMouseLeave={this.handleMouseLeave}
        handleMouseEnter={this.handleMouseEnter}
        handleClick={this.handleClick}
        activities={this.state.activities}/>
        <DetailDisplay
          experience={this.state.experience}
          precisionRound={this.precisionRound}
          selectedActivity={this.state.selected}
          />
      </div>
    );
  }

}
export default ExperienceShow;
