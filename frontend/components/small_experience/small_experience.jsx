import React from 'react';

class SmallExperience extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props.experience.Activities);
    this.votes = this.votes.bind(this);
    this.resizeActivity = this.resizeActivity.bind(this);
    this.state = {
      actHTMLArr: [],
      totalDur: 0
    };
  }

  votes() {
    return (
      <aside className="vote-buttons">
        <div className="up-vote-button"
          onClick={e => this.props.voteOnExperience(this.props.experience.ID, 1, this.props.userID)}>
          <i className="fas fa-angle-up"></i>
        </div>
        <div className="vote-count">
          {this.props.experience.Score}
        </div>
        <div className="down-vote-button"
          onClick={e => this.props.voteOnExperience(this.props.experience.ID, -1, this.props.userID)}>
          <i className="fas fa-angle-down"></i>
        </div>
      </aside>
    );
  }

  resizeActivity(id, type) {
    this.setState({actHTMLArr: this.state.actHTMLArr.map(act => {
        let actStyle;
        let dur = act.props.data;
        let selectedActDur = this.props.experience.Activities[id].Duration;
        if (type === 'shrink') {
          actStyle = {
            width: (dur/this.state.totalDur) * 100 + '%',
            backgroundImage: act.props.style.backgroundImage
          };
        } else if (id === act.key && type === 'grow') {
          actStyle = {
            width: '65%',
            backgroundImage: act.props.style.backgroundImage
          };
        } else if (type === 'grow') {
          actStyle = {
            width: (dur/(this.state.totalDur - selectedActDur)) * 35 + '%',
            backgroundImage: act.props.style.backgroundImage
          };
        }
        return (
          <div
            key={ act.key }
            data={ dur }
            className="small-exp-activity"
            onMouseEnter={(e) => this.resizeActivity(act.key, 'grow')}
            onMouseLeave={(e) => this.resizeActivity(act.key, 'shrink')}
            style={ actStyle }>
          </div>
        );
      })
    });
  }

  componentDidMount(){
    let totalDur = 0;
    let acts = this.props.experience.Activities;
    let actHTMLArr = [];
    if (acts === null) return (
        <section className="experience-ribbon"></section>);
    Object.keys(acts).forEach(key => {
      totalDur += acts[key].Duration;
    });
    actHTMLArr = Object.keys(acts).map(key => {
      let curAct = acts[key];
      return(
        <div
          key={ curAct.ID }
          data={ curAct.Duration }
          className="small-exp-activity"
          onMouseEnter={(e) => this.resizeActivity(curAct.ID, 'grow')}
          onMouseLeave={(e) => this.resizeActivity(curAct.ID, 'shrink')}
          style={{
            width: curAct.Duration/totalDur * 100 + '%',
            backgroundImage: 'url(' + curAct.ImageUrl + ')'
          }}>
        </div>
      );
    });
    this.setState({actHTMLArr: actHTMLArr, totalDur: totalDur});
  }

   render() {
     return (
       <div className="experience-index-item">
         <section>
           <a href={`#/experience/${this.props.experience.ID}`}>
             <div className="small-exp-title">
               {this.props.experience.Title.toUpperCase()}
             </div>
           </a>
           <div className="small-exp-ribbion-box">
             {this.votes()}
             <section className="experience-ribbon">
               { this.state.actHTMLArr }
             </section>
           </div>
         </section>
       </div>
     );
   }
 }

export default SmallExperience;
