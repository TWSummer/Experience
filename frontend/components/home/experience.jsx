import React from 'react';

class Experience extends React.Component {
  constructor(props) {
    super(props);
  }

   render() {
     return (
       <div className="experience-index-item">
         <p>{this.props.experience.Title}</p>
         <section className="experience-ribbon"></section>
       </div>
     );
   }
 }

export default Experience;
