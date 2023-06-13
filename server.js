const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const _ = require('lodash')
const mongoose = require("mongoose")
const { redirect } = require("express/lib/response")
mongoose.connect("mongodb+srv://laryjude:Miracle%402002@cluster0.vqkvle4.mongodb.net/blogpostDB").then(()=>console.log('successful')).catch(err=>console.log(err))

const blogSchema = new mongoose.Schema({
    heading:String,
    body:String
}) 

const Blogpost = mongoose.model("Blog", blogSchema)

const app = express()
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

app.get("/", function(req,res){

    Blogpost.find({}).then((data)=>{
    
            res.render('blog',{postblog:data}) 
    })   
})


app.get("/about", function(req,res){
    res.render('about')
})

app.get("/contact", function(req,res){
    res.render('contact')
})

app.get("/compose", function(req,res){

    res.render('compose')

})



app.post("/compose" ,function(req,res){

    const heading = req.body.headingpost
    const blog = req.body.blogpost
    const blogpost = new Blogpost({
        heading:heading,
        body:blog
    })

    blogpost.save()

    Blogpost.find({}).then((data)=>{
        res.redirect('/')
})  
 
})

app.get("/post/:head",function(req,res){
  const route = _.lowerCase(req.params.head)
  console.log(route)
  Blogpost.find({}).then(data=>{
    data.forEach(item =>{
    const datahead = _.lowerCase(item.heading)
    if(route===datahead){
        res.render("post",{headingpost:item.heading, postblog:item.body})
    }
    })
  })
})


app.listen(3000, function(){
    console.log("app is runnig on port 3000 now .....")
})
