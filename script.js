"use strict";

// Task 2

// 1. Retrieves user, product and shopping cart data

// Retrieve user data
const getUserData = async () => {
  const response = await fetch("https://fakestoreapi.com/users");
  const users = await response.json();
  return users;
};

// Retrieve product data
const getProductData = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  return products;
};

// Retrieve shopping cart data
const getCartData = async () => {
  const response = await fetch(
    "https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07"
  );
  const carts = await response.json();
  return carts;
};

// Show data from promises
getUserData().then((data) => console.log("Users:", data));
getProductData().then((data) => console.log("Products:", data));
getCartData().then((data) => console.log("Shopping carts:", data));

// 2. Creates a data structure containing all available product categories and the total value of
// products of a given category

const getCategories = async () => {
  const products = await getProductData();
  const categories = {};

  products.forEach((product) => {
    if (product.category in categories) {
      categories[product.category] += product.price;
    } else {
      categories[product.category] = product.price;
    }
  });

  return categories;
};

getCategories().then((obj) => console.log(obj));
