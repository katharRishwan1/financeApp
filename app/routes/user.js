const user = require('../controllers/user');
const { router } = require('../services/imports');

router.get('/user/:id?', user.getUsers);
router.get('/auth/user/:id?', user.getUsers);
router.put('/user/:id', user.updateUser);
router.delete('/user/:id', user.deleteUser);
router.get('/profile', user.myProfile)
// router.post('/user', user.createUser)
module.exports = router;
