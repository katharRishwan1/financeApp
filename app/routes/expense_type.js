const { expenseType } = require('../controllers');
const { router } = require('../services/imports');

router.post('/expenseType', expenseType.createExpenseType);
router.get('/expenseType/:id?', expenseType.getExpenseType);
router.put('/expenseType/:id', expenseType.updateExpenseType);
router.delete('/expenseType/:id', expenseType.deleteExpenseType)
module.exports = router;
