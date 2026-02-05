const userModel = require('../models/user');

// Login Page
exports.getLogin = (req, res) => {
  const currentUser = req.session.user || null;
  const error = req.query.error || null; // Ensure currentUser is defined
  res.render('login', { currentUser, body: 'login', error });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.getUserByEmail(email);

  if (user && user.password === password) {
    req.session.userId = user.id;
    res.redirect('/jobs');
  } else {
    const currentUser = req.session.user || null;
    res.render('login', { error: 'Invalid email or password', currentUser });
  }
};

// Registration Page
exports.getRegistration = (req, res) => {
  const currentUser = req.session.user || null;
  const error = req.query.error || null;
  res.render('registration', { currentUser, error });
};

exports.postRegistration = async (req, res) => {
  const currentUser = req.session.user || null;
  try {
    const { name, email, password } = req.body;
    const newUser = await userModel.createUser(name, email, password);

    if (newUser) {
      req.session.userId = newUser.id;
      res.redirect('/jobs');
    } else {
      res.render('registration', { error: 'Registration failed', currentUser });
    }
  } catch (error) {
    console.error(error);
    res.render('registration', { error: 'An unexpected error occurred during registration', currentUser });
  }
};
