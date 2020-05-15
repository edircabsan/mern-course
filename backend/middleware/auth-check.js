const jwt = require('jsonwebtoken');
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if(req.method === 'OPTIONS'){
    return next(); //Allow requests with OPTIONS method to be executed without any auth verification.
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; //Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, 'supersecret_dont_share');
    req.userData = {userId: decodedToken.userId}
    next();
  } catch (err) {
    const error = new HttpError("Authentication Failed!", 403);
    return next(error);
  }
};
