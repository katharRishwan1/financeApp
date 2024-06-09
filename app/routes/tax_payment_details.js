const { taxPaymentDetails } = require('../controllers');
const { router } = require('../services/imports');
const middleware = require('../middlewares');

router.post('/payment/details/tax', middleware.checkRoles(['ad']), taxPaymentDetails.createTaxPayment);
router.get('/payment/details/tax/:id?', middleware.checkRoles(['ad']), taxPaymentDetails.getTaxPayment);
router.put('/payment/details/:id', middleware.checkRoles(['ad']), taxPaymentDetails.updateTaxPayment);
router.delete('/payment/details/:id', middleware.checkRoles(['ad']), taxPaymentDetails.deleteTaxPayment)
module.exports = router;
