const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false, // hides password in any output
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a password'],
    validate: {
      // custom validator, only works on CREATE or SAVE
      validator: function (el) {
        return el === this.password;
      },
    },
    message: 'Passwords are not the same',
  },
});

// middleware password encryption function
userSchema.pre('save', async function (next) {
  // if password is modified run the function
  if (!this.isModified('password')) return next();

  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete password confirm field as only needed to check passwords match
  this.passwordConfirm = undefined;
  next();
});

// Compare a database user password (userPassword) with a login User password passed in the body (candidatePassword)
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
