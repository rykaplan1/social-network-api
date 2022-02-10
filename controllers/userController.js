const { User, Thought } = require('../models');
const { Types } = require('mongoose');

module.exports = {
  //GET all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //GET single user
  getSingleUser(req, res) {
    User.findOne({ _id: Types.ObjectId(req.params.userId) })
      .select('-__v')
      .then(async (user) => {
      const thoughts = await Thought.find({ username: user.username })
      const friends = await User.find({ _id: { $in: user.friends}})
      return !user ? res.status(404).json({ message: 'No user with that ID'}) : res.json({
        user, 
        thoughts: thoughts,
        friends: friends
      })
    })
      .catch((err) => res.status(500).json(err));
  },
  //POST new user
  postUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err)
        return res.status(500).json(err);
      });
  },
  //PUT user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: Types.ObjectId(req.params.userId) },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((user) => !user ? res.status(404).json({ message: 'No user with that ID'}) : res.json(user))
    .catch((err) => res.status(500).json(err));
  },
  //DELETE user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: Types.ObjectId(req.params.userId) })
      .then((user) => !user ? res.status(404).json({ message: 'No user with that ID'}) : Thought.deleteMany({ _id: {$in: user.thoughts}}))
      .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  //POST friend to user
  postFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: Types.ObjectId(req.params.userId) },
      { $addToSet: { friends: Types.ObjectId(req.params.friendId) }},
      { runValidators: true, new: true }
    )
    .then((user) => !user ? res.status(404).json({ message: 'No user with that ID'}) : res.json(user))
    .catch((err) => res.status(500).json(err));
  },
  //DELETE friend from user
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: Types.ObjectId(req.params.userId )},
      { $pull: { friends: Types.ObjectId(req.params.friendId)} },
      { runValidators: true, new: true }
    )
    .then((user) => !user ? res.status(404).json({ message: 'No user with that ID'}) : res.json(user))
    .catch((err) => res.status(500).json(err));
  }
}