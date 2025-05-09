const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {ACCESS_TOKEN_SECRET} = process.env;

exports.verifyAccessToken = async(req,res, next) => {
    // const authHeader = req.header("Authorization");
    // if(!authHeader) return res.status(400).json({ status: false, msg: "Token not found"});

    // const token = authHeader.split(" ")[1];
    // if(!token) return res.status(400).json({status: false, msg: "Token not found"});
    
    const token = req.header("Authorization");
    if(!token) return res.status(400).json({stataus: false, msg:"Token Not found"});
    
    let user;
    try {
        user = jwt.verify(token, ACCESS_TOKEN_SECRET);
    }
    catch (err) {
        return res.status(401).json({status:false, msg:"Invalid Token"});
    }

    try{
        user = await User.findById(user.id);
        if (!user) {
            return res.status(401).json({ status:false, msg: "User Not found"});
        }

        req.user = user;
        next();
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({ status:false, msg:"Internal Server Error"})
    }
}