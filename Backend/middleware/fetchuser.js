var jwt = require('jsonwebtoken');
const JWT_SECRET = "BrijalKansara"


fetchuser = (req,res,next) => {
    // Get the user from the JWT token

    // For test we are sending particular token from header to here 
    // You can check thunderclient request secton for this  , we got the token from the json of after login vala sec
    const token = req.header('auth-token');
    console.log(token);
    if (!token){
        res.status(401).send({error: "You need to Login To view this page"})
    }
    try {
        // Compairing Current Token with the Generated one 
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;

        // Next will run the next function 
        next()
    }
     catch (error) {
        res.status(401).send({error: "Please Login with Correct credentials"});
    }
}

module.exports = fetchuser;