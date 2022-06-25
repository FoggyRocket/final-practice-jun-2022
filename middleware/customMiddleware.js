//creamos un middleware para checar los roles que tienen permitido acceder o realizar determinandas acciones
                    //["ADMIN","STAFF"]
exports.checkRole = (arrayRoles)=>{

    return (req,res,next)=>{
        //voy a sacar de mi req.session al user logged para saber que rol tiene
        const {role} = req.session.user
                //["ADMIN","STAFF"].includes("USER")
        if( arrayRoles.includes(role) ){
            return next()
        }else{
            //le mandamos un mensaje o lo mandamos a una pagina 
            return res.status(403).send("No tienes el nivel requerido para esta accion")
        }
    }
}