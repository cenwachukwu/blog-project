import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
  {
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
      type: mongoose.SchemaTypes.ObjectId,
      // so that mongo knows what model to look for this id
      ref: 'user',
      required: true
    }
  },
  { timestamps: true }
)

// we can have our title's be unique by doing it this way
blogSchema.index({ user: 1, title: 1 }, { unique: true })

export const Blog = mongoose.model('blog', blogSchema)
