const { validateEmail, validateLength, validateUsername } = require('../helpers/validation');
const User = require('../models/User');
const bcrypt = require('bcrypt');

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
  
    const cryptedPassword =await bcrypt.hash(password , 12);

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
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
