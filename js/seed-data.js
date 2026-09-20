// Seed master item list, derived from the marae shopping template + a real purchase list.
// Jim: edit freely in the app (Manage Items) — this is just the starting point.
const SEED_ITEMS = [
  {
    "category": "Vegetables",
    "name": "Potatoes 10kg",
    "scaling": "per_100_2days",
    "baseQty": 17,
    "unitPrice": 8.99,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5045752_ea_000pns?name=potatoes"
  },
  {
    "category": "Pantry",
    "name": "Eggs 18pkt",
    "scaling": "per_100_2days",
    "baseQty": 20,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5303373_ea_000pns?name=morning-harvest-colony-size-7-eggs"
  },
  {
    "category": "Vegetables",
    "name": "Pumkin",
    "scaling": "per_100_2days",
    "baseQty": 15,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5026217_ea_000pns?name=crown-pumpkin"
  },
  {
    "category": "Pantry",
    "name": "Jolly Drinks 24s",
    "scaling": "per_100_2days",
    "baseQty": 8,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": null
  },
  {
    "category": "Vegetables",
    "name": "Kumara 20kg Box",
    "scaling": "per_100_2days",
    "baseQty": 3,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": null
  },
  {
    "category": "Pantry",
    "name": "Water",
    "scaling": "per_100_2days",
    "baseQty": 2,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5017042_ea_000pns?name=pump-spring-water-bottles"
  },
  {
    "category": "Vegetables",
    "name": "Onions 10kg",
    "scaling": "per_100_2days",
    "baseQty": 3,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5045845_ea_000pns?name=brown-onions"
  },
  {
    "category": "Pantry",
    "name": "Raro (3pkt)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 1.49,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5012081_ea_000pns?name=raro-favourites-lemonade-flavoured-beverage-mix"
  },
  {
    "category": "Vegetables",
    "name": "Cabbage",
    "scaling": "per_100_2days",
    "baseQty": 10,
    "unitPrice": 2.59,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5039960_ea_000pns?name=green-cabbage"
  },
  {
    "category": "Pantry",
    "name": "Milk Powder 1kg",
    "scaling": "per_100_2days",
    "baseQty": 2,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5001714_ea_000pns?name=blue-milk-powder"
  },
  {
    "category": "Vegetables",
    "name": "Spring Onion",
    "scaling": "per_100_2days",
    "baseQty": 6,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5040009_ea_000pns?name=spring-onions"
  },
  {
    "category": "Pantry",
    "name": "Coffee",
    "scaling": "per_100_2days",
    "baseQty": 6,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5240705_ea_000pns?name=nescafe-classic-fine-blend-instant-coffee"
  },
  {
    "category": "Vegetables",
    "name": "Lettuce",
    "scaling": "per_100_2days",
    "baseQty": 6,
    "unitPrice": 1.69,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5047010_ea_000pns?name=fancy-green-lettuce"
  },
  {
    "category": "Pantry",
    "name": "Teabags",
    "scaling": "per_100_2days",
    "baseQty": 4,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5002524_ea_000pns?name=bell-original-black-tea-bags"
  },
  {
    "category": "Vegetables",
    "name": "Tomato - Bag",
    "scaling": "per_100_2days",
    "baseQty": 6,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5040098_kgm_000pns?name=red-tomatoes"
  },
  {
    "category": "Pantry",
    "name": "Porridge",
    "scaling": "per_100_2days",
    "baseQty": 2,
    "unitPrice": 2.99,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5011855_ea_000pns"
  },
  {
    "category": "Vegetables",
    "name": "Cucumber",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5028889_ea_000pns?name=telegraph-cucumber"
  },
  {
    "category": "Pantry",
    "name": "Weetbix 1kg",
    "scaling": "per_100_2days",
    "baseQty": 2,
    "unitPrice": 5.0,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5035008_ea_000pns?name=sanitarium-weet-bix-breakfast-cereal"
  },
  {
    "category": "Vegetables",
    "name": "Capsicum",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5046505_ea_000pns?name=green-capsicum"
  },
  {
    "category": "Pantry",
    "name": "Golden Syrup",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 5.89,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5002767_ea_000pns?name=chelsea-golden-syrup"
  },
  {
    "category": "Vegetables",
    "name": "Red Onion singles",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5045848_kgm_000pns?name=red-onions"
  },
  {
    "category": "Pantry",
    "name": "Plum Jam",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5003835_ea_000pns?name=plum-jam"
  },
  {
    "category": "Pantry",
    "name": "Tomato Sauce 2L",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5009059_ea_000pns?name=wattie's-tomato-sauce"
  },
  {
    "category": "Pantry",
    "name": "Soya Sauce",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5003826_ea_000pns?name=pams-soy-sauce"
  },
  {
    "category": "Fruit",
    "name": "Apples 20kg Box",
    "scaling": "per_100_2days",
    "baseQty": 1,
    "unitPrice": 32.0,
    "unit": "",
    "paknsaveUrl": null
  },
  {
    "category": "Pantry",
    "name": "Sweet Chilli Sauce",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5003462_ea_000pns?name=trident-original-sweet-chilli-sauce"
  },
  {
    "category": "Fruit",
    "name": "Oranges 20kg Box",
    "scaling": "per_100_2days",
    "baseQty": 1,
    "unitPrice": 20.0,
    "unit": "",
    "paknsaveUrl": null
  },
  {
    "category": "Pantry",
    "name": "Coconut Cream (Kara 1L box or 6 cans)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5013434_ea_000pns?name=coconut-cream"
  },
  {
    "category": "Fruit",
    "name": "Bananas 20kg Box",
    "scaling": "per_100_2days",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": null
  },
  {
    "category": "Pantry",
    "name": "Mayonaise 887ml",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5019637_ea_000pns?name=pams-whole-egg-mayonnaise"
  },
  {
    "category": "Fruit",
    "name": "Kiwifruit",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5039976_kgm_000pns?name=green-kiwifruit"
  },
  {
    "category": "Pantry",
    "name": "Cooking Oil 5L",
    "scaling": "per_100_2days",
    "baseQty": 1.5,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": null
  },
  {
    "category": "Pantry",
    "name": "Crushed Chilli 1kg",
    "scaling": "per_100_2days",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5002397_ea_000pns?name=crushed-chilli"
  },
  {
    "category": "Pantry",
    "name": "Fruit Salad",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5002252_ea_000pns?name=wattie's-fruit-salad-in-syrup"
  },
  {
    "category": "Pantry",
    "name": "Crushed Garlic 1kg",
    "scaling": "per_100_2days",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5001778_ea_000pns?name=crushed-garlic"
  },
  {
    "category": "Pantry",
    "name": "Peaches",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5002367_ea_000pns?name=wattie's-peach-slices-with-no-added-sugar"
  },
  {
    "category": "Pantry",
    "name": "Crushed Ginger 1kg",
    "scaling": "per_100_2days",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": null
  },
  {
    "category": "Pantry",
    "name": "Spaghetti",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 14.99,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5002612_ea_000pns?name=spaghetti-no-5-pasta"
  },
  {
    "category": "Pantry",
    "name": "Baked Beans",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5025408_ea_000pns?name=wattie's-baked-beans-in-tomato-sauce"
  },
  {
    "category": "Dairy",
    "name": "Yoghurt",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5219345_ea_000pns?name=full-cream-natural-yoghurt"
  },
  {
    "category": "Dairy",
    "name": "Cheese",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 8.49,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5025999_ea_000pns?name=tasty-cheese"
  },
  {
    "category": "Baking",
    "name": "Self Rising Flour",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 11.49,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5027519_ea_000pns?name=gluten-free-self-raising-flour"
  },
  {
    "category": "Dairy",
    "name": "Butter 500g",
    "scaling": "per_100_2days",
    "baseQty": 28,
    "unitPrice": 4.45,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5002843_ea_000pns?name=unsalted-butter"
  },
  {
    "category": "Baking",
    "name": "Plain Flour 5kg",
    "scaling": "per_100_2days",
    "baseQty": 8,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5002672_ea_000pns?name=high-grade-white-flour"
  },
  {
    "category": "Dairy",
    "name": "Cream 2lt",
    "scaling": "per_100_2days",
    "baseQty": 6,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5000524_ea_000pns?name=anchor-pure-cream"
  },
  {
    "category": "Baking",
    "name": "Sugar 5kg",
    "scaling": "per_100_2days",
    "baseQty": 4,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://paknsaveonline.co.nz/product/5003886_ea_000pns?name=white-sugar"
  },
  {
    "category": "Dairy",
    "name": "Milk 3lt",
    "scaling": "per_100_2days",
    "baseQty": 15,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5201490_ea_000pns?name=standard-milk"
  },
  {
    "category": "Baking",
    "name": "Brown Sugar",
    "scaling": "per_100_2days",
    "baseQty": 4,
    "unitPrice": 2.53,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5002763_ea_000pns?name=soft-brown-sugar"
  },
  {
    "category": "Dairy",
    "name": "Bread (Stuffing)",
    "scaling": "per_100_2days",
    "baseQty": 10,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5009506_ea_000pns?name=supersoft-white-toast-bread"
  },
  {
    "category": "Baking",
    "name": "Icing Sugar",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5002750_ea_000pns?name=icing-sugar"
  },
  {
    "category": "Dairy",
    "name": "Bread (Sandwiches)",
    "scaling": "per_100_2days",
    "baseQty": 20,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5026046_ea_000pns?name=original-sandwich-bread"
  },
  {
    "category": "Baking",
    "name": "Cocoa Powder",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5002772_ea_000pns?name=cocoa-powder"
  },
  {
    "category": "Baking",
    "name": "Cornflour",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5024311_ea_000pns?name=maize-cornflour"
  },
  {
    "category": "Frozen",
    "name": "Surimi 1KG",
    "scaling": "per_100_2days",
    "baseQty": 8,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5001091_ea_000pns?name=surimi-crab-flavoured-premium-salad-mix"
  },
  {
    "category": "Baking",
    "name": "Baking Powder",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5002652_ea_000pns?name=baking-powder"
  },
  {
    "category": "Frozen",
    "name": "Shrimps",
    "scaling": "per_100_2days",
    "baseQty": 5,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5253215_ea_000pns?name=kingfisher-seafood-cooked-and-peeled-shrimps"
  },
  {
    "category": "Baking",
    "name": "Custard Powder",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5002626_ea_000pns?name=custard-powder"
  },
  {
    "category": "Frozen",
    "name": "Goofy Cakes - Slab",
    "scaling": "per_100_2days",
    "baseQty": 4,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5011255_ea_000pns?name=goofy-chocolate-slab-cake"
  },
  {
    "category": "Baking",
    "name": "Yeast (12 pkt sachet)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://paknsaveonline.co.nz/product/5013488_ea_000pns?name=instant-dry-yeast"
  },
  {
    "category": "Frozen",
    "name": "Ice cream",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://paknsaveonline.co.nz/product/5031845_ea_000pns?name=vanilla-ice-cream"
  },
  {
    "category": "Baking",
    "name": "Mixed Herbs",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5026706_ea_000pns?name=naturals-mixed-herbs"
  },
  {
    "category": "Frozen",
    "name": "Mixed Vegetables",
    "scaling": "per_100_2days",
    "baseQty": 6,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5012124_ea_000pns?name=asian-stir-fry-mix"
  },
  {
    "category": "Baking",
    "name": "Curry Powder",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5003755_ea_000pns?name=hot-curry-powder"
  },
  {
    "category": "Frozen",
    "name": "Peas",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5003358_ea_000pns?name=garden-peas"
  },
  {
    "category": "Baking",
    "name": "Salt",
    "scaling": "per_100_2days",
    "baseQty": 1,
    "unitPrice": 1.93,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5007004_ea_000pns?name=plain-table-salt-seasoning"
  },
  {
    "category": "Baking",
    "name": "Pepper",
    "scaling": "per_100_2days",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5003751_ea_000pns?name=ground-black-pepper-seasoning"
  },
  {
    "category": "Cleaning",
    "name": "Toilet Paper 40PK",
    "scaling": "per_100_2days",
    "baseQty": 6,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5030695_ea_000pns?name=soft-white-2-ply-toilet-rolls"
  },
  {
    "category": "Other",
    "name": "Glad Wrap",
    "scaling": "per_100_2days",
    "baseQty": 4,
    "unitPrice": 4.99,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5002815_ea_000pns?name=cling-wrap-dispenser"
  },
  {
    "category": "Cleaning",
    "name": "Dishwash",
    "scaling": "per_100_2days",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://paknsaveonline.co.nz/product/5001221_ea_000pns?name=lemon-dishwashing-liquid"
  },
  {
    "category": "Other",
    "name": "Tin Foil",
    "scaling": "per_100_2days",
    "baseQty": 4,
    "unitPrice": 2.69,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5008207_ea_000pns?name=catering-foil-44cm-x-90m"
  },
  {
    "category": "Cleaning",
    "name": "Disinfectant",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 4.49,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5257100_ea_000pns?name=fresh-eucalyptus-antibacterial-disinfectant-multi-purpose-spray"
  },
  {
    "category": "Other",
    "name": "Baking Paper",
    "scaling": "per_100_2days",
    "baseQty": 2,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5040579_ea_000pns?name=baking-paper-300mm-wide"
  },
  {
    "category": "Cleaning",
    "name": "Jif Cleanser",
    "scaling": "per_100_2days",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5010055_ea_000pns?name=cream"
  },
  {
    "category": "Other",
    "name": "Muslin Cloth",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": null
  },
  {
    "category": "Cleaning",
    "name": "Toilet Cleaner",
    "scaling": "per_100_2days",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5221849_ea_000pns?name=marine-splash-fresh-power-toilet-cleaner"
  },
  {
    "category": "Cleaning",
    "name": "Hand Soap / Handwash",
    "scaling": "per_100_2days",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://paknsaveonline.co.nz/product/5001673_ea_000pns?name=pure-soap"
  },
  {
    "category": "Meat",
    "name": "Whole Chicken",
    "scaling": "per_100_2days",
    "baseQty": 20,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5007056_ea_000pns?name=whole-chicken"
  },
  {
    "category": "Cleaning",
    "name": "Rubbish Bags",
    "scaling": "per_100_2days",
    "baseQty": 2,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5023991_ea_000pns?name=draw-string-rubbish-bags-74cm-x-350cm"
  },
  {
    "category": "Meat",
    "name": "Mince",
    "scaling": "per_100_2days",
    "baseQty": 10,
    "unitPrice": null,
    "unit": "kg",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5101189_kgm_000pns?name=nz-premium-beef-mince"
  },
  {
    "category": "Cleaning",
    "name": "Goldilocks 2PK",
    "scaling": "per_100_2days",
    "baseQty": 4,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": null
  },
  {
    "category": "Meat",
    "name": "Sausages 4kg",
    "scaling": "per_100_2days",
    "baseQty": 4,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5107896_kgm_000pns?name=italian-sausages"
  },
  {
    "category": "Cleaning",
    "name": "Sink plug",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5002313_ea_000pns?name=universal-sink-plug"
  },
  {
    "category": "Meat",
    "name": "Bacon 1kg",
    "scaling": "per_100_2days",
    "baseQty": 7,
    "unitPrice": 7.29,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5110831_kgm_000pns?name=bacon-bones"
  },
  {
    "category": "Meat",
    "name": "Steak",
    "scaling": "per_100_2days",
    "baseQty": 15,
    "unitPrice": null,
    "unit": "kg",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5123919_kgm_000pns?name=nz-beef-sirloin-steak"
  },
  {
    "category": "Seafood",
    "name": "Fish Fillets (Carton)",
    "scaling": "per_100_2days",
    "baseQty": 2,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5229139_ea_000pns?name=frozen-classic-crumbed-fish-fillets"
  },
  {
    "category": "Meat",
    "name": "Pork",
    "scaling": "per_100_2days",
    "baseQty": 15,
    "unitPrice": null,
    "unit": "kg",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5112039_kgm_000pns?name=nz-trim-pork-pieces"
  },
  {
    "category": "Seafood",
    "name": "Mussels (Sack)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": null
  },
  {
    "category": "Meat",
    "name": "Ham (Sliced)",
    "scaling": "per_100_2days",
    "baseQty": 20,
    "unitPrice": 8.99,
    "unit": "",
    "paknsaveUrl": "https://paknsaveonline.co.nz/product/5110329_kgm_000pns?name=shaved-ham"
  },
  {
    "category": "Lollies & Treats",
    "name": "Barley sugars",
    "scaling": "fixed",
    "baseQty": 8,
    "unitPrice": 2.99,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5010518_ea_000pns?name=glucose-energy-barley-sugar-confectionery"
  },
  {
    "category": "Lollies & Treats",
    "name": "Marshmallows (big bag)",
    "scaling": "fixed",
    "baseQty": 3,
    "unitPrice": 3.69,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5036607_ea_000pns?name=marshmallow-confectionery"
  },
  {
    "category": "Lollies & Treats",
    "name": "Scroggin",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 4.51,
    "unit": "",
    "paknsaveUrl": null
  },
  {
    "category": "Lollies & Treats",
    "name": "Chippies (18 pkt)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 4.99,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/category/pantry/snack-foods/chips?pg=1"
  },
  {
    "category": "Pantry",
    "name": "Milo (biggest bag)",
    "scaling": "fixed",
    "baseQty": 2,
    "unitPrice": 7.49,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5008163_ea_000pns?name=milo-energy-drink"
  },
  {
    "category": "Pantry",
    "name": "Instant Coffee 90g",
    "scaling": "fixed",
    "baseQty": 2,
    "unitPrice": 1.89,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5206293_ea_000pns?name=instant-coffee-powder"
  },
  {
    "category": "Pantry",
    "name": "Instant noodles (10 pkt)",
    "scaling": "fixed",
    "baseQty": 2,
    "unitPrice": 5.59,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5011232_ea_000pns?name=chicken-2-minute-noodles"
  },
  {
    "category": "Pantry",
    "name": "White rice 5kg",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 11.29,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5003046_ea_000pns?name=australian-medium-grain-calrose-rice"
  },
  {
    "category": "Pantry",
    "name": "Jam (big jar)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 4.59,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5023198_ea_000pns?name=raspberry-jam"
  },
  {
    "category": "Pantry",
    "name": "Peanut butter (big jar)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 6.99,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5010740_ea_000pns?name=smooth-peanut-butter"
  },
  {
    "category": "Pantry",
    "name": "Pickle",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 2.89,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5037151_ea_000pns?name=rum-and-honey-pickled-onions"
  },
  {
    "category": "Baking",
    "name": "Biscuits",
    "scaling": "fixed",
    "baseQty": 8,
    "unitPrice": 1.41,
    "unit": "",
    "paknsaveUrl": "https://www.paknsaveonline.co.nz/product/5003311_ea_000pns?name=biscuits"
  },
  {
    "category": "Baking",
    "name": "Cabin bread",
    "scaling": "fixed",
    "baseQty": 2,
    "unitPrice": 1.89,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5005830_ea_000pns?name=breakfast-crackers"
  },
  {
    "category": "Baking",
    "name": "Muesli (10 pkt)",
    "scaling": "fixed",
    "baseQty": 2,
    "unitPrice": 2.49,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5017224_ea_000pns?name=hubbards-simply-fruit--nut-muesli"
  },
  {
    "category": "Baking",
    "name": "Yeast (jar)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 4.79,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5002662_ea_000pns?name=edmonds-all-purpose-active-yeast"
  },
  {
    "category": "Vegetables",
    "name": "Carrots 1.5kg",
    "scaling": "fixed",
    "baseQty": 2,
    "unitPrice": 2.5,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5039965_kgm_000pns?name=carrots"
  },
  {
    "category": "Vegetables",
    "name": "Kamokamo",
    "scaling": "fixed",
    "baseQty": 4,
    "unitPrice": 2.48,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5046473_ea_000nw?name=kamo-kamo"
  },
  {
    "category": "Meat",
    "name": "Ham",
    "scaling": "fixed",
    "baseQty": 3,
    "unitPrice": 8.99,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5320938_kgm_000pns?name=farmland-nz-boneless-glazing-leg-ham"
  },
  {
    "category": "Meat",
    "name": "Beef sausages (each)",
    "scaling": "fixed",
    "baseQty": 84,
    "unitPrice": 0.36,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5276265-ea-000?name=beard-brothers-old-school-beef-sausages"
  },
  {
    "category": "Meat",
    "name": "Whole pork",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": null
  },
  {
    "category": "Meat",
    "name": "Mutton",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5103795_kgm_000pns?name=nz-mutton-whole-leg"
  },
  {
    "category": "Cleaning",
    "name": "Sunlight soap bar (box)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 2.95,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5001673_ea_000pns?name=sunlight-pure-soap"
  },
  {
    "category": "Cleaning",
    "name": "Dishwashing liquid 2ltr",
    "scaling": "per_100_2days",
    "baseQty": 1,
    "unitPrice": 1.99,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5001221_ea_000pns?name=sunlight-lemon-dish-wash"
  },
  {
    "category": "Cleaning",
    "name": "Firelighters (24 pkt)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 3.36,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5013194_ea_000pns?name=firelighters"
  },
  {
    "category": "Cleaning",
    "name": "Tea towels (10 pkt)",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 11.78,
    "unit": "",
    "paknsaveUrl": null
  },
  {
    "category": "Other",
    "name": "Yellow Candles",
    "scaling": "fixed",
    "baseQty": 2,
    "unitPrice": 4.29,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5002808_ea_000pns?name=national-candle-table-candles"
  },
  {
    "category": "Other",
    "name": "Matches",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": 0.61,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5254074_ea_000pns?name=samba-safety-matches"
  },
  {
    "category": "First Aid",
    "name": "Claratyne",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5220673_ea_000pns?name=antihistamines-tablets-10mg"
  },
  {
    "category": "First Aid",
    "name": "Insect repellent",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5018642_ea_000pns?name=off-tropical-strength-insect-repellent-spray"
  },
  {
    "category": "First Aid",
    "name": "Sunscreen",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5200499_ea_000pns?name=nivea-sun-protect--moisture-sunscreen-spf50%2B"
  },
  {
    "category": "First Aid",
    "name": "Pamol",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": null
  },
  {
    "category": "First Aid",
    "name": "Savlon cream",
    "scaling": "fixed",
    "baseQty": 1,
    "unitPrice": null,
    "unit": "",
    "paknsaveUrl": "https://www.paknsave.co.nz/shop/product/5026438_ea_000pns?name=savlon-wound-cleansing-cream-antiseptic"
  }
];
