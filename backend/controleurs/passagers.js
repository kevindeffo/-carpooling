const bcrypt = require("bcrypt");
const Passager = require("../models/passagers");
const jwt = require("jsonwebtoken");

require('dotenv').config();


exports.signup = (req, res, next) => {

	bcrypt.hash(req.body.password, 6)
    .then((hash) => {
		// Store hash in your password DB.
		const passager = new Passager({
			nom: req.body.nom,
			ville: req.body.ville,
			email: req.body.email,
			password: hash,
			telephone: req.body.telephone,
			statut: req.body.statut,
			photo:"https://res.cloudinary.com/deffokevin14/image/upload/v1646424905/default_izucop.jpg",
		});
      
        passager.save()
        if(passager){
            (res) => res.status(201).json({Message: "Enregistrement reussi."})
        }else{
            (error) => res.status(400).json({error}) 
        }
        // .then((res) => res.status(201).json({Message: "Enregistrement reussi."}))
        // .catch((error) => res.status(400).json({error}));
        // console.log(passager);
	})
    .catch((error) => res.status(400).json({error}));

	
};

exports.login = (req,res,next) =>{
    console.log(req.body);
    Passager.findOne({email: req.body.email})
    .then((user) => {
        if(!user){
            res.status(400).json({erreur:'utilisateur non trouve'})
        }else{
            
            bcrypt.compare(req.body.password,user.password)
            .then((valid) => {
                if(!valid){
                    return res.status(401).json({erreur:"Adresse mail ou mot de passe incorrect"})
                }
                const userinfos ={
                    nom : user.nom,
                    email: user.email, 
                    telephone: user.telephone,
                    photo : user.photo,
                    statut: user.statut,
                    id : user._id,
                    ville : user.ville
                }
                const token = jwt.sign(
                    {userId:user._id},
                    process.env.TOKEN_SECRET,
                    {expiresIn:'3h'}
                )
                userinfos.token = token
                res.status(200).json({
                    nom : user.nom,
                    email: user.email, 
                    telephone: user.telephone,
                    photo : user.photo,
                    statut: user.statut,
                    id : user._id,
                    ville : user.ville,
                    token
                })
            })
           
        }
    })

}

exports.verify_token = (req,res,next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
    
        // Vérifier si le token est valide
        try {
          jwt.verify(token, process.env.TOKEN_SECRET);
          res.status(201).json({ message: "token valide" });
        } catch (error) {
          res.status(400).json(error);
        }
      }
    
}
