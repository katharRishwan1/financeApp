const { incomeType } = require('../controllers');
const { router } = require('../services/imports');

router.post('/incomeType', incomeType.createIncomeType);
router.get('/incomeType/:id?', incomeType.getIncomeType);
router.put('/incomeType/:id', incomeType.updateIncomeType);
router.delete('/incomeType/:id', incomeType.deleteIncoemType)
module.exports = router;

