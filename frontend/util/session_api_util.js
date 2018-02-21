

export const loginUser = (UserID, OAuthID) => (
  $.ajax({
    method: "POST",
    url: "/api/users",
    data: {
      UserID,
      OAuthID,
    }
  })
);





// Load the SDK asynchronously
