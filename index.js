const exp = require('constants');
const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs');
const { log } = require('console');
const { fileLoader } = require('ejs');



app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set("view engine",'ejs');
app.use(express.static(path.join(__dirname,"public")));


// create a get request 
app.get('/' ,(req,res)=>{
  fs.readdir(`./files`,(err,files)=>{
    res.render('index',{files:files})
  })

})

//create post request 
app.post('/create' ,(req,res)=>{
 
fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.details,function(err){
  res.redirect('/')
})

})


// save file 
app.get('/file/:filename' ,(req,res)=>{
  fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
    res.render('show',{filename:req.params.filename,filedata:filedata})
    
  });
}) ;



app.listen(3000,()=>{
  console.log(`Server running on port:3000`)
})