
![Preview](https://res.cloudinary.com/djfem14lf/image/upload/v1751992945/Screenshot_2025-07-08_094049_sehbai.png)


# MERN Grocery Delivery
A full-stack grocery delivery web application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Vite for the frontend. This project allows users to browse products, manage their cart, place orders, and sellers to manage their products and orders.

---

## Features

### User Side
- User authentication and profile management
- Browse products by categories
- Product details and search
- Add/remove products to cart
- Address management
- Place and track orders

### Seller Side
- Seller authentication
- Add, edit, and remove products
- View and manage orders

---

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js, MongoDB (via Mongoose)
- **Other:** Cloudinary (image uploads), Stripe (payments), Nodemailer (emails), JWT (authentication)

---

## Project Structure

```
Mern Grocery Delivery/
├── client/           # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components (Home, Cart, Orders, Seller, etc.)
│   │   ├── context/         # React context for state management
│   │   └── assets/          # Images and static assets
│   └── ...
├── server/           # Express backend
│   ├── config/       # DB, Cloudinary, Multer, Nodemailer configs
│   ├── controller/   # Route controllers (business logic)
│   ├── midllewares/  # Auth middlewares
│   ├── models/       # Mongoose models (User, Product, Order, etc.)
│   ├── routes/       # Express routes
│   └── uploads/      # Uploaded images
└── ...
```

---

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd "Mern Grocery Delivery"
   ```

2. **Install dependencies:**
   - For the backend:
     ```sh
     cd server
     npm install
     ```
   - For the frontend:
     ```sh
     cd ../client
     npm install
     ```

3. **Set up environment variables:**
   - Create a `.env` file in the `server/` directory with your MongoDB URI, JWT secret, Cloudinary, Stripe, and email credentials.

4. **Run the backend server:**
   ```sh
   cd server
   npm run server
   ```

5. **Run the frontend app:**
   ```sh
   cd client
   npm run dev
   ```

---

## API Endpoints (Backend)
- `/api/user` - User operations
- `/api/seller` - Seller operations
- `/api/product` - Product CRUD
- `/api/cart` - Cart management
- `/api/address` - Address management
- `/api/order` - Order management

---

## License
This project is licensed under the MIT License.
