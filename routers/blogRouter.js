const { Router } = require('express');
const { handleCreateNewBlog } = require('../controllers/blogController');

const router = Router();

const multer  = require('multer');
const path = require("path");

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
router.route("/add-new")
.get((req,res) => res.status(201).render("addBlog", { user: req.user}))
.post(upload.single("coverImage"), handleCreateNewBlog);

module.exports = router;

