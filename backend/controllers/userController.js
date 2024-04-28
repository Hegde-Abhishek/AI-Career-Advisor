const User = require('../models/User');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;

  // Validate updateData here if necessary
  try {
      const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $set: updateData },
          { new: true, runValidators: true }
      );
      if (!updatedUser) {
          return res.status(404).send({ message: 'User not found' });
      }
      res.json({ message: 'Profile updated successfully', updatedUser });
  } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).send({ message: 'Error updating user profile', error: error.message });
  }
};

exports.getUserProfileById = async (userId) => {
    try {
      const user = await User.findById(userId);
      console.log(';;;;;;;', user);
      return user; // This returns the full user document. Adjust according to your needs.
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };
  

