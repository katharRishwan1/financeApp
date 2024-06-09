const { jummaVasul } = require('../controllers');
const { router } = require('../services/imports');
const middleware = require('../middlewares');

router.post('/jumma/vaul', middleware.checkRoles(['ad']), jummaVasul.createJummaVasul);
router.get('/jumma/vaul/:id?', middleware.checkRoles(['ad']), jummaVasul.getJummaVasul);
router.put('/jumma/vaul/:id', middleware.checkRoles(['ad']), jummaVasul.updateJummaVasul);
router.delete('/jumma/vaul/:id', middleware.checkRoles(['ad']), jummaVasul.deleteJummaVasul)
module.exports = router;
