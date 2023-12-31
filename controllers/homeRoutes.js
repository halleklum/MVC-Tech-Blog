const router = require('express').Router();
const { User, Posts } = require('../models');
const withAuth = require('../utils/auth');

router.get('/myposts', withAuth, async (req, res) => {
    try {
      const postsData = await Posts.findAll({
        where: {
          user_id: req.session.user_id,
        }
      });
      // Serialize data so the template can read it
       const posts = postsData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('myposts', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['username', 'ASC']],
      });
  
      const users = userData.map((post) => post.get({ plain: true }));
  
      res.render('homepage', {
        users,
        // Pass the logged in flag to the template
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;