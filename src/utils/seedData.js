/**
 * Seed Script - Run with: node src/utils/seedData.js
 * 
 * This script populates your Firebase Firestore "menuItems" collection
 * with sample food items. Make sure to update firebase config first!
 */

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

// ⚠️ Replace with your own Firebase config (same as in src/config/firebase.js)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const menuItems = [
  {
    name: "Margherita Pizza",
    description:
      "Classic pizza with fresh mozzarella, tomato sauce, and basil on a crispy thin crust.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400",
    category: "Pizza",
    rating: 4.8,
  },
  {
    name: "Pepperoni Pizza",
    description:
      "Loaded with spicy pepperoni, melted cheese, and our signature tomato sauce.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
    category: "Pizza",
    rating: 4.7,
  },
  {
    name: "BBQ Chicken Pizza",
    description:
      "Smoky BBQ sauce, grilled chicken, red onions, and cilantro on a hand-tossed crust.",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    category: "Pizza",
    rating: 4.6,
  },
  {
    name: "Classic Cheeseburger",
    description:
      "Juicy beef patty with cheddar cheese, lettuce, tomato, and special sauce.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    category: "Burger",
    rating: 4.5,
  },
  {
    name: "Double Bacon Burger",
    description:
      "Two smashed patties, crispy bacon, American cheese, pickles, and smoky mayo.",
    price: 13.49,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400",
    category: "Burger",
    rating: 4.9,
  },
  {
    name: "Veggie Burger",
    description:
      "Plant-based patty with avocado, sprouts, tomato, and herb aioli on a brioche bun.",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1520072959219-c595e6cdc07a?w=400",
    category: "Burger",
    rating: 4.3,
  },
  {
    name: "Salmon Nigiri",
    description:
      "Fresh Atlantic salmon slices on perfectly seasoned sushi rice. Set of 6 pieces.",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
    category: "Sushi",
    rating: 4.8,
  },
  {
    name: "Dragon Roll",
    description:
      "Shrimp tempura roll topped with avocado, eel sauce, and sesame seeds.",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400",
    category: "Sushi",
    rating: 4.7,
  },
  {
    name: "Chocolate Lava Cake",
    description:
      "Warm molten chocolate cake with a gooey center, served with vanilla ice cream.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400",
    category: "Dessert",
    rating: 4.9,
  },
  {
    name: "Tiramisu",
    description:
      "Classic Italian dessert with layers of espresso-soaked ladyfingers and mascarpone cream.",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
    category: "Dessert",
    rating: 4.6,
  },
  {
    name: "Mango Smoothie",
    description:
      "Refreshing blend of ripe mangoes, yogurt, and a touch of honey. Served chilled.",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400",
    category: "Drinks",
    rating: 4.4,
  },
  {
    name: "Iced Matcha Latte",
    description:
      "Premium Japanese matcha whisked with milk over ice. Smooth and energizing.",
    price: 6.49,
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400",
    category: "Drinks",
    rating: 4.5,
  },
];

async function seedDatabase() {
  console.log("🌱 Seeding Firestore with menu items...\n");

  for (const item of menuItems) {
    try {
      const docRef = await addDoc(collection(db, "menuItems"), item);
      console.log(`  ✅ Added: ${item.name} (ID: ${docRef.id})`);
    } catch (error) {
      console.error(`  ❌ Failed to add ${item.name}:`, error.message);
    }
  }

  console.log("\n🎉 Seeding complete! Your menu is ready.");
  process.exit(0);
}

seedDatabase();
