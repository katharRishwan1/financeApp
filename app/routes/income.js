const { income } = require('../controllers');
const { router } = require('../services/imports');

router.post('/income', income.createIncome);
router.get('/income/:id?', income.getIncome);
router.put('/income/:id', income.updateIncome);
router.delete('/income/:id', income.deleteIncoem)
module.exports = router;
