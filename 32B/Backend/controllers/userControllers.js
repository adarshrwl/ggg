const userModel = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendOtp = require('../service/sendOtp')


// 1. Creating user function
const createUser = async (req, res) => {
    // 1. Get data from the user (Fname, lname, email, pp)
    console.log(req.body)

    // #. Destructuring
    const { firstName, lastName, email, password, phone } = req.body;

    // 2. Validation
    if (!firstName || !lastName || !email || !password || !phone) {
        return res.json({
            "success": false,
            "message": "Please enter all fields!"
        })
    }

    // Try - Catch (Error Handling)
    try {
        // check if the user is already exist
        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            return res.json({
                "success": false,
                "message": "User Already Exists!"
            })
        }

        // Hash/encrypt the password
        const randomSalt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, randomSalt)


        // Save the user in database
        const newUser = new userModel({
            // Fields : Values received form user
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword,
            phone: phone

        })

        //  Actually save the user in database
        await newUser.save()

        // send the success response
        res.json({
            "success": true,
            "message": "User Created Successfully!"
        })


    } catch (error) {
        console.log(error)
        res.json({
            "success": false,
            "message": "Internal Server Error!"
        })

    }
}


// 2. Login user function
const loginUser = async (req, res) => {
    // check incomming data : pass
    console.log(req.body)

    // destructuring
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
        return res.json({
            "success": false,
            "message": "Please enter all fields!"
        })
    }

    try {
        // 1. Find user, if not : stop the process
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.json({
                "success": false,
                "message": "User Not Found!"
            })
        }

        // 2. Compare the password, if not : stop the process
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.json({
                "success": false,
                "message": "Incorrect Password!"
            })
        }

        // 3. Generate JWT token
        // 3.1 Secret Decryption Key (.env)
        const token = await jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET
        )

        // 4. Send the token, userData, Message to the user
        res.json({
            "success": true,
            "message": "Login Successful!",
            "token": token,
            "userData": user
        })

    } catch (error) {
        console.log(error)
        res.json({
            "success": false,
            "message": "Internal Server Error!"
        })
    }


}

// forgot password using PHONE number
const forgotPassword = async (req, res) => {
    const {phone} = req.body;

    if(!phone){
        res.status(400).json({
            'success' : false,
            'message' : 'Please provide phone number!'
        })
    }

    try {

        // user find and validate
        const user = await userModel.findOne({phone : phone})
        if(!user){
            return res.status(400).json({
                'success' : false,
                'message' : 'User Not Found!'
            })
        }

        // generate random otp
        const otp = Math.floor(100000 + Math.random() * 900000) // 6 digit otp

        // update in database for verification
        user.otpReset = otp;
        user.otpResetExpires = Date.now() + 3600000;
        await user.save()

        // sending otp to phone number
        // const isSent = await sendOtp(phone, otp)
        // if(!isSent){
        //     return res.status(400).json({
        //         'success' : false,
        //         'message' : 'Error Sending OTP'
        //     })
        // }

        // Success Message
        res.status(200).json({
            'success' : true,
            'message' : 'OTP Send Successfully!'
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            'success' : false,
            'message' : 'Server Error!'
        })
        
    }

}


// verify otp and set new password
const verifyOtpAndSetPassword = async (req, res) => {

}


// exporting
module.exports = {
    createUser,
    loginUser,
    forgotPassword,
    verifyOtpAndSetPassword

}