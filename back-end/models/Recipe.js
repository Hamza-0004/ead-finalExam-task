const mongoose = require('mongoose')
const schema = mongoose.Schema;

const RecipeSchema = new schema({
    title:String,
    description:String,
    ingredients:[String],
    instruction:[String],
})

module.exports = mongoose.model('Recipe',RecipeSchema)