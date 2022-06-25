//vamos a importar
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer")

//config
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
});


//config storage
const storage = new CloudinaryStorage({
    //clodinary config
    cloudinary,
    params:{
        folder:"edit-user-project",
        allowed_formats:['jpg',"png","gif","svg"],
        
    }
})


module.exports = multer({storage})
