const { incomeType } = require('../controllers');
const { router } = require('../services/imports');
const middleware = require('../middlewares');

router.post('/incomeType', middleware.checkRoles(['ad']), incomeType.createIncomeType);
router.get('/incomeType/:id?',middleware.checkRoles(['ad']), incomeType.getIncomeType);
router.put('/incomeType/:id', middleware.checkRoles(['ad']), incomeType.updateIncomeType);
router.delete('/incomeType/:id', middleware.checkRoles(['ad']), incomeType.deleteIncoemType)
module.exports = router;

