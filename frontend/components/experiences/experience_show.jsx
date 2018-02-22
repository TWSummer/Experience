import React from 'react';
import ActivityRibbon from '../activity/activity_ribbon';
import DetailDisplay from './detail_display';



class ExperienceShow extends React.Component {
  constructor(props) {
    super(props);
    let experience = {
      duration: 180,
      title: "North Berkeley Date Night",
      genre: "Romantic",
      location: "",
      description: "A casual but romantic night out exploring the natural beauty of the East Bay. Start in North Berkeley's famed gourmet ghetto, wind your way up to the Berkeley hills, and enjoy the sights as you chow down on a hillside picnic"
    };
    let activities = [
      {
        id: 1,
        imageUrl: "https://b.zmtcdn.com/data/pictures/3/16844183/011d85755f62ab6ef3b8841f11f1c31f.png",
        title: "Meet at Gregoire's",
        location: "",
        genre: "Food",
        duration: 60,
        description: "Meet up at this famous French takeout spot to pick up the materials for a tasty picnic. You can't afford to miss out on their delightful potato puffs!",
      },
      {
        id: 2,
        imageUrl: "https://www.cycleworld.com/sites/cycleworld.com/files/styles/2000_1x_/public/images/2017/10/2018-suzuki-gsx-s750-hero.jpg?itok=9oc76nHH&fc=50,50",
        title: "Motorcycle Ride to the Berkeley Hills",
        location: "",
        genre: "Transit",
        duration: 20,
        description: "Take your date on a thrilling ride up into Berkeley's famous hills, just north of UC Berkeley's campus. Enjoy a fantastc view of both sides of the Bay.",
      },
      {
        id: 3,
        imageUrl: "http://2.bp.blogspot.com/-W8wEx8paoU4/VgIr838Bb8I/AAAAAAAAIdI/4z58zv36hrQ/s1600/wtd90.jpg",
        title: "Hiking in the Berkeley Hills",
        location: "",
        genre: "Views",
        duration: 60,
        description: "Climb up a variety of scenic trails in the cool Berkeley air. My personal favorite route is (Andrew tell me what it is because I didn't do any of this at Cal)",
      },
      {
        id: 4,
        imageUrl: "https://www.phillymag.com/wp-content/uploads/sites/3/2016/05/picnic.jpg",
        title: "Hillside Picnic",
        location: "",
        genre: "Food",
        duration: 40,
        description: "Dig in to the food you picked up earlier in the day. Hope you were patient! In these unfortunately drought filled times, at least you're likely to get a clear view wherever you look!",
      },
    ];
    this.state = {
      experience,
      activities,
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  handleMouseEnter(e, activityId) {
    // console.log('mouse enter', this.state, activityId);
    this.setState({selected: this.state.activities[activityId - 1]});
  }

  handleMouseLeave(e, activityId) {
    // console.log('mouse leave', this.state, activityId);
    if (!this.state.clicked) {
      this.setState({selected: undefined});
    } else {
      this.setState({selected: this.state.activities[this.state.clicked - 1]});
    }
  }

  handleClick(e, activityId) {
    console.log(activityId);
    this.setState({
      clicked: activityId,
      selected: this.state.activities[activityId - 1]
    })
  }

  precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  render() {


    return (
      <div className="experience-show-container">
      <ActivityRibbon
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
