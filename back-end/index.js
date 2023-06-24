const express = require('express');
const path = require("path");
const app = express();

app.set('view engine','ejs') // set() is for selecting the template engine

app.use(express.json());

app.use(express.urlencoded()); 

const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
mongoose.connect('mongodb://0.0.0.0:27017/finaltask');

app.listen(3003, ()=>{
    console.log("listening on 3003")
});

app.get('/', (req, res) => {
    res.json({message: "Hello World", msg2:"hello 2"})
})

app.post('/recipe/save', async (req, res) => {
    console.log(req.body);
    const recipe = await Recipe.create(req.body);

    if(!recipe){
        return res.redirect('/recipe/new')
    }
    res.redirect('/getRecipes')
})

app.post('/recipe/delete', async (req, res) => {
    const {_id}=req.body;
    Recipe.deleteOne({_id:_id},(err)=>{
        if(!err){
            res.status(200).send({
                responseMessage:"Successfully deleted",
                responseCode:1105, //its just my scheme.
                responsePayload:data
              })
        }
        else{
            console.log(err);
            console.log("Could not Delete Recipe");
        }
    })
});

app.get('/getRecipes', async ( req,res)=>{
    const recipes = await Recipe.find();
    console.log(recipes);
    res.json(recipes);
})

app.use('*',(req,res)=>{
    res.write("404");
    res.end("Not Found")
})
