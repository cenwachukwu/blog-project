"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crud = require("../../utils/crud");

var _blog = require("./blog.model");

var _default = (0, _crud.crudControllers)(_blog.Blog);

exports.default = _default;