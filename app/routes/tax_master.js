const { taxMaster } = require('../controllers');
const { router } = require('../services/imports');
const middleware = require('../middlewares');

router.post('/tax/master', middleware.checkRoles(['ad']), taxMaster.createTaxMaster);
router.get('/tax/master/:id?', middleware.checkRoles(['ad']), taxMaster.getTaxMaster);
router.put('/tax/master/:id', middleware.checkRoles(['ad']), taxMaster.updateTaxMaster);
router.delete('/tax/master/:id', middleware.checkRoles(['ad']), taxMaster.deleteTaxMaster)
module.exports = router;
