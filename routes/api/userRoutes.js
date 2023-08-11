const router = require('express').Router();
const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends
router.route('/api/users/:userId/friends').post(addFriend)

// /api/users/:userId/friends/:friendId
router.route('/api/users/:userId/friends/:friendId').delete(removeFriend)

module.exports = router;