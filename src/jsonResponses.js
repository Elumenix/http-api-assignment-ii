const getUsers = (request, response) => {
  response.writeHead(200, { 'Content-Type': request.headers.accept });

  let content = {
    message: 'Please work',
  };

  content = JSON.stringify(content);

  response.write(content);
  response.end();
};

module.exports.getUsers = getUsers;
