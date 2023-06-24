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
    res.render('home')
    // res.json({message: "Hello World", msg2:"hello 2"})
})

app.get('/searchRecipe', (req, res) => {
    res.render('searchRecipe')
})

app.post('/searchRecipe', async (req, res) => {
    console.log(req.body);
    const title = req.body.title;

    const recipes = await Recipe.find({title:title});

    if(!recipes){
        res.redirect('/searchRecipe')
    }else{
        res.render('showSearchedRecipes',{recipes})
    }

})


app.post('/addNewRecipe', async (req, res) => {
    console.log(req.body);
    const recipe = await Recipe.create(req.body);

    recipe.ingredients = req.body.ingredients.split(',');

    if(!recipe){
        return res.redirect('/addNewRecipe')
    }
    res.redirect('/getRecipes')
})

app.get('/addNewRecipe',(req,res)=>{
    res.render('addRecipe')
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
    // res.json(recipes);
    res.render('showAllRecipes',{recipes});
})

app.use('*',(req,res)=>{
    res.write("404");
    res.end("Not Found")
})
