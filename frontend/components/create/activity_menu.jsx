import React from 'react';

export default ({showForm}) => (

<ul className="activity-menu">
  <li
    className="activity-menu-button"
    onClick={showForm("Food")}
    >
    <i className="fas fa-utensils"></i>
    <span>Food</span>

  </li>
  <li
    className="activity-menu-button"
    onClick={showForm("Transit")}
    >
    <i className="fas fa-car"></i>
    <span>Transit</span>

  </li>
  <li
    className="activity-menu-button"
    onClick={showForm("Views")}
    >
    <i className="far fa-image"></i>
    <span>Views</span>

  </li>
  <li
    className="activity-menu-button"
    onClick={showForm("Outdoors")}
    >
    <i className="fas fa-tree"></i>
    <span>Outdoors</span>

  </li>
  <li
    className="activity-menu-button"
    onClick={showForm("Venues")}
    >
    <i className="fas fa-users"></i>
    <span>Venues</span>

  </li>
  <li
    className="activity-menu-button"
    onClick={showForm("Explore")}
    >
    <i className="fas fa-map-marker-alt"></i>
    <span>Explore</span>

  </li>
  <li
    className="activity-menu-button"
    onClick={showForm("Custom")}
    >
    <i className="fas fa-asterisk"></i>
    <span>Custom</span>

  </li>


</ul>
)
