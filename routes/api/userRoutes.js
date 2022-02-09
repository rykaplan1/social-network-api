const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  postUser,
  updateUser,
  deleteUser,
  postFriend,
  deleteFriend
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(postUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends').post(postFriend).delete(deleteFriend);

module.exports = router;

