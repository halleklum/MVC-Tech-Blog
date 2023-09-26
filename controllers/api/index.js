const router = require('express').Router();

const postRoutes = require('./postRoutes');
const userRouter = require('./userRouter');

router.use('/user', userRouter);
router.use('/posts', postRoutes);

module.exports = router;