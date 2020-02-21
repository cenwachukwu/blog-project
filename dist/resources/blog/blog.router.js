"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

const controller = (req, res) => {
  res.send({
    message: 'Hello Blog'
  });
};

const router = (0, _express.Router)(); // /api/list

router.route('/').get(controller).post(controller); // /api/list/:id

router.route('/:id').get(controller).put(controller).delete(controller);
var _default = router;
exports.default = _default;