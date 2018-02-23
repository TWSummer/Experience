import React from 'react';
import SmallExperienceContainer from '../small_experience/small_experience_container';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchExperiences(10, 0);
  }

   render() {
     return (
       <main className="home-page">
         <header className="home-header">
           <div className="header-text">SAN FRANCISCO</div>
           <img className="banner-image"
             src="https://i.imgur.com/O72fdnu.jpg" />
         </header>
         <section>
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
