


//checking whether user is authenticated if yes proceed if not we have to send him to login page 
let onlyAuthenticatedUsers = (req,res,next)=>{
    if(req.user)
    {
        next()
    }
    else 
    {
        res.redirect('/login')
    }
}
// only unAuthenicated users 
let onlyUnAuthenticatedUsers = (req,res,next)=>{
    if(req.user)
    {
        res.redirect('/')
    }
    else 
    {
        next()
    }
}

module.exports.onlyAuthenticatedUsers = onlyAuthenticatedUsers
module.exports.onlyUnAuthenticatedUsers = onlyUnAuthenticatedUsers