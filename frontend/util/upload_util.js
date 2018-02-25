export const uploadFiles = (expID, fileData) => {
  return $.ajax({
    url: `api/experience/${expID}/upload`,
    method: 'POST',
    data: fileData,
    contentType: false,
    processData: false,

  });
};
