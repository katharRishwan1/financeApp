const { storeMaster } = require('../controllers');
const { router } = require('../services/imports');
const middleware = require('../middlewares');

router.post('/store/master', middleware.checkRoles(['ad']), storeMaster.createStoreMaster);
router.get('/store/master/:id?', middleware.checkRoles(['ad']), storeMaster.getStoreMaster);
router.put('/store/master/:id', middleware.checkRoles(['ad']), storeMaster.updateStoreMaster);
router.delete('/store/master/:id', middleware.checkRoles(['ad']), storeMaster.deleteStoreMaster)
module.exports = router;
