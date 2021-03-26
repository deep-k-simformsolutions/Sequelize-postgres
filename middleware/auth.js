const User= require('../model/user')
const auth = async (req,res,next)=>{
    try {
        const user = await User.findByPk(1)
        req.user = user
        next()
    } catch (error) {
        res.send(error)
    }
}

module.exports = auth 