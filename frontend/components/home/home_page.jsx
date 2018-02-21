import React from 'react';

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
         {
           this.props.experiences.map((experience) => {
             return (
               <p>{experience.title}</p>
             );
           })
         }
       </main>
     );
   }
 }

export default HomePage;
