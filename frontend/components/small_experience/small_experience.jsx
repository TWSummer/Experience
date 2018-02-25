import React from 'react';

class SmallExperience extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props.experience);
    this.votes = this.votes.bind(this);
  }

  votes() {
    return (
      <aside className="vote-buttons">
        <div className="up-vote-button"
          onClick={e => this.props.voteOnExperience(this.props.experience.ID, 1)}>
          <i className="fas fa-angle-up"></i>
        </div>
        <div className="vote-count">
          {this.props.experience.Score}
        </div>
        <div className="down-vote-button"
          onClick={e => this.props.voteOnExperience(this.props.experience.ID, -1)}>
          <i className="fas fa-angle-down"></i>
        </div>
      </aside>
    );
  }

   render() {
     return (
       <div className="experience-index-item">
         <section>
           <div className="small-exp-title">
             {this.props.experience.Title.toUpperCase()}
           </div>
           <div className="small-exp-ribbion-box">
             {this.votes()}
             <section className="experience-ribbon">
               
             </section>
           </div>
         </section>
       </div>
     );
   }
 }

export default SmallExperience;
