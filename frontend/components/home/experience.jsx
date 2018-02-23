import React from 'react';

class Experience extends React.Component {
  constructor(props) {
    super(props);
  }

   render() {
     return (
       <div className="experience-index-item">
         <aside className="vote-buttons">
           <i className="fas fa-angle-up"></i>
           <i className="fas fa-angle-down"></i>
         </aside>
         <section>
           <p>{this.props.experience.Title}</p>
           <section className="experience-ribbon"></section>
         </section>
       </div>
     );
   }
 }

export default Experience;
