const express = require('express'); 
const cors = require('cors');
// const Guide = require('./models/GuideTouristique');
const app = express();
const mongoose = require('mongoose');



const passagersRoutes = require('./routes/Passagers')



mongoose.connect('mongodb://localhost/Car',{  useNewUrlParser: true})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


// formatage des elements entrant 
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Gestion du CORS « Cross Origin Resource Sharing »
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });
  




app.use(cors());
app.use('/api/passagers', passagersRoutes);



module.exports = app ;