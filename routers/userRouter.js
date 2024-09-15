const { Router } = require('express');

const router = Router();
const { handleCreateUser, handleLoginUser } = require("../controllers/userController");

router.route("/signup")
.get((req, res) => res.render("signup"))
.post(handleCreateUser);

router.route("/signin")
.get((req, res) => res.render("signin"))
.post(handleLoginUser);

router.get("/signout", (req,res) => {
    return res.clearCookie('token').redirect("/");
});

module.exports = router;
