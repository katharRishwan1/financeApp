const { income } = require('../controllers');
const { router } = require('../services/imports');
const middleware = require('../middlewares');

router.post('/income', middleware.checkRoles(['ad']), income.createIncome);
router.get('/income/:id?', middleware.checkRoles(['ad']), income.getIncome);
router.put('/income/:id', middleware.checkRoles(['ad']), income.updateIncome);
router.delete('/income/:id', middleware.checkRoles(['ad']), income.deleteIncoem)
module.exports = router;
