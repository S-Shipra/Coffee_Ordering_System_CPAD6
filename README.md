# ☕ Brew & Bean: Coffee Ordering App

A cross-platform coffee shop ordering application built with **React Native** and **Expo**. A single JavaScript/React codebase runs on both **Android** and **iOS**, rendering real native UI components on each platform.

Developed as part of the Cross-Platform Application Development (CPAD) course, Experiment 6.

---

## 📱 Features

- **Menu browsing:** scrollable list of drinks and desserts with photos, prices, and ratings
- **Live search and category filter:** filter by All, Hot, Cold, or Dessert, and combine it with the search bar
- **Drink details:** choose a size (S/M/L), add extras (extra shot, oat milk, caramel drizzle), set the quantity, and mark favourites
- **Live price calculation:** the total updates instantly as options change
- **Shopping cart:** change quantities, remove items, clear the cart, and see a live item-count badge
- **Promo code:** enter `COFFEE10` for 10% off
- **Tax and totals:** subtotal, discount, 5% tax, and final total
- **Order tracker:** a timer-driven progress screen from *Order received* to *Ready for pickup*
- **Haptic feedback:** vibration on add to cart, promo applied, and order ready (physical devices only)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React Native | Cross-platform native UI |
| Expo | Toolchain, dev server, Expo Go |
| React Navigation (Native Stack) | Screen navigation |
| React Context API | Shared cart state |
| expo-haptics | Native vibration feedback |
| @expo/vector-icons | Icons |

---

## 🧠 Concepts Demonstrated

| Concept | Where it is used |
|---|---|
| Components | `DrinkCard`, `CartItem`, `CategoryChip`, and all four screens |
| Props | `drink`, `onPress`, `active`, `item`, `onIncrease`, `onDecrease`, `onRemove` |
| State (`useState`) | Category, search text, size, extras, quantity, promo code, order stage |
| Event handling | `onPress`, `onChangeText` |
| `useEffect` with cleanup | Order progress timer on the confirmation screen |
| Context API | `CartContext` shared across screens |
| Styling and Flexbox | `StyleSheet.create` in every file |
| Navigation | Stack navigator: Menu → Detail → Cart → Confirm, with route params |
| Lists | `FlatList` for the menu and the cart |
| Native module | `expo-haptics` |
| Conditional rendering | Empty cart, discount line, disabled button, photo/emoji fallback |

---

## 📂 Project Structure

```
├── App.js                  # Entry point: cart provider + navigator
├── package.json            # Dependencies and scripts
├── assets/                 # Drink photos and app icons
├── components/
│   ├── CartItem.js         # Single row in the cart
│   ├── CategoryChip.js     # Filter chip (All / Hot / Cold / Dessert)
│   └── DrinkCard.js        # Menu card for a drink
├── context/
│   └── CartContext.js      # Shared cart state and actions
├── data/
│   └── drinks.js           # Hardcoded menu, categories, size prices
└── screens/
    ├── MenuScreen.js       # Search, filters, drink list
    ├── DetailScreen.js     # Size, extras, quantity, add to cart
    ├── CartScreen.js       # Cart, promo code, totals
    └── ConfirmScreen.js    # Order progress tracker
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Visual Studio Code](https://code.visualstudio.com/) (or any editor)
- A free [Expo account](https://expo.dev/signup)
- **Expo Go** on your phone (App Store / Play Store), and/or an **Android Studio** emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/S-Shipra/Coffee_Ordering_System_CPAD6.git

# Move into the project folder
cd Coffee_Ordering_System_CPAD6

# Install dependencies
npm install

# Sign in to Expo (required by recent versions of Expo Go)
npx expo login

# Start the development server
npx expo start
```

### Run on iPhone

1. Install **Expo Go** from the App Store and sign in with your Expo account.
2. Make sure the phone and the laptop are on the **same Wi-Fi network**.
3. Scan the QR code shown in the terminal using the Camera app.

If the connection fails (for example, on college Wi-Fi), use `npx expo start --tunnel` or connect through your phone's hotspot.

### Run on Android emulator

1. Install **Android Studio** and create a virtual device (for example, Pixel 6) in **Device Manager**.
2. Set the `ANDROID_HOME` environment variable and add the SDK's `platform-tools` folder to your PATH.
3. Start the emulator and wait for the home screen.
4. Run `npx expo start` and press **`a`** in the terminal. Expo installs Expo Go on the emulator and opens the app.

> Haptic feedback has no effect on the emulator because it has no vibration motor.

---

## 🧾 How the Pricing Works

```
Unit price = base price + size surcharge (S: ₹0, M: ₹40, L: ₹80) + extras
Line total = unit price × quantity
Subtotal   = sum of all line totals
Discount   = 10% of subtotal (with code COFFEE10)
Tax        = 5% of (subtotal − discount)
Total      = subtotal − discount + tax
```

Desserts have a single size and no extras.

---

## 📸 Screenshots

| Screen | iOS | Android |
|---|---|---|
| Menu | ![](screenshots/ios-menu.png) | ![](screenshots/android-menu.png) |
| Detail | ![](screenshots/ios-detail.png) | ![](screenshots/android-detail.png) |
| Cart | ![](screenshots/ios-cart.png) | ![](screenshots/android-cart.png) |
| Order tracker | ![](screenshots/ios-confirm.png) | ![](screenshots/android-confirm.png) |

*(Add your screenshots to a `screenshots/` folder with these names, or edit the paths above.)*

---

## 🔑 Key Takeaway

React Native does not wrap a website in a web view. It maps components such as `View`, `Text`, and `Image` to real native widgets on each platform. This single codebase therefore delivers a native-quality app on both Android and iOS, reducing development time, cost, and maintenance effort.

---

## 👩‍💻 Author

**S. Shipra**
GitHub: [@S-Shipra](https://github.com/S-Shipra)
