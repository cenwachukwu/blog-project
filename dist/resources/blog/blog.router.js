"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _blog = _interopRequireDefault(require("./blog.controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // /api/blog

router.route('/').get(_blog.default.getMany).post(_blog.default.createOne); // /api/blog/:id

router.route('/:id').get(_blog.default.getOne).put(_blog.default.updateOne).delete(_blog.default.removeOne);
var _default = router;
exports.default = _default;