const router = require('express').Router();

const postRoutes = require('./postRoutes');
const userRouter = require('./userRouter');

// const savedPostRoutes = require('./savedPostRoutes')

router.use('/user', userRouter);
router.use('/tasks', taskRoutes);

// router.use('/savedPosts', savedPostRoutes);

module.exports = router;