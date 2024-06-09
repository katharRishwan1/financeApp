const { eb_bill } = require('../controllers');
const { router } = require('../services/imports');
const middleware = require('../middlewares');

router.post('/eb/bill', middleware.checkRoles(['ad']), eb_bill.createEbBill);
router.get('/eb/bill/:id?', middleware.checkRoles(['ad']), eb_bill.getEbBill);
router.put('/eb/bill/:id', middleware.checkRoles(['ad']), eb_bill.updateEbBill);
router.delete('/eb/bill/:id', middleware.checkRoles(['ad']), eb_bill.deleteEbBill)
module.exports = router;
