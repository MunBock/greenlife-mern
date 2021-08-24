# greenlife-mern

> An e-Restaurant (online food ordering) application built with the MERN stack and Redux.
> [Live demo](https://greenlife-mern.herokuapp.com/)

## Features

- Product slideshow 
- User's order review (Review your own orders)
- Admin order management (Review all user's orders)
- Checkout flow (Shopping cart, delivery address, payment method)


### Live demo login

```
user_1@gmail.com (User)
123456

user_2@gmail.com (Admin)
123456
```

### Setup (frontend & backend)

```
npm i
cd frontend
npm i
```

### Environment setting

Create a .env file in the root (outside the folders of frontend and backend)
and copy the following below then paste into .env file (custom your own if you want)

```
NODE_ENV = development
PORT = 4000
MONGO_URI = mongodb://localhost/greenlife
JWT_SECRET = 1234
```

### Run application

```
npm run dev
```
