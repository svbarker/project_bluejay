module.exports = {
  createResponse: data => {
    const isError = data instanceof Error;
    const response = {
      success: isError ? false : true
    };
    if (isError) {
      response.apiError = data.message;
    } else {
      response.data = data;
    }
    return response;
  }
};
