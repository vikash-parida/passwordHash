const express = require('express');
const app = express();
port =  process.env.port || 9000;
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(express.urlencoded({extended:false}))

const users = [];




app.get('/user',(req, res,)=>{
    try {
        res.json(users)
    } catch (error) {
      console.error(error);  
    }
})

app.post('/user', async (req, res)=>{
try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password , salt);
    const user = {email:req.body.email, password:hashedPassword}
    users.push(user)
    console.log(users)
    res.status(201).json(users)
} catch (error) {
  console.error(error);  
}
})

app.post('/user/login',async (req, res,)=>{
const user = users.find(user => user.email == req.body.email)
if(user == null){
    res.status(401).send("user not found");
}
try {
    if(await bcrypt.compare(req.body.password, user.password)){
        res.send('success');
    }else{
        res.send("not allowed");
    }
}catch(error){
   res.status(500).send()
}
})

app.listen(port,()=>{
    console.log('listening on port : '+ port);
})


