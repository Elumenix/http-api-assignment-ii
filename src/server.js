const http = require('http');
const url = require('url');
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
};

const onRequest = (request, response) => {
  const { pathname } = url.parse(request.url);
  console.log(request.method);
  console.log(pathname);

  if (!urlStruct[request.method]) {
    return urlStruct.HEAD.notFound(request, response);
  }

  if (urlStruct[request.method][pathname]) {
    return urlStruct[request.method][pathname](request, response);
  }

  return urlStruct[request.method].notFound(request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
