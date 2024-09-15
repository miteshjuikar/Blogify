const { validateToken } = require("../services/auth");

function checkForAuthnticationCookie(cookieName){
    return (req,res,next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue)
            return next();
    
        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (err) {
            console.log("middleware error: ", err);
        }
        
        return next();
    }
    
}

module.exports = { checkForAuthnticationCookie };
