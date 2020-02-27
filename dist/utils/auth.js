"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = exports.signin = exports.signup = exports.verifyToken = exports.newToken = void 0;

var _config = _interopRequireDefault(require("../config"));

var _user = require("../resources/user/user.model");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// authetication is controlling if an incoming request can proceed or not
// authorization is controlling if an authenticated request has the correct permissions to access a resource
// jwt authentications are basically tokens passed to check auth on the server. so it's a bearer token strategy that allows the api to be statless with user auth
// newToken function takes in User from the user.model and creates a new json web token based on the user.id
// signed with the correct secerts and xpiration time
// user goes in, token come out
const newToken = user => {
  return _jsonwebtoken.default.sign({
    id: user.id
  }, _config.default.secrets.jwt, {
    expiresIn: _config.default.secrets.jwtExp
  });
}; // verifyToken function does the opposite of newToken. So given a token, it will verify that the token was created with the same secret from the same server
// an it will return a payload and in this case it would be a user
// token goes in user comes out


exports.newToken = newToken;

const verifyToken = token => new Promise((resolve, reject) => {
  _jsonwebtoken.default.verify(token, _config.default.secrets.jwt, (err, payload) => {
    if (err) return reject(err);
    resolve(payload);
  });
});

exports.verifyToken = verifyToken;

const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      message: 'need email and password'
    });
  }

  try {
    const user = await _user.User.create(req.body);
    const token = newToken(user);
    return res.status(201).send({
      token
    });
  } catch (e) {
    return res.status(500).end();
  }
};

exports.signup = signup;

const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      message: 'need email and password'
    });
  }

  const invalid = {
    message: 'Invalid email and passoword combination'
  };

  try {
    const user = await _user.User.findOne({
      email: req.body.email
    }).select('email password').exec();

    if (!user) {
      return res.status(401).send(invalid);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).send(invalid);
    }

    const token = newToken(user);
    return res.status(201).send({
      token
    });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

exports.signin = signin;

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end();
  }

  const token = bearer.split('Bearer ')[1].trim();
  let payload;

  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  const user = await _user.User.findById(payload.id).select('-password').lean().exec();

  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};

exports.protect = protect;