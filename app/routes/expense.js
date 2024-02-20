const { expense } = require('../controllers');
const { router } = require('../services/imports');

router.post('/expense', expense.createExpense);
router.get('/expense/:id?', expense.getExpense);
router.put('/expense/:id', expense.updateExpense);
router.delete('/expense/:id', expense.deleteExpense)
module.exports = router;
