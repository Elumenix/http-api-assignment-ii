const users = {};

const updateUsers = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(responseJSON));
    response.end();
    return response;
  }

  let responseCode = 204;

  if (!users[body.name]) {
    responseCode = 201;
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    response.writeHead(responseCode, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(responseJSON));
    response.end();
    return response;
  }

  response.writeHead(responseCode, { 'Content-Type': 'application/json' });
  response.end();
  return response;
};

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
};

const notFound = (request, response) => {
  response.writeHead(404, { 'Content-Type': request.headers.accept });
  const content = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  response.write(JSON.stringify(content));
  response.end();
};

const notFoundMeta = (request, response) => {
  response.writeHead(404, { 'Content-Type': request.headers.accept });
  response.end();
};

module.exports.getUsers = getUsers;
module.exports.getUsersMeta = getUsersMeta;
module.exports.updateUsers = updateUsers;
module.exports.notFound = notFound;
module.exports.notFoundMeta = notFoundMeta;
