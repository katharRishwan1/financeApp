const { rendPaid } = require('../controllers');
const { router } = require('../services/imports');
const middleware = require('../middlewares');

router.post('/rend/paid', middleware.checkRoles(['ad']), rendPaid.createRendPaid);
router.get('/rend/paid/:id?', middleware.checkRoles(['ad']), rendPaid.getRendPaid);
router.put('/rend/paid/:id', middleware.checkRoles(['ad']), rendPaid.updateRendPaid);
router.delete('/rend/paid/:id', middleware.checkRoles(['ad']), rendPaid.deleteRendPaid)
module.exports = router;
