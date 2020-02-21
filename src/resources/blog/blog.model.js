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
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    }
  },
  { timestamps: true }
)

blogSchema.index({ user: 1, name: 1 }, { unique: true })

export const Blog = mongoose.model('blog', blogSchema)
