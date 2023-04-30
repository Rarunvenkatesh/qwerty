// imports
const express = require("express");
const bodyparser = require("body-parser");
const satelize = require("satelize");
const ejs = require("ejs");
const process = require('process');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const { log } = require("console");
const saltrounds = 10;
const app = express();
// app creatiom
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
// database
mongoose.connect('mongodb://127.0.0.1:27017/usrDB ');
const userschema = new mongoose.Schema({
    name: String,
    password : String,
    email: String
});
const User = new mongoose.model("User", userschema);

const mechuserschema = new mongoose.Schema({
    name: String,
    password : String,
    email: String
});
const mechUser = new mongoose.model("mechUser", mechuserschema);


const mechanicSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    problemdesc: String,
    address:String,
    pincode:Number
});
const booking = new mongoose.model("booking", mechanicSchema);




const serviceSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    car: String,
    service:String,
    address:String
});
const service = new mongoose.model("service", serviceSchema);


const feedback = new mongoose.Schema({
    name: String,
    email: String,
    rating:Number,
    description: String
});
const feed = new mongoose.model("feed", feedback);


const mechDetails= [];


// app.get("/logtype", function(req , res){
//     res.render("logandrejtype");
// });


// get and post for authentication
app.get("/", function(req , res){
    res.render("logandrejtype");
});
app.get("/index", function(req , res){
    res.render("index");
});
app.get("/jobtype", function(req , res){
    res.render("jobtype");
});
app.get("/mechanicbooking", function(req , res){
res.render("mechanicbook");
});
app.get("/waitingpage",function(req, res){
    res.render("waitingpage");
});
app.get("/mechjob",function(req, res){
   
    res.render("mechjob")
    
  
});
app.get("/successor",function(req, res){
   
    res.render("successor")
    
  
});
app.get("/payment",function(req, res){
   
    res.render("payment")
    
  
});
app.get("/feedback",function(req, res){
   
    res.render("feedback")
    
  
});
app.get("/serviceprocessingpage",function(req, res){
    res.render("serviceprocessingpage");
})
app.get("/givname", function(req,res){
    res.render("givname")
})
app.get("/yourjob", function(req,res){
    res.render("yourjob")
})
app.get("/carservice", function(req, res){
    res.render("carservice");
});

app.get("/mechdetails", function(req,res){
    res.render("mechdetails")
})
app.get("/usr", function(req , res){
    res.render("usr");
});
app.get("/mech", function(req , res){
    res.render("jobtype");
});
app.get("/register", function(req , res){
    res.render("register");
});
app.get("/loginusr", function(req , res){
    res.render("loginusr");
});
app.get("/loginmech", function(req , res){
    res.render("loginmech");
});
app.get("/registermech", function(req , res){
    res.render("registermech");
});
app.get("/arrivingdriver", function(req , res){
    res.render("arrivingdriver");
});
app.get("/yourserjob", function(req , res){
    res.render("yourserjob");
});




app.post("/carservice" ,  function(req ,res){
    
    const newservice = new service({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.number,
        car: req.body.car,
        service: req.body.service,
        address: req.body.address,
        
        })
        newservice.save()  
res.render("serviceprocessingpage")
});

app.post("/servicetype" , function(req, res){
    service.find({})
    .then((foundUser) => {
         res.render("servicejob",{name: foundUser, email: foundUser, address: foundUser, });
    res.render("servicejob")
})
});


app.post("/feedback", function(req,res){
    const newfeedback = new feed({
        name: req.body.name,
        
        phone: req.body.number,
        rating: req.body.rating,
        description: req.body.description
        })
        newfeedback.save() 
})


 app.post("/givname" ,function(req,res){
    var username  = req.body.name;
   mechDetails.push(username);
   console.log(mechDetails);
   res.render("yourjob")

});
app.post("/mechanicbooking", function(req , res){

    const newbooking = new booking({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.number,
    date: req.body.date,
    time: req.body.time,
    problemdesc: req.body.description,
    address: req.body.address,
    pincode: req.body.pincode
    })
    newbooking.save()  
    console.log(mechDetails);
    mechUser.findOne({name: mechDetails})
   
    .then((foundUser) => {
        var name = foundUser.name;
        var email = foundUser.email;
    
        res.render("mechdetails",{Name : name,  Email: email});
    })

// res.redirect("/givname");


    
 });
app.post("/mechanictype", function(req, res){
    booking.find({})
    .then((foundUser) => {
         res.render("mechjob",{name: foundUser, email: foundUser, address: foundUser, pincode: foundUser});
        //  res.render("givname")
        //  Parse.User.enableUnsafeCurrentUser();
        //  const currentUser = Parse.User.current();
        //  console.log(currentUser);
        // const currentUser = process.env.USER || process.env.USERNAME;
        // console.log(`The current user is ${currentUser[name]}`);
})
});
app.post("/calltype", function(req, res){   
    res.render("calltype")
});

app.post("/register", function(req , res){
    bcrypt.hash(req.body.password, saltrounds, function(err, hash) {
        const newUser = new User({
        name: req.body.username,
        password: hash,
        email: req.body.email
    });
       newUser.save()
       .then(data => {
        res.render("index")
      })
      .catch(err => {
        console.error(err);
     });
   });
});
app.post("/registermech", function(req , res){
    bcrypt.hash(req.body.password, saltrounds, function(err, hash) {
        const newUserr = new mechUser({
        name: req.body.username,
        password: hash,
        email: req.body.email
    });
       newUserr.save()
       .then(data => {
        res.render("jobtype")
      })
      .catch(err => {
        console.error(err);
     });
   });
});
app.post("/usr", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ name:username})
    .then((foundUser) => {
        if(foundUser){
            bcrypt.compare(password, foundUser.password, function(err, result) {
                if(result === true){
                res.render("index")
                }
            });
            }
        })
.catch((err) => {
    console.log(err);
    res.send(3000, " bad rewq");
       });
    });
app.post("/mech", function(req, res){
    const username = req.body.username;
        const password = req.body.password;
    
        mechUser.findOne({ name:username})
      
        .then((foundUser) => {
            console.log(foundUser);
            if(foundUser){
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    if(result === true){
                    res.render("jobtype")
                    
                    }
                });
                }
            })
    .catch((err) => {
        console.log(err);
        res.send(3000, " bad rewq");
           });
         
        });
    

    


app.listen(3000, function(){
    console.log("the server is running in port 3000");
});

