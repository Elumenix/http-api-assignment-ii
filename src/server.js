const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/getUsers': jsonHandler.getUsers,
    notFound: htmlHandler.getIndex
  },
  HEAD: {
    '/getUsers': jsonHandler.getUsersMeta,
    notFound: htmlHandler.getIndex,
  },
  POST: {
    '/userPath': jsonHandler.updateUsers,
  }
};

const onRequest = (request, response) => {
  const { pathname } = url.parse(request.url);
  console.log(request.method);
  console.log(pathname);

  if (!urlStruct[request.method]) {
    return urlStruct.HEAD.notFound(request, response);
  }

  if (urlStruct[request.method][pathname]) {
    if (request.method === 'POST') {
      return handlePost(request, response, pathname);
    }
    else {
      return urlStruct[request.method][pathname](request, response);
    }
  }

  return urlStruct[request.method].notFound(request, response);
};

const handlePost = async (request, response, pathname) => {
  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    return urlStruct[request.method][pathname](request, response, bodyParams);
  });
}

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
