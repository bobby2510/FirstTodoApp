const User = require('./models/login')
const LocalStrategy = require('passport-local').Strategy 
const bcrypt = require('bcryptjs')

let initialize = function(passport){
    let authenticateUser = async (email,password,done)=>{
        try{
            let user = await User.findOne({email:email})
            if(user)
            {
                if(await bcrypt.compare(password,user.password))
                    return done(null,user)
                else 
                    return done(null,false,{message:'Password is incorrect!'})
            }
            else 
            {
               return done(null,false,{message:'User Does not Exist!'})
            }
        }
        catch(err){
            return done(err,false)
        }
    }
    passport.use(new LocalStrategy({usernameField:'email'},authenticateUser))
    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })
    passport.deserializeUser(async(id,done)=>{
        try{
            let user = await User.findById(id)
            done(null,user)
        }catch(err){
            done(err,null)
        }
    })
}

module.exports = initialize