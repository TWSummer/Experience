import React from 'react';

export default ({experience, selectedActivity, precisionRound}) => {

  let itemToDisplay = selectedActivity ? selectedActivity : experience;
  console.log(itemToDisplay);
  return (
  <div className="detail-display">
    <div className="detail-display-header">
      <h1>{itemToDisplay.title}</h1>
      <span>Time: {precisionRound(itemToDisplay.duration/60, 1)} hours</span>
    </div>
    <div className="map-container">

    </div>

    <ul className="details-details-details">
      <span className="label">Details:</span>
      <li>
        Genre: {itemToDisplay.genre}

      </li>

    </ul>
    <div className="detail-display-description">
      <span className="label">
        Description:
      </span>
      <p>
        {itemToDisplay.description}
      </p>
    </div>

  </div>
);
};
