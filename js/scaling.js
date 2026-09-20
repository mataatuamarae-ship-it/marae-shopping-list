// Turns a master item + event size (people, days) into a suggested quantity.
const Scaling = {
  // Rounds up "nicely": whole numbers for anything >= 2, but never below 1 if base > 0.
  roundQty(n) {
    if (n <= 0) return 0;
    return Math.max(1, Math.ceil(n - 1e-9));
  },

  suggestedQty(item, people, days) {
    const p = Number(people) || 0;
    const d = Number(days) || 1;
    if (item.scaling === 'per_100_2days') {
      const raw = item.baseQty * (p / 100) * (d / 2);
      return this.roundQty(raw);
    }
    // fixed: same regardless of headcount (things like a first-aid item, or "Got" staples)
    // but nudge slightly for very large or multi-day events
    if (d > 2 && item.baseQty > 0) {
      return this.roundQty(item.baseQty * (d / 2));
    }
    return item.baseQty;
  },

  buildLinesForEvent(items, people, days) {
    return items.map(item => ({
      itemId: item.id,
      name: item.name,
      category: item.category,
      qty: this.suggestedQty(item, people, days),
      unit: item.unit || '',
      unitPrice: item.unitPrice || null,
      actualPrice: null,
      checked: false
    }));
  },

  // ---------- recipe ingredient scaling ----------
  WHOLE_UNITS: ['each', 'sheets', 'bunches', 'cloves', 'dozen', 'slab', 'pkt'],

  scaleIngredientAmount(amount, unit, factor) {
    const raw = Number(amount) * factor;
    if (raw <= 0) return 0;
    const u = (unit || '').toLowerCase();
    if (this.WHOLE_UNITS.includes(u)) return Math.max(1, Math.ceil(raw - 1e-9));
    if (u === 'g' || u === 'ml') return Math.round(raw / 5) * 5;
    if (u === 'kg' || u === 'l' || u === 'litre' || u === 'litres') return Math.round(raw * 10) / 10;
    if (u === 'cup' || u === 'cups' || u === 'tsp' || u === 'tbsp') return Math.round(raw * 4) / 4;
    return Math.round(raw * 100) / 100;
  },

  // Ingredients are stored as { itemId, amount, unit } — a link to a master
  // item plus the recipe's own cooking quantity. `items` (Store.getItems())
  // is used to look up that item's current name, category and unit price,
  // so a recipe always reflects the master list rather than its own copy.
  scaleRecipeIngredients(recipe, people, items) {
    const factor = (Number(people) || recipe.servings) / recipe.servings;
    const lookup = items || [];
    return recipe.ingredients.map(ing => {
      const item = lookup.find(i => i.id === ing.itemId);
      return {
        itemId: ing.itemId || null,
        name: item ? item.name : (ing.name || 'Unknown item'),
        category: item ? item.category : (ing.category || 'Other'),
        unitPrice: item ? item.unitPrice : null,
        unit: ing.unit || '',
        amount: this.scaleIngredientAmount(ing.amount, ing.unit, factor)
      };
    });
  }
};
