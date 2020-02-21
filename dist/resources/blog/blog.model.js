"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Blog = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const blogSchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  summary: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: URL,
    required: true,
    trim: true
  },
  blogBody: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: Array,
    required: true
  },
  createdBy: {
    type: _mongoose.default.SchemaTypes.ObjectId,
    ref: 'user',
    required: true
  }
}, {
  timestamps: true
});
blogSchema.index({
  user: 1,
  name: 1
}, {
  unique: true
});

const Blog = _mongoose.default.model('blog', blogSchema);

exports.Blog = Blog;