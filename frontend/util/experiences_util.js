export const fetchExperiences = (quantity, offset) => (
  $.ajax({
    method: 'GET',
    url: `/api/experiences/?quantity=${quantity}&offset=${offset}`
  })
);

export const createExperience = (exp) => {
  console.log("ASDFKLSADHFLKASHDFSAFD", exp);
  return $.ajax({
    method: "POST",
    url:"/api/experiences",
    data: exp,
    // dataType: 'json',
    // contentType: "application/json",
  });
};

export const fetchExperience = (expID) => (
  $.ajax({
    method: "GET",
    url:`/api/experience/`,
    data: { ID: expID }
  })
);
