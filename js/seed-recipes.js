// Starting recipes, pulled from Jim's own recipe docs. Ingredient amounts are
// the "as cooked" quantities at each recipe's own serving size — the app
// scales them up/down to whatever headcount you're adding them to an event for.
// Each ingredient's "category" is one of the SAME shopping-list categories
// used by the master item list (Vegetables, Pantry, Dairy, Meat, etc.), so
// recipe ingredients land in the normal columns on the list instead of a
// separate per-recipe section.
const SEED_RECIPES = [
  {
    category: 'Puddings',
    name: 'Burnt Sugar Steamed Pudding (A10 tin)',
    servings: 37,
    ingredients: [
      { name: 'Self-raising flour', amount: 4.5, unit: 'cups', category: 'Baking' },
      { name: 'Sugar (for crumb)', amount: 2.33, unit: 'cups', category: 'Baking' },
      { name: 'Salt', amount: 1.5, unit: 'tsp', category: 'Baking' },
      { name: 'Butter', amount: 390, unit: 'g', category: 'Dairy' },
      { name: 'Sugar (for burnt sugar mix)', amount: 1.5, unit: 'cups', category: 'Baking' },
      { name: 'Boiling water', amount: 1.5, unit: 'cups', category: 'Pantry' },
      { name: 'Eggs', amount: 7, unit: 'each', category: 'Pantry' },
      { name: 'Golden syrup', amount: 100, unit: 'ml', category: 'Baking' },
      { name: 'Baking soda', amount: 2, unit: 'tbsp', category: 'Baking' },
      { name: 'Warm milk', amount: 1.5, unit: 'cups', category: 'Dairy' }
    ]
  },
  {
    category: 'Meals',
    name: 'Bacon & Egg Pie (1 large tray)',
    servings: 35,
    ingredients: [
      { name: 'Ready-made pastry sheets', amount: 8, unit: 'sheets', category: 'Baking' },
      { name: 'Bacon (diced)', amount: 1.5, unit: 'kg', category: 'Meat' },
      { name: 'Eggs', amount: 24, unit: 'each', category: 'Pantry' },
      { name: 'Milk', amount: 750, unit: 'ml', category: 'Dairy' },
      { name: 'Grated cheese', amount: 500, unit: 'g', category: 'Dairy' },
      { name: 'Onions (diced)', amount: 600, unit: 'g', category: 'Vegetables' },
      { name: 'Tomatoes (diced)', amount: 600, unit: 'g', category: 'Vegetables' },
      { name: 'Spring onions', amount: 2, unit: 'bunches', category: 'Vegetables' },
      { name: 'Salt', amount: 2, unit: 'tsp', category: 'Baking' },
      { name: 'Black pepper', amount: 2, unit: 'tsp', category: 'Baking' },
      { name: 'Dried parsley', amount: 2, unit: 'tbsp', category: 'Baking' },
      { name: 'Garlic powder', amount: 2, unit: 'tsp', category: 'Baking' },
      { name: 'Butter or oil', amount: 2, unit: 'tbsp', category: 'Pantry' }
    ]
  },
  {
    category: 'Meals',
    name: 'Easy Creamy Potato Bake',
    servings: 35,
    ingredients: [
      { name: 'Potatoes (peeled, sliced)', amount: 6, unit: 'kg', category: 'Vegetables' },
      { name: 'Bacon (diced, optional)', amount: 1, unit: 'kg', category: 'Meat' },
      { name: 'Grated cheese', amount: 1, unit: 'kg', category: 'Dairy' },
      { name: 'Cream', amount: 2, unit: 'l', category: 'Dairy' },
      { name: 'Milk', amount: 1, unit: 'l', category: 'Dairy' },
      { name: 'Butter', amount: 250, unit: 'g', category: 'Dairy' },
      { name: 'Onions (sliced)', amount: 4, unit: 'each', category: 'Vegetables' },
      { name: 'Garlic cloves', amount: 4, unit: 'cloves', category: 'Vegetables' },
      { name: 'Salt', amount: 4, unit: 'tsp', category: 'Baking' },
      { name: 'Black pepper', amount: 2, unit: 'tsp', category: 'Baking' },
      { name: 'Dried mixed herbs (optional)', amount: 2, unit: 'tbsp', category: 'Baking' }
    ]
  }
];
