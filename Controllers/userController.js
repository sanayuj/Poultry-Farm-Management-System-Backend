module.exports.signup=async(req,res,next)=>{
    const { username, email, password, phonenumber, confirmPassword } = req.body;
    try{
        console.log("Server called>>>>>>>>>")
    }catch(error){
        console.error(error)
    }
}