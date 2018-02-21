import React from 'react';
import Experience from './experience';

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
           <img src="https://i.imgur.com/O72fdnu.jpg" />
         </header>
         {
           this.props.experiences.map((experience) => {
             return (
               <Experience key={experience.id} experience={experience} />
             );
           })
         }
       </main>
     );
   }
 }

export default HomePage;
