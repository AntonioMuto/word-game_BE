const { v4: uuidv4 } = require('uuid');
const httpContext = require('express-http-context');

const assignId = (req, res, next) => {
  const id = uuidv4();
  httpContext.set('reqId', id);
  next();
};

module.exports = assignId;
