
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "User dosen't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(404).json({ message: "InValid Credentials" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET, { expiresIn: '48h'});

        res.status(200).json({ result: existingUser, token})

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const signup = async (req, res) => {
    try {
        const { firstname, lastname, email, password, confirmpassword } = req.body;
        console.log(req.body, confirmpassword, "req.BODY")

        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(404).json({ message: "User already exist" });

        if(password !== confirmpassword) return res.status(404).json({ message: "Passwords don't match" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({ email, password: hashedPassword, name:`${firstname} ${lastname}`})

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET, { expiresIn: '48h' });

        res.status(200).json({ result, token })


    } catch (error) {
        res.status(400).json({ message: error.message })

    }
}

module.exports = {
    signin,
    signup
}



