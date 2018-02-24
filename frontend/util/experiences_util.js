export const fetchExperiences = (quantity, offset) => (
  $.ajax({
    method: 'GET',
    url: `/api/experiences/?quantity=${quantity}&offset=${offset}`
  })
);

export const createExperience = (exp) => (
  $.ajax({
    method: "POST",
    url:"/api/experiences",
    data: exp,
    contentType: false,
    processData: false,
  })
);

export const fetchExperience = (expID) => (
  $.ajax({
    method: "GET",
    url:`/api/experiences/`,
    data: { ID: expID }
  })
);
