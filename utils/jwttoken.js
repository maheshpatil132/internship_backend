const sendtoken = (user, statusCode,res) => {
    const token =  user.generateToken()
    const options = {
        httpOnly: true,
        expires: new Date( Date.now() + process.env.Cookie_Expire * 60 * 60 * 24 * 1000),
    }
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        user,
        token
    })
}

module.exports = sendtoken