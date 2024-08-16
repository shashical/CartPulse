# CartPulse E-Commerce Web Application

CartPulse is an e-commerce web application developed using the MERN stack (MongoDB, Express, React, Node.js). The project focuses on providing a seamless shopping experience for customers, incorporating essential features such as product browsing, cart management, comprehensive checkout, and order history tracking.

## Live Deployment (Demo)

The app is live and accessible at [https://cartpulse.onrender.com](https://cartpulse.onrender.com)

## Features

- User Registration: Users can sign up using their email IDs (which are first validated through ZeroBounce API) to access the app's features.
- Home Page: The home page displays all available products for users to browse and purchase.
- Cart Page: Users can view and edit their selected items in the cart and also view the corresponding subtotal before proceeding to checkout.
- Checkout: Users enter their shipping address and review the order summary (including the grand total) before placing an order.
- Payment: Sandbox PayPal payment processing is integrated using `@paypal/react-paypal-js` package.
- Payment Summary: Users can view payment summaries for each order placed.
- Order History: Users have access to their order history to track previous purchases.

## Run Locally

### 1. Clone repo

```
$ git clone https://github.com/shashical/CartPulse.git
```

### 2. Create .env File

- In the root of the backend folder, create a .env file and set your values for JWT_SECRET, MONGODB_URI and PAYPAL_CLIENT_ID.
- Similarly, in the root of the frontend folder, create a .env file and set your value for REACT_APP_ZEROBOUNCE_API_KEY.

### 3. Setup MongoDB

- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)
  - In .env file update MONGODB_URI=mongodb://localhost/CartPulse
- OR Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - In .env file, update MONGODB_URI=mongodb+srv://your-db-connection

### 4. Setup PayPal

- PayPal client ID can be obtained from [https://developer.paypal.com/developer/applications/](https://developer.paypal.com/developer/applications/)
- In .env file, update PAYPAL_CLIENT_ID with that value.

### 5. Setup ZeroBounce

- Sign up on ZeroBounce [here](https://www.zerobounce.net/members/signin/register)
- Get your API key from the "API" section and set REACT_APP_ZEROBOUNCE_API_KEY to that value in the .env file.

### 4. Run Backend

```
$ cd backend
$ npm install
$ npm start
```

### 5. Run Frontend

```
# open new terminal
$ cd frontend
$ npm install
$ npm start
```

### 6. Seed users and products

- Run this on browser: http://localhost:5000/api/seed
- It seeds and returns sample users and products.

### 7. Login

- Run http://localhost:3000/signin
- Enter user email and password that you obtained in the previous step and click signin.

## Author

- [@shashical](https://github.com/shashical)
