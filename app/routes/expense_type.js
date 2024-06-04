const { expenseType } = require('../controllers');
const { router } = require('../services/imports');
const middleware = require('../middlewares')

router.post('/expenseType', middleware.checkRoles(['ad']), expenseType.createExpenseType);
router.get('/expenseType/:id?', middleware.checkRoles(['ad']), expenseType.getExpenseType);
router.put('/expenseType/:id', middleware.checkRoles(['ad']), expenseType.updateExpenseType);
router.delete('/expenseType/:id', middleware.checkRoles(['ad']), expenseType.deleteExpenseType)
module.exports = router;
