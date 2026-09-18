// Seed master item list, derived from the marae shopping template + a real purchase list.
// Jim: edit freely in the app (Manage Items) — this is just the starting point.
const SEED_ITEMS = [
  {
    "category": "Vegetables",
    "name": "Potatoes 10kg",
    "scaling": "per_100_2days",
    "baseQty": 17,
    "unitPrice": 8.99,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Eggs 18pkt",
    "scaling": "per_100_2days",
    "baseQty": 20,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Vegetables",
    "name": "Pumkin",
    "scaling": "per_100_2days",
    "baseQty": 15,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Jolly Drinks 24s",
    "scaling": "per_100_2days",
    "baseQty": 8,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Vegetables",
    "name": "Kumara 20kg Box",
    "scaling": "per_100_2days",
    "baseQty": 3,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Water",
    "scaling": "per_100_2days",
    "baseQty": 2,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Vegetables",
    "name": "Onions 10kg",
    "scaling": "per_100_2days",
    "baseQty": 3,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Raro (3pkt)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 1.49,
    "unit": ""
  },
  {
    "category": "Vegetables",
    "name": "Cabbage",
    "scaling": "per_100_2days",
    "baseQty": 10,
    "unitPrice": 2.59,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Milk Powder 1kg",
    "scaling": "per_100_2days",
    "baseQty": 2,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Vegetables",
    "name": "Spring Onion",
    "scaling": "per_100_2days",
    "baseQty": 6,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Coffee",
    "scaling": "per_100_2days",
    "baseQty": 6,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Vegetables",
    "name": "Lettuce",
    "scaling": "per_100_2days",
    "baseQty": 6,
    "unitPrice": 1.69,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Teabags",
    "scaling": "per_100_2days",
    "baseQty": 4,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Vegetables",
    "name": "Tomato - Bag",
    "scaling": "per_100_2days",
    "baseQty": 6,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Porridge",
    "scaling": "per_100_2days",
    "baseQty": 2,
    "unitPrice": 2.99,
    "unit": ""
  },
  {
    "category": "Vegetables",
    "name": "Cucumber",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Weetbix 1kg",
    "scaling": "per_100_2days",
    "baseQty": 2,
    "unitPrice": 5.0,
    "unit": ""
  },
  {
    "category": "Vegetables",
    "name": "Capsicum",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Golden Syrup",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 5.89,
    "unit": ""
  },
  {
    "category": "Vegetables",
    "name": "Red Onion singles",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Plum Jam",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Tomato Sauce 2L",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Soya Sauce",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Fruit",
    "name": "Apples 20kg Box",
    "scaling": "per_100_2days",
    "baseQty": 1,
    "unitPrice": 32.0,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Sweet Chilli Sauce",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Fruit",
    "name": "Oranges 20kg Box",
    "scaling": "per_100_2days",
    "baseQty": 1,
    "unitPrice": 20.0,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Coconut Cream (Kara 1L box or 6 cans)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Fruit",
    "name": "Bananas 20kg Box",
    "scaling": "per_100_2days",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Mayonaise 887ml",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Fruit",
    "name": "Kiwifruit",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Cooking Oil 5L",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Fruit",
    "name": "Crushed Chilli 1kg",
    "scaling": "per_100_2days",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Fruit Salad",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Fruit",
    "name": "Crushed Garlic 1kg",
    "scaling": "per_100_2days",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Peaches",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Fruit",
    "name": "Crushed Ginger 1kg",
    "scaling": "per_100_2days",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Spaghetti",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 14.99,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Baked Beans",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Dairy",
    "name": "Yoghurt",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Dairy",
    "name": "Cheese",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 8.49,
    "unit": ""
  },
  {
    "category": "Baking",
    "name": "Self Rising Flour",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 11.49,
    "unit": ""
  },
  {
    "category": "Dairy",
    "name": "Butter 500g",
    "scaling": "per_100_2days",
    "baseQty": 28,
    "unitPrice": 4.45,
    "unit": ""
  },
  {
    "category": "Baking",
    "name": "Plain Flour 5kg",
    "scaling": "per_100_2days",
    "baseQty": 8,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Dairy",
    "name": "Cream 2lt",
    "scaling": "per_100_2days",
    "baseQty": 6,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Baking",
    "name": "Sugar 5kg",
    "scaling": "per_100_2days",
    "baseQty": 4,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Dairy",
    "name": "Milk 3lt",
    "scaling": "per_100_2days",
    "baseQty": 15,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Baking",
    "name": "Brown Sugar",
    "scaling": "per_100_2days",
    "baseQty": 4,
    "unitPrice": 2.53,
    "unit": ""
  },
  {
    "category": "Dairy",
    "name": "Bread (Stuffing)",
    "scaling": "per_100_2days",
    "baseQty": 10,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Baking",
    "name": "Icing Sugar",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Dairy",
    "name": "Bread (Sandwiches)",
    "scaling": "per_100_2days",
    "baseQty": 20,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Baking",
    "name": "Cocoa Powder",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Baking",
    "name": "Cornflour",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Frozen",
    "name": "Surimi 1KG",
    "scaling": "per_100_2days",
    "baseQty": 8,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Baking",
    "name": "Baking Powder",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Frozen",
    "name": "Shrimps",
    "scaling": "per_100_2days",
    "baseQty": 5,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Baking",
    "name": "Custard Powder",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Frozen",
    "name": "Goofy Cakes - Slab",
    "scaling": "per_100_2days",
    "baseQty": 4,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Baking",
    "name": "Yeast (12 pkt sachet)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Frozen",
    "name": "Ice cream",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Baking",
    "name": "Mixed Herbs",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Frozen",
    "name": "Mixed Vegetables",
    "scaling": "per_100_2days",
    "baseQty": 6,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Baking",
    "name": "Curry Powder",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Frozen",
    "name": "Peas",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Baking",
    "name": "Salt",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 1.93,
    "unit": ""
  },
  {
    "category": "Baking",
    "name": "Pepper",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Cleaning",
    "name": "Toilet Paper 40PK",
    "scaling": "per_100_2days",
    "baseQty": 6,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Other",
    "name": "Glad Wrap",
    "scaling": "per_100_2days",
    "baseQty": 4,
    "unitPrice": 4.99,
    "unit": ""
  },
  {
    "category": "Cleaning",
    "name": "Dishwash",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Other",
    "name": "Tin Foil",
    "scaling": "per_100_2days",
    "baseQty": 4,
    "unitPrice": 2.69,
    "unit": ""
  },
  {
    "category": "Cleaning",
    "name": "Disinfectant",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 4.49,
    "unit": ""
  },
  {
    "category": "Other",
    "name": "Baking Paper",
    "scaling": "per_100_2days",
    "baseQty": 2,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Cleaning",
    "name": "Jif Cleanser",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Other",
    "name": "Muslin Cloth",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Cleaning",
    "name": "Toilet Cleaner",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Cleaning",
    "name": "Hand Soap / Handwash",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Meat",
    "name": "Whole Chicken",
    "scaling": "per_100_2days",
    "baseQty": 20,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Cleaning",
    "name": "Rubbish Bags",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Meat",
    "name": "Mince",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Cleaning",
    "name": "Goldilocks 2PK",
    "scaling": "per_100_2days",
    "baseQty": 4,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Meat",
    "name": "Sausages 4kg",
    "scaling": "per_100_2days",
    "baseQty": 4,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Cleaning",
    "name": "Sink plug",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Meat",
    "name": "Bacon 1kg",
    "scaling": "per_100_2days",
    "baseQty": 7,
    "unitPrice": 7.29,
    "unit": ""
  },
  {
    "category": "Meat",
    "name": "Steak",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Seafood",
    "name": "Fish Fillets (Carton)",
    "scaling": "per_100_2days",
    "baseQty": 2,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Meat",
    "name": "Pork",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Seafood",
    "name": "Mussels (Sack)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Meat",
    "name": "Ham (Sliced)",
    "scaling": "per_100_2days",
    "baseQty": 20,
    "unitPrice": 8.99,
    "unit": ""
  },
  {
    "category": "Lollies & Treats",
    "name": "Barley sugars",
    "scaling": "fixed",
    "baseQty": 8,
    "unitPrice": 2.99,
    "unit": ""
  },
  {
    "category": "Lollies & Treats",
    "name": "Marshmallows (big bag)",
    "scaling": "fixed",
    "baseQty": 3,
    "unitPrice": 3.69,
    "unit": ""
  },
  {
    "category": "Lollies & Treats",
    "name": "Scroggin",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 4.51,
    "unit": ""
  },
  {
    "category": "Lollies & Treats",
    "name": "Chippies (18 pkt)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 4.99,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Milo (biggest bag)",
    "scaling": "fixed",
    "baseQty": 2,
    "unitPrice": 7.49,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Instant Coffee 90g",
    "scaling": "fixed",
    "baseQty": 2,
    "unitPrice": 1.89,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Instant noodles (10 pkt)",
    "scaling": "fixed",
    "baseQty": 2,
    "unitPrice": 5.59,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "White rice 5kg",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 11.29,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Jam (big jar)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 4.59,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Peanut butter (big jar)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 6.99,
    "unit": ""
  },
  {
    "category": "Pantry",
    "name": "Pickle",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 2.89,
    "unit": ""
  },
  {
    "category": "Baking",
    "name": "Biscuits",
    "scaling": "fixed",
    "baseQty": 8,
    "unitPrice": 1.41,
    "unit": ""
  },
  {
    "category": "Baking",
    "name": "Cabin bread",
    "scaling": "fixed",
    "baseQty": 2,
    "unitPrice": 1.89,
    "unit": ""
  },
  {
    "category": "Baking",
    "name": "Muesli (10 pkt)",
    "scaling": "fixed",
    "baseQty": 2,
    "unitPrice": 2.49,
    "unit": ""
  },
  {
    "category": "Baking",
    "name": "Yeast (jar)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 4.79,
    "unit": ""
  },
  {
    "category": "Vegetables",
    "name": "Carrots 1.5kg",
    "scaling": "fixed",
    "baseQty": 2,
    "unitPrice": 2.5,
    "unit": ""
  },
  {
    "category": "Vegetables",
    "name": "Kamokamo",
    "scaling": "fixed",
    "baseQty": 4,
    "unitPrice": 2.48,
    "unit": ""
  },
  {
    "category": "Meat",
    "name": "Ham",
    "scaling": "fixed",
    "baseQty": 3,
    "unitPrice": 8.99,
    "unit": ""
  },
  {
    "category": "Meat",
    "name": "Beef sausages (each)",
    "scaling": "fixed",
    "baseQty": 84,
    "unitPrice": 0.36,
    "unit": ""
  },
  {
    "category": "Meat",
    "name": "Whole pork",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Meat",
    "name": "Mutton",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "Cleaning",
    "name": "Sunlight soap bar (box)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 2.95,
    "unit": ""
  },
  {
    "category": "Cleaning",
    "name": "Dishwashing liquid 2ltr",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 1.99,
    "unit": ""
  },
  {
    "category": "Cleaning",
    "name": "Firelighters (24 pkt)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 3.36,
    "unit": ""
  },
  {
    "category": "Cleaning",
    "name": "Tea towels (10 pkt)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 11.78,
    "unit": ""
  },
  {
    "category": "Other",
    "name": "Yellow Candles",
    "scaling": "fixed",
    "baseQty": 2,
    "unitPrice": 4.29,
    "unit": ""
  },
  {
    "category": "Other",
    "name": "Matches",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 0.61,
    "unit": ""
  },
  {
    "category": "First Aid",
    "name": "Claratyne",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "First Aid",
    "name": "Insect repellent",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "First Aid",
    "name": "Sunscreen",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "First Aid",
    "name": "Pamol",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  },
  {
    "category": "First Aid",
    "name": "Savlon cream",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": ""
  }
];
