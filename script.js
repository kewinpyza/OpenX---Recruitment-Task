"use strict";

// Task 2

// 1. Retrieves user, product and shopping cart data

// Retrieve user data
const getUserData = async () => {
  const response = await fetch("https://fakestoreapi.com/users");
  const data = await response.json();
  return data;
};

// Retrieve product data
const getProductData = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
};

// Retrieve shopping cart data
const getCartData = async () => {
  const response = await fetch(
    "https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07"
  );
  const data = await response.json();
  return data;
};

// Show data from promises
getUserData().then((data) => console.log("Point 1, Users:", data));
getProductData().then((data) => console.log("Point 1, Products:", data));
getCartData().then((data) => console.log("Point 1, Shopping carts:", data));

// 2. Creates a data structure containing all available product categories and the total value of
// products of a given category

const getCategories = async () => {
  const products = await getProductData();
  const categories = {};

  for (const product of products) {
    if (!categories[product.category]) {
      categories[product.category] = product.price;
    } else {
      categories[product.category] += product.price;
    }
  }

  return categories;
};

getCategories().then((obj) => console.log("Point 2:", obj));

// 3. Finds a cart with the highest value, determines its value and full name of its owner

async function getHighestCartValue() {
  const users = await getUserData();
  const carts = await getCartData();
  const products = await getProductData();

  const cartValues = carts.map((cart) => {
    const owner = users.find((user) => user.id === cart.userId);
    const fullName = `${
      owner.name.firstname[0].toUpperCase() + owner.name.firstname.slice(1)
    } ${owner.name.lastname[0].toUpperCase() + owner.name.lastname.slice(1)}`;
    const cartValue = cart.products.reduce((totalValue, cartProduct) => {
      const product = products.find((p) => p.id === cartProduct.productId);
      return totalValue + product.price * cartProduct.quantity;
    }, 0);
    return { id: cart.id, owner: fullName, value: cartValue };
  });

  const highestValueCart = cartValues.reduce((a, b) =>
    a.value > b.value ? a : b
  );
  const ownerWithHighestValue = highestValueCart.owner;
  const highestValue = highestValueCart.value;
  const highestCartId = highestValueCart.id;

  return {
    cartId: highestCartId,
    owner: ownerWithHighestValue,
    value: highestValue,
  };
}

getHighestCartValue().then((data) => console.log("Point 3:", data));

// 4. Finds the two users living furthest away from each other
// Inspired by: https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
// and https://en.wikipedia.org/wiki/Haversine_formula

const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  // Haversine formula
  const a =
    0.5 -
    Math.cos(dLat) / 2 +
    (Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      (1 - Math.cos(dLng))) /
      2;

  return R * 2 * Math.asin(Math.sqrt(a));
};

const getFurthestUsers = async () => {
  const users = await getUserData();
  let maxDistance = 0;
  let furthestUsers;

  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const distance = getDistance(
        users[i].address.geolocation.lat,
        users[i].address.geolocation.long,
        users[j].address.geolocation.lat,
        users[j].address.geolocation.long
      );

      if (distance > maxDistance) {
        maxDistance = distance;
        furthestUsers = [users[i], users[j]];
      }
    }
  }

  return { users: furthestUsers, distanceInKM: `${maxDistance.toFixed(3)}` };
};

getFurthestUsers().then((data) => console.log("Point 4:", data));
