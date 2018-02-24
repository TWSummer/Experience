import React from 'react';

class SmallExperience extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props.experience);
  }

   render() {
     return (
       <div className="experience-index-item">
         <section>
           <div className="small-exp-title">
             {this.props.experience.Title.toUpperCase()}
           </div>
           <div className="small-exp-ribbion-box">
             <aside className="vote-buttons">
               <i className="fas fa-angle-up"></i>
               <i className="fas fa-angle-down"></i>
             </aside>
             <section className="experience-ribbon"></section>
           </div>
         </section>
       </div>
     );
   }
 }

export default SmallExperience;
