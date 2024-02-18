const auth = require('../controllers/auth');
const { router } = require('../services/imports');

router.post('/signup', auth.signup);
router.post('/signin', auth.signin);
router.post('/otp/send', auth.sendOtp);
router.post('/otp/verify', auth.verifyOtp);
router.post('/change/password', auth.changePassword);

router.post('/forgot/password', auth.forgotPassword)
router.post('/reset/password', auth.resetPassword)
router.post('/reset/verify', auth.resetVerify)

router.get('/pro', (req, res) => {
    return res.success({ msg: 'data fetched successfully' })
})
module.exports = router;
