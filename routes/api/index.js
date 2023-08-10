const router = require('express').Router();
const UserRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', UserRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
