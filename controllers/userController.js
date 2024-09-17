const User = require("../models/userModel");

async function handleCreateUser(req,res){
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect("/");
}

async function handleLoginUser(req,res){
    try {
        const { email, password } = req.body;
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie('token',token).redirect("/");
    } catch (error) {
        return res.render("signin", {
            error: "Incorrect Password"
        });
    }
};


module.exports = { handleCreateUser, handleLoginUser };