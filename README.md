# 🍽️ Mini Food Ordering App with React Native & Firebase

A beautiful, production-ready food ordering mobile app built with **React Native (Expo)** and **Firebase Firestore**, featuring a premium UI design system called **"The Culinary Curator"**.

## ✨ Features

- 📱 **React Native (Expo)** — Cross-platform mobile app (iOS/Android)
- 🔥 **Firebase Firestore** — Real-time database for menu items & orders
- 🎨 **Premium Design System** — "The Culinary Curator" with custom fonts, colors, and spacing
- 🔍 **Search & Filter** — Find food by name or category (Pizza, Burger, Sushi, Dessert, Drinks)
- 🛒 **Shopping Cart** — Add/remove items, adjust quantities
- 💳 **Order Summary** — Review items, delivery address, payment method, and price breakdown
- ✅ **Order Confirmation** — Success screen with order ID and estimated delivery time
- 🌗 **Responsive UI** — Beautiful mobile-first design with glassmorphic elements
- ⚡ **Real-time Sync** — Live updates from Firestore
- 📊 **Error Handling** — Graceful error states with retry functionality
- 💾 **State Management** — Context API with reducer pattern for cart management

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16+)
- **npm** or **yarn**
- **Expo CLI** (install with `npm install -g expo-cli`)
- **Firebase Account** (free tier available at [firebase.google.com](https://firebase.google.com))

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/FoodOrderApp.git
cd FoodOrderApp
npm install
```

### 2. Set Up Firebase
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database (start in test mode)
3. Go to **Project Settings** → Copy your web app config
4. Update `src/config/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

5. Also update `src/utils/seedData.js` with the same config

### 3. Populate Sample Data
```bash
node src/utils/seedData.js
```

This will add 12 food items (pizzas, burgers, sushi, desserts, drinks) to your Firestore database.

### 4. Run the App
```bash
npx expo start
```

- **iOS**: Press `i` in terminal
- **Android**: Press `a` in terminal
- **Web**: Press `w` in terminal
- **Mobile**: Scan QR code with camera and open in Expo Go app

## 📁 Project Structure

```
FoodOrderApp/
├── App.js                          # Entry point with navigation
├── package.json                    # Dependencies
├── src/
│   ├── config/
│   │   ├── firebase.js             # Firebase configuration
│   │   └── theme.js                # Design system tokens
│   ├── context/
│   │   └── CartContext.js           # Cart state management
│   ├── screens/
│   │   ├── HomeScreen.js            # Menu/home screen
│   │   ├── CartScreen.js            # Shopping cart
│   │   └── OrderSummaryScreen.js    # Order review & success
│   ├── components/
│   │   ├── FoodItem.js              # Food card component
│   │   ├── CartItem.js              # Cart item row
│   │   ├── LoadingSpinner.js        # Loading state
│   │   └── ErrorView.js             # Error state
│   └── utils/
│       └── seedData.js              # Database seeding script
```

## 🎨 Design System: "The Culinary Curator"

This app uses a premium design system with:

- **Colors**: `#FF6B35` (warm orange primary), `#f8f5ff` (cream background)
- **Fonts**: Plus Jakarta Sans (headlines) + Be Vietnam Pro (body)
- **Roundness**: Fully rounded buttons & chips (`borderRadius: 9999`)
- **Surfaces**: Tonal layering (no borders) with ambient shadows
- **Spacing**: Generous 20px gutters with 6-tier spacing scale
- **Elevation**: Glassmorphic floating bars with soft shadows

All design decisions documented in `src/config/theme.js` and the Stitch design project.

## 📱 Screens

### 🏠 Home Screen
- Real-time menu items from Firestore
- Search functionality
- Category filtering
- Pull-to-refresh
- Loading & error states

### 🛒 Cart Screen
- List of selected items
- Quantity adjustment
- Remove items
- Subtotal + delivery fee calculation
- Floating bottom bar with total

### 📋 Order Summary
- Delivery address
- Order items review
- Payment method selector
- Price breakdown (subtotal, tax, delivery)
- Place order button

### ✅ Order Success
- Success confirmation with order ID
- Estimated delivery time
- Back to menu link

## 🔥 Firebase Integration

### Firestore Collections

**`menuItems`** (auto-populated by seed script)
```javascript
{
  id: string,
  name: string,
  description: string,
  price: number,
  image: string (URL),
  category: string,
  rating: number
}
```

**`orders`** (created when user places order)
```javascript
{
  items: Array<{id, name, price, quantity, image}>,
  subtotal: number,
  deliveryFee: number,
  tax: number,
  total: number,
  status: "confirmed",
  createdAt: timestamp
}
```

## 🛠️ Technologies Used

- **React Native** — Cross-platform mobile framework
- **Expo** — Managed React Native platform
- **Firebase/Firestore** — Cloud database & real-time sync
- **React Navigation** — Screen navigation (Stack Navigator)
- **Context API** — State management
- **Expo Google Fonts** — Plus Jakarta Sans & Be Vietnam Pro
- **Ionicons** — Icon library

## 📝 Available Scripts

- `npm start` — Start Expo dev server
- `npm run android` — Run on Android emulator
- `npm run ios` — Run on iOS simulator
- `npm run web` — Run in browser
- `npm run seed` — Populate Firestore with sample data

## 🚀 Deployment

### Firebase Hosting (Free)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Expo (OTA Updates)
```bash
eas build --platform ios
eas build --platform android
```

See [Expo docs](https://docs.expo.dev/build/setup/) for detailed instructions.

## 🎯 What's Next?

- [ ] Add user authentication (Firebase Auth)
- [ ] Implement real payment processing (Stripe/PayPal)
- [ ] Add order tracking screen
- [ ] Create admin dashboard
- [ ] Push notifications for order updates
- [ ] Wishlist/favorites feature
- [ ] User reviews & ratings
- [ ] Multi-language support

## 📄 License

MIT License — Feel free to use this project as a template!

## 👨‍💻 Author

Built with ❤️ for the Olcademy Internship Program

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ❓ Need Help?

- Check [Expo docs](https://docs.expo.dev)
- See [Firebase docs](https://firebase.google.com/docs)
- Review [React Native docs](https://reactnative.dev)

---

**Happy coding! 🚀 Bon appétit! 🍽️**
