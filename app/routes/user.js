const user = require('../controllers/user');
const { router } = require('../services/imports');
const middleware = require('../middlewares');

router.get('/user/:id?', middleware.checkRoles(['ad']), user.getUsers);
router.get('/auth/user/:id?', user.getUsers);
router.put('/user/:id', middleware.checkRoles(['ad']), user.updateUser);
router.delete('/user/:id', middleware.checkRoles(['ad']), user.deleteUser);
router.get('/profile', middleware.checkRoles(['ad', 'us']), user.myProfile)
// router.post('/user', middleware.checkRoles(['ad']), user.createUser)
router.post('/approved/user/:id', middleware.checkRoles(['ad']), user.userApprove);

module.exports = router;
