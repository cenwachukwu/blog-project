"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crud = require("../../utils/crud");

var _blog = require("./blog.model");

// controllers are just middleware but woth the intent of returning data
// so they handle what a route + verb combo can access from the db
// res.status allows us to set the status code of the response we want to send back. it lets us do things like send back a message if there was an error eg.
// res.status(404).send({message : "not found"})
// controllers implements the logic that interacts with our database models
// instead of writing a controller for everysingle crud function, we can have generalized controlers
_blog.Blog.create({});

var _default = (0, _crud.crudControllers)(_blog.Blog);

exports.default = _default;