// Connection with server
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = "8080";

const userRoute = require("./routers/userRouter");
const { checkForAuthnticationCookie } = require("./middlewares/authMiddleware");
//Connection to mongoDB
const { connectToMongoDB } = require("./connection");

connectToMongoDB("mongodb://localhost:27017/blogify")
                .then(console.log("MongoDB connected successfully"))
                .catch((err)=>console.log(`Error: ${err}`)
                );

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthnticationCookie("token"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./viewFolder"));


app.get("/", (req, res) => {
    res.render("home", { user: req.user });
});

app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server is stated at PORT: ${PORT}`));
