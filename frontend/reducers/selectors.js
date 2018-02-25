export const singleExperience = (state, ownProps) => {
  if (state.entities.experiences[ownProps.match.params.id]) {
    let activitiesArr = [];
    let experience = state.entities.experiences[ownProps.match.params.id];
    if (experience.Activities) {
      Object.keys(experience.Activities).forEach((id) => {
        activitiesArr.push(experience.Activities[id]);
      });
      experience.activities = activitiesArr;
      return experience;
    }
  }
  return null;
};
