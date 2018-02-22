export const fetchExperiences = (quantity, offset) => (
  $.ajax({
    method: 'GET',
    url: `/api/experiences/?quantity=${quantity}&offset=${offset}`
  })
);
