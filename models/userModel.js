const { Schema, model } = require("mongoose");
const { error } = require("node:console");
const { createHmac, randomBytes } = require('node:crypto');
const { createTokenForUser, validateToken } = require("../services/auth");

const userSchema = new Schema({
    fullName:   {
                    type: String,
                    required: true
                },
    email:      {
                    type: String,
                    required: true,
                    unique: true
                },
    salt:       {
                    type: String,
                    // required: true
                },
    password:   {
                    type: String,
                    required: true
                },
    profileImage: {
                    type: String,
                    default: "../public/images/defaultUserImage"
                },
    role:       {
                    type: String,
                    enum: ["User", "Admin"],
                    dafault: "User"
                }
}, {timestamp: true}
);

userSchema.pre("save", function(next){
    const user = this;    
    if(!user.isModified("password"))
        return null;
    const salt = randomBytes(16).toString();
    const hashPassword = createHmac('sha256', salt)
                   .update(user.password)
                   .digest('hex');

        this.salt = salt;
        this.password = hashPassword;
    next();
});

userSchema.static('matchPasswordAndGenerateToken', async function(email,password){
    const user = await this.findOne({ email });
    if(!user)
        throw new Error('User not found'); 

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

    if(hashedPassword !== userProvidedHash)
        throw new Error('Incorrect password'); 
    
    const token = createTokenForUser(user);
    return token;
})

const User = model("user", userSchema);

module.exports = User;
