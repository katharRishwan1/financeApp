const { jummaVasul } = require('../controllers');
const { router } = require('../services/imports');
const middleware = require('../middlewares');

router.post('/jumma/vasul', middleware.checkRoles(['ad']), jummaVasul.createJummaVasul);
router.get('/jumma/vasul/:id?', middleware.checkRoles(['ad']), jummaVasul.getJummaVasul);
router.put('/jumma/vasul/:id', middleware.checkRoles(['ad']), jummaVasul.updateJummaVasul);
router.delete('/jumma/vasul/:id', middleware.checkRoles(['ad']), jummaVasul.deleteJummaVasul)
module.exports = router;
