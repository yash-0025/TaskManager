const User = require("../models/User");
const bcrypt = require("bcrypt");
const {createAccessToken} = require("../utils/token")
const {validateEmail} = require("../utils/validation")

exports.signup = async (req, res) => {
    try {
        const {name, email, password } = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({msg: "Please fill all the details correctly"});
        }
        if(typeof name != "string" || typeof email != "string" || typeof password != "string") {
            return res.status(400).json({msg: "Please input your details properly"});
        }

        if(password.length < 8) {
            return res.status(400).json({msg: "Password length must be more than 8 characters"});
        }

        if(!validateEmail(email)){
            return res.status(400).json({msg: "Invalid Email"});
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({msg: "This email is already registered"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({name, email, password: hashedPassword});
        res.status(200).json({msg: "User Created Succesfully"});
    } catch(err) {
        console.error(err);
        res.status(500).json({msg: "Invalid Email"});
    }
}

exports.login = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({status: false, msg:"Please enter all details!!"});
        }
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({status: false, msg: "Email is not registered."});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({status:false, msg: "Password Incorrect"});
        
        const token = createAccessToken({
            id: user._id
        });
        delete user.password;
        res.status(200).json({token, user, status: true, msg: "Login Sucessful.."});
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({status:false, msg: "Internal Server Error"});
    }
}