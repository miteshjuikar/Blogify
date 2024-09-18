const { Router } = require('express');
const { handleCreateNewBlog, handleSingleBlogDetails } = require('../controllers/blogController');

const router = Router();

const multer  = require('multer');
const path = require("path");
const Comment = require('../models/comment');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./public/uploads'));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}_${file.originalname}`;
      cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

router.get("/add-new",(req,res) => res.render("addBlog", { user: req.user}));

router.post("/", upload.single("coverImage"), handleCreateNewBlog);
router.get("/:id", handleSingleBlogDetails);

router.post("/comment/:blogId", async(req,res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id
  });
  return res.redirect(`/blog/${req.params.blogId}`);
})


module.exports = router;

