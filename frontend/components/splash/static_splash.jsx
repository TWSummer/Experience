import React from 'react';
import {Link} from 'react-router-dom';

export default (props) => {
  return (
    <div className='splash-page-container'>
      <div className="box 1">
        <div className="splash-header"></div>
        <div className='large-logo'>
          <span>x</span><span>PERIENCE.CITY</span>
        </div>

        <img
          src="https://static1.fitbit.com/simple.b-cssdisabled-jpg.hd7d4926725cd53dd676d7fbbe4f27a52.pack?items=%2Fcontent%2Fassets%2Fadventures%2Fimages%2Fgallery%2Fyosemite8.jpg"
        className="splash-image"></img>
        <div className="splash-text">
            A community curated review site for whole experiences.
        </div>
      </div>
      <div className="box 2">
        <div className="splash-content-1">
          Anyone can choose a nice restaurant...
        </div>
        <div className="starry-sky">
          <div className="splash-content-2">
            Sites like Yelp and TripAdvisor provide <strong>more stars than than the night sky</strong> to help us find the <strong>best chinese restaurant</strong> within walking distance of our homes. <br/><br/><strong>Can't we do better than that?</strong>
          </div>
        </div>
        <div className="splash-content-3">
          ...but how do you plan an unforgettable night?
        </div>

      </div>

      <div className="box 3">
        <div className="xperience-blurb">
          On <strong>Xperience.City</strong>, explore cohesive experiences submitted by other users.
          Every experience is a <strong>hand-picked</strong> selection of activities that is <strong>greater than the sum of its parts</strong>.
          Experiences are vetted by the community through our voting system, letting the best <strong>rise to the top</strong> .
        </div>
        <div className="cool-images-header">Use Xperience.City to...</div>
        <div className="cool-images">
          <div className="explore-image">
            <div className="cool-images-overlay"></div>
            <span className="cool-span">Explore a New City</span>
          </div>
          <div className="date-image">
            <div className="cool-images-overlay"></div>
            <span className="cool-span">Find an Amazing Date</span>
          </div>
          <div className="friend-image">
            <div className="cool-images-overlay"></div>

            <span className="cool-span">Make Plans with Friends</span>
          </div>
        </div>

      </div>
      <div className= "link-container">
        <Link className="splash-button btn" to="/home"> Start Now </Link>
      </div>


    </div>



  );
};
