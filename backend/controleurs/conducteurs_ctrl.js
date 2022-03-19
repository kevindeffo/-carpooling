const bcrypt = require("bcrypt");
const Conducteurs = require("../models/conducteurs_model");
const jwt = require("jsonwebtoken");

require('dotenv').config();


exports.signup = (req, res, next) => {


	bcrypt.hash(req.body.password, 6)
    .then((hash) => {
   
		// creation de l'element a enregistrer en fonction du model
		var conducteur = new Conducteurs({
            nom: req.body.nom,
            ville:req.body.ville,
            email: req.body.email,
            telephone: req.body.telephone,
            password:hash,
            statut: 'chauffeur',
            photo: 'https://res.cloudinary.com/deffokevin14/image/upload/v1646424905/default_izucop.jpg',
		});
        conducteur.save()
        if(conducteur){
             res.status(201).json({Message: "Enregistrement reussi."})
        }else{
             res.status(400).json({error}) 
        }
	})
    .catch((error) => res.status(400).json({error}));

	
};

exports.login = (req,res,next) =>{
    console.log(req.body);
    Conducteurs.findOne({email: req.body.email})
    .then((user) => {
        if(!user){
            res.status(400).json({erreur:'utilisateur non trouve'})
        }else{
            
            bcrypt.compare(req.body.password,user.password)
            .then((valid) => {
                if(!valid){
                    return res.status(401).json({erreur:"Adresse mail ou mot de passe incorrect"})
                }
               
                const token = jwt.sign(
                    {userId:user._id},
                    process.env.TOKEN_SECRET,
                    {expiresIn:'3h'}
                )
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
