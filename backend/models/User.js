const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    require: [true, 'first name is required'],
    trim: true,
    text: true,
  },
  last_name: {
    type: String,
    require: [true, 'last name is required'],
    trim: true,
    text: true,
  },
  username: {
    type: String,
    require: [true, 'username is required'],
    trim: true,
    text: true,
    unique: true,
  },
  email: {
    type: String,
    require: [true, 'email is required'],
    trim: true,
  },
  password: {
    type: String,
    require: [true, 'password is required'],
  },
  picture: {
    type: String,
    trim: true,
    default:
      'https://res.cloudinary.com/dmhcnhtng/image/upload.v1643044376/avatars/default_pic_jeaybr.png',
  },
  cover: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    require: [true, 'gender is required'],
    trim: true,
  },
  bYear: {
    type: Number,
    require: true,
    trim: true,
  },
  bMonth: {
    type: Number,
    require: true,
    trim: true,
  },
  bDay: {
    type: Number,
    require: true,
    trim: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  friends: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
  followers: {
    type: Array,
    default: [],
  },
  requests: {
    type: Array,
    default: [],
  },
  search: [
    {
      user: {
        type: ObjectId,
        ref: 'User',
      },
    },
  ],
  details: {
    bio: {
      type: String,
    },
    otherName: {
      type: String,
    },
    job: {
      type: String,
    },
    workplace: {
      type: String,
    },
    highSchool: {
      type: String,
    },
    college: {
      type: String,
    },
    currentCity: {
      type: String,
    },
    hometown: {
      type: String,
    },
    relationship: {
      type: String,
      enum: ['Single', 'In a relationship', 'Married', 'Divorced', 'Widower'],
    },
    instagram: {
      type: String,
    },
  },
  savePosts: [
    {
      post: {
        type: ObjectId,
        ref: 'Post',
      },
      saveAt: {
        type: Date,
        default: new Date(),
      },
    },
  ],
},{
    timestamps: true,
});

module.exports = mongoose.model('User' , userSchema);