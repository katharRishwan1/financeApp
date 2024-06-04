const { expense } = require('../controllers');
const { router } = require('../services/imports');
const middleware = require('../middlewares');

router.post('/expense', middleware.checkRoles(['ad']), expense.createExpense);
router.get('/expense/:id?', middleware.checkRoles(['ad']), expense.getExpense);
router.put('/expense/:id', middleware.checkRoles(['ad']), expense.updateExpense);
router.delete('/expense/:id', middleware.checkRoles(['ad']), expense.deleteExpense)
module.exports = router;
