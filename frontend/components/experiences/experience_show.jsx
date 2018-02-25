import React from 'react';
import ActivityRibbon from '../activity/activity_ribbon';
import DetailDisplay from './detail_display';



class ExperienceShow extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {};
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

    this.setState({selected: this.props.experience.activities[activityId - 1]});
  }

  handleMouseLeave(e, activityId) {

    if (!this.state.clicked) {
      // this.setState({selected: undefined});
    } else {
      this.setState({selected: this.props.experience.activities[this.state.clicked - 1]});
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
        selected: this.props.experience.activities[activityId - 1]
      });
    }
  }

  precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  render() {


    return (
      this.props.experience ? (
        <div className="experience-show-container">
          <ActivityRibbon
            clicked={this.state.clicked}
            experience={this.props.experience}
            handleMouseLeave={this.handleMouseLeave}
            handleMouseEnter={this.handleMouseEnter}
            handleClick={this.handleClick}
            />
          <DetailDisplay
            experience={this.props.experience}
            precisionRound={this.precisionRound}
            selectedActivity={this.state.selected}
            />
        </div>
      ) :
      <div className="experience-show-container"></div>

    );
  }

}
export default ExperienceShow;
