const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { User, Posts } = require('../../models');

// create a post
router.post('/',  withAuth, async (req,res) => {
  console.log("save post", req.body)
    try {
        const postData = await Posts.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id,
            date_created: req.body.date_created
        });
        res.status(200).json(postData)
    } catch (err) {
        res.status(400).json(err);
    }
});

// update a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const editePost = await Posts.update(
      {
        title: req.body.title,
        description: req.body.description,
        user_id: req.session.user_id,
        date_created: req.body.date_created
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(editePost);
  } catch (err) {
    res.status(500).json(err);
  }
}) ;

// delete a post
router.delete('/:id', withAuth, async (req,res) => {
  try {
    const postData = await Posts.destroy(
      {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to get a specific post by id
router.get("/:id", (req, res) => {
    Posts.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "description", "date_created"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    })
      // then respond dbPostData to json. if not send error message
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({
            message: "No post found with this id",
          });
          return;
        }
        res.json(dbPostData);
      })
      //catch error in console log
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;