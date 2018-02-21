import React from 'react';

class Experience extends React.Component {
  constructor(props) {
    super(props);
  }

   render() {
     return (
       <span className="experience-index-item">
         <p>{this.props.experience.title}</p>
       </span>
     );
   }
 }

export default Experience;
