import React from 'react';

class SmallExperience extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.votes = this.votes.bind(this);
    this.resizeActivity = this.resizeActivity.bind(this);
    this.state = {
      actHTMLArr: [],
      totalDur: 0
    };
    this.icons = {
      Food: <i className="fa fa-utensils small-exp-icon"></i>,
      Transit: <i className="fas fa-car small-exp-icon"></i>,
      Views: <i className="fas fa-eye small-exp-icon"></i>,
      Outdoors: <i className="fas fa-tree small-exp-icon"></i>,
      Venues: <i className="fas fa-users small-exp-icon"></i>,
      Explore: <i className="fas fa-map-marker-alt small-exp-icon"></i>,
      Custom: <i className="fas fa-asterisk small-exp-icon"></i>,
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
    let acts = this.props.experience.Activities;
    this.setState({actHTMLArr: Object.keys(acts).map(key => {
        let curAct = acts[key];
        let actStyle;
        let dur = curAct.Duration;
        let selectedActDur = acts[id].Duration;
        let title = curAct.Title.split(" ");
        let description = "";
        title = title.map((word, idx) => (
          <div key={idx} className="small-exp-word">{ word.toUpperCase() }</div>
        ));
        if (type === 'shrink') {
          actStyle = {
            width: (dur/this.state.totalDur) * 100 + '%',
            backgroundImage: 'url(' + curAct.ImageUrl + ')'
          };
        } else if (id == curAct.ID && type === 'grow') {
          actStyle = {
            width: '65%',
            backgroundImage: 'url(' + curAct.ImageUrl + ')'
          };
          title = <div className="small-exp-selected-title">
                    { curAct.Title.toUpperCase() }
                 </div>;
          description = curAct.Description;
        } else if (id !== curAct.ID && type === 'grow') {
          actStyle = {
            width: (dur/(this.state.totalDur - selectedActDur)) * 35 + '%',
            backgroundImage: 'url(' + curAct.ImageUrl + ')'
          };
        }
        return (
          <div
            key={ curAct.ID }
            data={ dur }
            className="small-exp-activity"
            onMouseEnter={(e) => this.resizeActivity(curAct.ID, 'grow')}
            onMouseLeave={(e) => this.resizeActivity(curAct.ID, 'shrink')}
            style={ actStyle }>
            <div className="small-exp-text-box">
              { title }
            </div>
            <div className="small-exp-description">
            </div>
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
      let title = curAct.Title.split(" ");
      title = title.map((word, idx) => (
        <div key={idx} className="small-exp-word">{ word.toUpperCase() }</div>
      ));
      return(
        <div
          key={ curAct.ID }
          data={ curAct.Duration }
          className="small-exp-activity"
          onMouseEnter={(e) => this.resizeActivity(curAct.ID, 'grow')}
          onMouseLeave={(e) => this.resizeActivity(curAct.ID, 'shrink')}
          style={{
            width: (curAct.Duration/totalDur) * 100 + '%',
            backgroundImage: 'url(' + curAct.ImageUrl + ')'
          }}>
          <div className="small-exp-text-box">
            { title }
          </div>
          <div className="small-exp-description"></div>
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
