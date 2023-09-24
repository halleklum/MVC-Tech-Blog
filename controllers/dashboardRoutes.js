const router = require("express").Router();
const { User, Posts } = require("../models");
const withAuth = require("../utils/auth");

// find all the posts specific to the user if logged in
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);
    const postData = await Posts.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "description", "date_created"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    //// then promising database post data and getting all the readable information from user not including extra unwanted data from sequilize

    const posts = postData.map((post) =>
      post.get({
        plain: true,
      })
    );
    // rending this information to the dashboard and requiring user to be logged in session to see data.
    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
      userData,
    });
  } catch (err) {
    console.log(err);
    res.redirect("login");
  }
});
// if an error, gives 500 status.

// allowing user to add a new post if logged in
router.get("/posts", (req, res) => {
  res.render("add-post", {
    logged_in: req.session.logged_in,
  });
});

router.get("/calendar", (req, res) => {
  res.render("calendar", {
    logged_in: req.session.logged_in,
  });
});

module.exports = router;