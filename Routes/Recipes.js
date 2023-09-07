import express from 'express';
import { RecipeModel } from '../Models/recipes.js';
import { userModel } from '../Models/users.js';


const router = express.Router();

router.get('/',async(req, res)=>{
    try {
    const allRecipes = await RecipeModel.find();
    console.log(allRecipes.length);
    return res.status(200).json(allRecipes);
    } catch (error) {
        return res.status(500).json('Internal Server Error');
    }
})

//create:
router.post('/create',async(req,res)=>{
    try {
        const newRecipe = new RecipeModel(
            req.body
        )
     const response = await newRecipe.save();
        return res.status(200).json({response});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
})


router.put('/saved', async(req,res)=>{
    try {
        const recipe = await RecipeModel.findById(req.body.recipeId);
    const users = await userModel.findById(req.body.userId);
    users.savedRecipes.push(recipe);
    await users.save();
    return res.status(200).json({savedRecipes: users.savedRecipes});
    } catch (error) {
        
    }
})

router.get('/saved/id/:userId', async(req,res)=>{
    try {
        const user = await userModel.findById(req.params.userId);
        const savedRecipes = user.savedRecipes; // Assuming savedRecipes is an array of recipe objects
        return res.status(200).json(savedRecipes);
    } catch (error) {
        return res.status(500).json('Internal Server Error');
        console.log(error.message)
    }
})

// router.get('/saved/:userId', async(req,res)=>{
//     try {
//         const user = await userModel.findById(req.params.userId);
//         const savedRecipes = await RecipeModel.find({
//             _id: {$ne: user.savedRecipes}
//         })
//         return res.status(200).json(savedRecipes)
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json('Internal Server Error');
//     }
// })
router.get('/saved/:userId', async (req, res) => {
    try {
      const user = await userModel.findById(req.params.userId);
      const savedRecipeIds =user.savedRecipes.map(recipe => recipe._id);
      const savedRecipes = await RecipeModel.find({ _id: { $in: savedRecipeIds } });
      return res.status(200).json( savedRecipes );
    } catch (error) {
      console.log(error);
      return res.status(500).json('Internal Server Error');
    }
  });

router.get('/savedRecipes/:userId', async (req, res) => {
    try {
      const user = await userModel.findById(req.params.userId);
      const savedRecipes = user.savedRecipes;
      return res.status(200).json({ savedRecipes });
    } catch (error) {
      console.log(error);
      return res.status(500).json('Internal Server Error');
    }
  });

// // Get saved recipes
// router.get("/savedRecipes/:userId", async (req, res) => {
//     try {
//       const user = await userModel.findById(req.params.userId);
//       const savedRecipes = await RecipeModel.find({
//         _id: { $in: user.savedRecipes },
//       });
  
//       console.log(savedRecipes);
//       res.status(201).json({ savedRecipes });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   });
  


router.delete('/savedRecipes/:userId/:productId',async(req,res)=>{
  try {
  const userId = req.params.userId;
  const productId = req.params.productId;
  
  const user = await userModel.findById(userId);

  if(!user){
      return res.status(404).json({message: 'user not found'})
  }

  user.savedRecipes=user.savedRecipes.filter((product)=>product._id.toString() !== productId);
  await user.save();
  return res.status(200).json({message: 'Product removed from your cart'})
  } catch (error) {
  console.log(error)
  return res.status(500).json({message: 'Internal Server Error'}) 
  }
})


export const recipeRouter = router;