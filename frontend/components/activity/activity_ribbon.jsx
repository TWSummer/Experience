import React from 'react';

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



  }

  render() {

    return (
      <div className="activity-ribbon-container">
        <ul className="activity-ribbon-list">
          <li
            style={{"height": "33%",}}
            className="activity-index-item">
            <div className="activity-overlay">
              <i class="fas fa-utensils"></i>
            </div>
            <img
              src="https://b.zmtcdn.com/data/pictures/3/16844183/011d85755f62ab6ef3b8841f11f1c31f.png">
            </img>
          </li>
          <li
            style={{"height": "13%",}}
            className="activity-index-item">
            <div className="activity-overlay">
              <i class="fas fa-car"></i>
            </div>
            <img
              src="https://cdn.rideapart.com/wp-content/uploads/2017/01/2018-Suzuki-GSX250R-BLK-770x440.jpg">
            </img>

          </li>
          <li
            style={{"height": "33%",}}
            className="activity-index-item">
            <div className="activity-overlay">
              <i class="fas fa-image"></i>
            </div>
            <img
              src="http://2.bp.blogspot.com/-W8wEx8paoU4/VgIr838Bb8I/AAAAAAAAIdI/4z58zv36hrQ/s1600/wtd90.jpg">
            </img>

          </li>
          <li
            style={{"height": "20%",}}
            className="activity-index-item">
            <div className="activity-overlay">
              <i class="fas fa-utensils"></i>
            </div>
            <img
              src="https://us-east-1.tchyn.io/snopes-production/uploads/2015/01/picnic_fb.jpg">
            </img>


          </li>
        </ul>
      </div>


    );

  }



}

export default ActivityRibbon;
