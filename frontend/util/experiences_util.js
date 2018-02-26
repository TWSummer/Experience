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
    url:"/api/experience",
    data: exp,
    // dataType: 'json',
    // contentType: "application/json",
  });
};

export const fetchExperience = (expID) => (
  $.ajax({
    method: "GET",
    url:`/api/experience/${expID}`
  })
);

export const voteOnExperience = (expID, vote, userID) => (
  $.ajax({
    method: "POST",
    url: `/api/experience/${expID}/vote`,
    data: { voteValue: vote, userID }
  })
);
