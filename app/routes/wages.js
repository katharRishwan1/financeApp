const { wages } = require('../controllers');
const { router } = require('../services/imports');
const middleware = require('../middlewares');

router.post('/wages', middleware.checkRoles(['ad']), wages.createWages);
router.get('/wages/:id?', middleware.checkRoles(['ad']), wages.getWages);
router.put('/wages/:id', middleware.checkRoles(['ad']), wages.updateWages);
router.delete('/wages/:id', middleware.checkRoles(['ad']), wages.deleteWages)
module.exports = router;
