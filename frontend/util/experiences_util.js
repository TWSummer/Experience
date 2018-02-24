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
    data: exp
  })
);

export const fetchExperience = (expID) => (
  $.ajax({
    method: "GET",
    url:`/api/experience/`,
    data: { ID: expID }
  })
);
