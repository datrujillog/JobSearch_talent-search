const responseMessage = (ok, status, message, data=[]) => {
  return {
    ok,
    status,
    message,
    data,
  };
};

module.exports = responseMessage