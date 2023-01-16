const {
  validateEmail,
  validateLength,
  validateUsername,
} = require('../helpers/validation');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../helpers/tokens');
const { sendVerificationEmail } = require('../helpers/mailer');

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      username,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res
        .status(400)
        .json({ message: 'This email address already exists' });
    }

    if (!validateLength(first_name, 2, 20)) {
      return res
        .status(400)
        .json({ message: 'first name must between 2 and 20 characters!' });
    }

    if (!validateLength(last_name, 2, 20)) {
      return res
        .status(400)
        .json({ message: 'last name must between 2 and 20 characters!' });
    }

    if (!validateLength(password, 6, 40)) {
      return res
        .status(400)
        .json({ message: 'password must between 6 and 40 characters!' });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      email,
      username: newUsername,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    const emailVerificationToken = generateToken({ id: user._id.toString()}, '60m');
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name , url);
    const token = generateToken({ id: user._id.toString() } , '7d');
    res.status(201).send({
      id: user._id , 
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token, 
      verified: user.verified,
      message: 'Register Success! please activate your email to start',
      }
    );
   

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
