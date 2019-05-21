const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  canView: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ToDo'
  }],
  canEdit: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ToDo'
  }]
});

userSchema.methods.generateAuthToken = function () {
  try {
    const token = jwt.sign({ _id: this._id, name: this.name, email: this.email }, config.get('jwtPrivateKey'));
    return token;
  }
  catch (ex) {
    console.log(`token not generated+${ex}`);
  }
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  }

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;