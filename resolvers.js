exports.resolvers = {

   Query: {
      getAllRecipes: () => {}
   },
   Mutation : {
      addRecipe: async(root, { name, category, description, instructions, username }, {Recipe}) => {
         const newRecipe = await new Recipe({ 
            name,
            category,
            description,
            instructions,
            username
         }).save();

         return newRecipe

      }
   }

}