import React from 'react';
import SmallExperienceContainer from '../small_experience/small_experience_container';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    this.props.fetchExperiences(10, 0);
  }

  handleScroll(e) {
    let heightBound = window.height * 0.8;
    if (heightBound > window.scrollY) {
        this.props.fetchExperiences(10, this.props.experiences.length);
    }
  }

   render() {
     return (
       <main className="home-page">
         <header className="home-header">
           <div className="header-text">SAN FRANCISCO</div>
           <img className="banner-image"
             src="https://i.imgur.com/O72fdnu.jpg" />
         </header>
         <section onScroll={this.handleScroll}>
           {
             this.props.experiences.map((experience) => {
               return (
                 <SmallExperienceContainer key={experience.ID} experience={experience} />
               );
             })
           }
         </section>
       </main>
     );
   }
 }

export default HomePage;
