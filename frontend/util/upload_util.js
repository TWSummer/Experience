export const uploadFiles = (fileData) => {
  return $.ajax({
    url: 'api/test',
    method: 'POST',
    data: fileData,
    contentType: false,
    processData: false,

  });
};
