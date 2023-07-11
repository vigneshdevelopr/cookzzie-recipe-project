import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
foodname:{
    type: String,
    // required: true
},
ingredients:[{
    type: String,
    // required: true
}],
instructions: {
    type: String,
    // required: true
},
imageLink:{
    type: String,
    // required: true
},
timePeriod:{
    type: Number,
    // required: true
},
createdUser:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'users',
    // required: true
}
})

export const RecipeModel = mongoose.model('recipes', recipeSchema);