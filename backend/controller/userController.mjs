import { UserModel } from '../model/UserModel.mjs';

// Get all users (id and username)
export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, '_id username').lean();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error in getUsers:', error);
    res.status(500).json({ message: 'Server error fetching users', error: error.message });
  }
};
