const { role } = require('../controllers');
const { router } = require('../services/imports');
const middleware = require('../middlewares')

router.post('/role', middleware.checkRoles(['ad']), role.createRole);
router.get('/role/:id?', middleware.checkRoles(['ad']), role.getRole);
router.get('/auth/role/:id?', role.getRole);
router.put('/role/:id',  middleware.checkRoles(['ad']), role.updateRole);
router.delete('/role/:id',  middleware.checkRoles(['ad']), role.deleteRole);
module.exports = router;
