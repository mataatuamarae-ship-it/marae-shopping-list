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
      unitPrice: item.unitPrice || null,
      actualPrice: null,
      checked: false
    }));
  }
};
