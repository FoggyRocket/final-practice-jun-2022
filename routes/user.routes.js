const router = require("express").Router();
const User = require("../models/User.model")
/* GET va por el formulario para editar al usuario */
router.get("/edit-myUser", (req, res, next) => {
    //sacar al current user del request que fue almacenado gracias a express-session
    const {user} = req.session
  res.render("user/edit-user",user);
});
router.post("/edit-myUser",(req,res,next)=>{
    const {role,...restUser } = req.body;
    const {user} = req.session  
    //MODEL.findByIdAndUpdate

    User.findByIdAndUpdate(user._id, {...restUser}, {new:true})
    .then(updatedUser =>{
        //sobreescribir el user current req.session para actualizar el usuario en los request
        req.session.user = updatedUser

        res.redirect("/user/my-profile")
    })
    .catch(error=>{
        next(error)
    })
})
//perfil
router.get("/my-profile", (req, res, next) => {
    //sacar al current user del request que fue almacenado gracias a express-session
    const {user} = req.session
  res.render("user/profile",user);
});


module.exports = router;
