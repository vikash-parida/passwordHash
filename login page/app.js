if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const port =  9000;
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');



app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());


//  passport require

const initializePassport = require('./passport-config');

  initializePassport(
    passport,
    user => users.find(user.email === email)
    );




const users = [];



app.get('/',(req, res,) => {
    res.render('index.ejs',{name:'vikash'}) 
})


app.get('/login',(req, res,) => {
    res.render('login.ejs') 
})
app.post('/login',passport.authenticate('local',{ 
    successRedirect:'/',
    failureRedirect:'/login',
    failureRedirect:true
})

)

app.get('/register',async (req, res,) => {
 
    res.render('register.ejs') 
})

app.post('/register', async (req, res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        users.push({
            id: Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        });
        res.redirect('./login.ejs');
        }catch(err){
        res.redirect('./register.ejs');
        }
        console.log(users);
})


app.listen(port,()=>{
    console.log('listening on port : '+ port);
})


