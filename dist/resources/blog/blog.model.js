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
    type: String,
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
  dateCreated: {
    type: Date,
    required: true
  },
  // this is how you set up relationships in mongo using mongoose
  createdBy: {
    type: _mongoose.default.SchemaTypes.ObjectId,
    // so that mongo knows what model to look for this id
    ref: 'user',
    required: true
  }
}, {
  timestamps: true
}); // we can have our title's be unique by doing it this way

blogSchema.index({
  user: 1,
  title: 1
}, {
  unique: true
});

const Blog = _mongoose.default.model('blog', blogSchema);

exports.Blog = Blog;