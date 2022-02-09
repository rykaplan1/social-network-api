const { User, Thought } = require('../models');

module.exports = {
  //GET all thoughts
  getThoughts(req, res) {
    Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
  },
  //GET single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId})
    .select('-__v')
    .then((thought) => !thought ? res.status(404).json({ message: 'No thought with that ID'}) : res.json(thought))
    .catch((err) => res.status(500).json(err));
  },
  //POST new thought
  postThought(req, res) {
    Thought.create(req.body)
    .then((thought) => res.json(thought))
    .catch((err) => {
      console.log(err)
      return res.status(500).json(err);
    });
  },
  //PUT thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$set: req.body},
      { runValidators: true, new: true }
    )
    .then((thought) => !thought ? res.status(404).json({ message: 'No thought with that ID'}) : res.json(thought))
    .catch((err) => res.status(500).json(err));
  },
  //DELETE thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId})
    .then((thought) => !thought ? res.status(404).json({ message: 'No thought with that ID'}) : User.findOneAndUpdate(
      {username: thought.username},
      {$pull: {thoughts: req.params.thoughtId}},
      { runValidators: true, new: true }
    ))
    .catch((err) => res.status(500).json(err));
  },
  //POST reaction
  postReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
    .then((thought) => !thought ? res.status(404).json({ message: 'No thought with that ID'}) : res.json(thought))
    .catch((err) => res.status(500).json(err));
  },
  //DELETE reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId},
      { $pull: { reactions: { reactionId: req.params.reactionId}}},
      { runValidators: true, new: true }
    )
    .then((thought) => !thought ? res.status(404).json({ message: 'No thought with that ID'}) : res.json(thought))
    .catch((err) => res.status(500).json(err));
  }
}