const router = require("express").Router();
const User = require("../models/User.model")
//importar la configuracion de clodinary
const fileUploader = require("../config/cloudinary.config")


/* GET va por el formulario para editar al usuario */
router.get("/edit-myUser", (req, res, next) => {
    //sacar al current user del request que fue almacenado gracias a express-session
    const {user} = req.session
  res.render("user/edit-user",user);
});
                            //nombre de la llave del body donde viene la imagen
router.post("/edit-myUser",fileUploader.single('profile_pic'),(req,res,next)=>{
    //validation images
    let profile_pic;
    if(req.file){
        profile_pic = req.file.path
    }

    console.log("req.file",req.file)

    const {role,...restUser } = req.body;
    const {user} = req.session  
    //MODEL.findByIdAndUpdate

    User.findByIdAndUpdate(user._id, {...restUser, profile_pic }, {new:true})
    .then(updatedUser =>{
        let userWithoutPass = updatedUser.toObject()
        delete userWithoutPass.password

        // Bind the user to the session object
                //sobreescribir el user current req.session para actualizar el usuario en los request

        req.session.user = userWithoutPass;


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
