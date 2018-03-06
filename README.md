[Xperience City](http://ec2-18-222-35-87.us-east-2.compute.amazonaws.com/#/create)
======

Xperience is a web application that allows users to create, share, and vote on experiences. We are inundated with reviews for restaurants, hikes, venues, but simply planning your days based on star ratings lead to disjointed and unmemorable experiences. By allowing users to provide context for their curated activities, the experiences shared on our application become more than the sum of their parts, and we are excited to share these experiences with the wider world.

## Contents
[Features](#features) | [Technologies Used](#technologies-used) | [Highlighted Features](#highlighted-features) | [Project Plan](#project-plan)

## Features
  * Experiences
    * Users can create experiences, providing them with a title, a text description, and semantic tag.
    * Users can find experiences through search based on experience title as well as any user supplied tags.
  * Activities
    * Users can find activities to add to their experiences through the Google Maps API, auto-populating results and providing geographical locations, routing, and geotagged images.
    * Users can upload their own photos for their activities, which are uploaded to an AWS S3 server.  
  * Authentication
    * Users can conveniently sign in with their Facebook account. Once logged in, Users can remain logged in as long as they like, or until they choose to log out.
    * Users can try out the site before signing up using our demo login feature.
  * Voting
    * Users can vote on experiences of their choosing. Experiences are displayed based on their scores to provide community ratings of experiences.
  * Docker Container Deployment


## Technologies Used
 * Backend
   * Database: PostgreSQL (v 0.18)
   * Routing and Controllers: Gin (v 1.10)
   * Models: Gorm
   * Auth: Facebook Authentication using Graph API
   * File Storage: Amazon AWS S3
 * Frontend
   * React (v 16.2.0) using a Redux implementation pattern
   * jQuery used only for AJAX requests
   * Google Maps API to provide activity search
   * Backend interaction and static file delivery using Go
   * Styling done with CSS3 and HTML5


## Highlighted Features

### Hybrid SQL/NoSQL Database
Xperience takes advantage of PostgreSQL's JSON column type to provide both relational and non-relational data storage. Experiences are stored as relational data in the database, to facilitate search and filtering across all experiences based on a variety of factors such as score and user tags. Meanwhile, the component activities that belong to the experience are unique to that experience, and are stored as JSON objects in the experience's postgres relation, allowing for quick reads and writes to the database for the activities belonging to the experience. This combination maximizes the benefits of relational database technologies while avoiding unnecessary joins through selective denormalized data storage.

### Google Maps API
Xperience has thoroughly integrated the Google Maps API into our UI/UX, providing a styling interface for users to find their favorite spots, connect them with an optimal route, and provide a selection of quality photos to illustrate their experiences. In addition to serving as an experience creation interface, we use the Google Maps SDK to dynamically scope the map's view based on the experience or activity being displayed, combining with the photos to provide an overview of the activity's location.

### Experience and Activity Ribbons
By leveraging React/Redux's powerful diffing algorithm, Xperience provides an incredibly reactive interface that is simply a joy to use. At the heart of this user experience is the experience ribbon. The component is designed to provide a visceral feeling when doing something as simple as hovering over the the component, making the reading of activity descriptions a very enjoyable process. The sizing of each specific activity in the ribbon is based on its duration relative to the duration of the whole event. The resizing occurs dynamically, scaling all activities to the proper size with a combination of JavaScript and CSS. 


### Golang Backend
Xperience pairs the performance benefits of Go's low-level implementation by using light weight frameworks to ensure a responsive backend API for the React-based user interface. Working with Go has been both educational for the team and beneficial for the application

## Project Plan

Future updates to the app will include:
  * Provide suggested experiences to Users
  * Expand geographic coverage of experiences.
  * Increase interactivity and responsiveness of User interface
  * User Profiles
  * Update and Delete actions
