const sendtoken = (user, statusCode, res) => {
    const token = user.generateToken()
    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.Cookie_Expire * 60 * 60 * 24 * 1000),
        secure: true, // set to true if your using https or samesite is none
        httpOnly: true, // backend only
        sameSite: 'none' // set to none for cross-request
    }
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    })

}

module.exports = sendtoken