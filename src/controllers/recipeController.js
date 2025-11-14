let recipes = [
  { 
    id: 1, 
    name: "Spaghetti Carbonara", 
    cuisine: "Italian", 
    difficulty: "Medium", 
    prepTime: 15, 
    cookTime: 20, 
    servings: 4,
    ingredients: [
      { name: "Spaghetti", quantity: 400, unit: "g" },
      { name: "Eggs", quantity: 4, unit: "count" },
      { name: "Bacon", quantity: 200, unit: "g" },
      { name: "Parmesan Cheese", quantity: 100, unit: "g" },
      { name: "Black Pepper", quantity: 2, unit: "tsp" }
    ]
  },
  { 
    id: 2, 
    name: "Chocolate Chip Cookies", 
    cuisine: "American", 
    difficulty: "Easy", 
    prepTime: 10, 
    cookTime: 12, 
    servings: 24,
    ingredients: [
      { name: "Flour", quantity: 2.25, unit: "cups" },
      { name: "Butter", quantity: 1, unit: "cup" },
      { name: "Sugar", quantity: 0.75, unit: "cup" },
      { name: "Eggs", quantity: 2, unit: "count" },
      { name: "Chocolate Chips", quantity: 2, unit: "cups" }
    ]
  },
];

export const getAllRecipes = (req, res) => {
  res.json({ data: recipes });
};

export const getRecipeById = (req, res) => {
  const id = Number(req.params.id);
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) return res.status(404).json({ error: "Recipe not found" });
  res.json(recipe);
};

export const createRecipe = (req, res) => {
  const { name, cuisine, difficulty, prepTime, cookTime, servings, ingredients } = req.body;
  if (!name || !cuisine || !difficulty || prepTime === undefined || cookTime === undefined || servings === undefined || !ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: "Missing or invalid required fields: name, cuisine, difficulty, prepTime, cookTime, servings, ingredients (array)" });
  }
  const newRecipe = { 
    id: Math.max(...recipes.map(r => r.id), 0) + 1, 
    name, 
    cuisine, 
    difficulty, 
    prepTime, 
    cookTime, 
    servings, 
    ingredients 
  };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
};

export const updateRecipe = (req, res) => {
  const id = Number(req.params.id);
  const recipeIndex = recipes.findIndex((r) => r.id === id);
  if (recipeIndex === -1) return res.status(404).json({ error: "Recipe not found" });
  
  const { name, cuisine, difficulty, prepTime, cookTime, servings, ingredients } = req.body;
  recipes[recipeIndex] = { 
    id, 
    name: name || recipes[recipeIndex].name, 
    cuisine: cuisine || recipes[recipeIndex].cuisine, 
    difficulty: difficulty || recipes[recipeIndex].difficulty, 
    prepTime: prepTime !== undefined ? prepTime : recipes[recipeIndex].prepTime,
    cookTime: cookTime !== undefined ? cookTime : recipes[recipeIndex].cookTime,
    servings: servings !== undefined ? servings : recipes[recipeIndex].servings,
    ingredients: ingredients && Array.isArray(ingredients) ? ingredients : recipes[recipeIndex].ingredients
  };
  res.json(recipes[recipeIndex]);
};

export const deleteRecipe = (req, res) => {
  const id = Number(req.params.id);
  const recipeIndex = recipes.findIndex((r) => r.id === id);
  if (recipeIndex === -1) return res.status(404).json({ error: "Recipe not found" });
  
  const deletedRecipe = recipes.splice(recipeIndex, 1);
  res.json({ message: "Recipe deleted", recipe: deletedRecipe[0] });
};

export const getRecipesByDifficulty = (req, res) => {
  const difficulty = req.query.difficulty;
  if (!difficulty) return res.status(400).json({ error: "Query parameter 'difficulty' required" });
  
  const filtered = recipes.filter((r) => r.difficulty.toLowerCase() === difficulty.toLowerCase());
  res.json({ data: filtered });
};

export const getRecipesByCuisine = (req, res) => {
  const cuisine = req.query.cuisine;
  if (!cuisine) return res.status(400).json({ error: "Query parameter 'cuisine' required" });
  
  const filtered = recipes.filter((r) => r.cuisine.toLowerCase() === cuisine.toLowerCase());
  res.json({ data: filtered });
};