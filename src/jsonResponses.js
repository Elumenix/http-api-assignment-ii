const users = {};

const getUsers = (request, response) => {
  response.writeHead(200, { 'Content-Type': request.headers.accept });

  let content = {
    users,
  };

  content = JSON.stringify(content);

  response.write(content);
  response.end();
};

const getUsersMeta = (request, response) => {
  response.writeHead(200, { 'Content-Type': request.headers.accept });
  response.end();
}

module.exports.getUsers = getUsers;
module.exports.getUsersMeta = getUsersMeta;
