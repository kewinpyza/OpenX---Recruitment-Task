const {
  getUserData,
  getProductData,
  getCartData,
  getCategories,
  getHighestCartValue,
  getFurthestUsers,
} = require("./script.js");

describe("Task 2", () => {
  test("getUserData should retrieve an array of users data", async () => {
    const usersData = await getUserData();
    expect(Array.isArray(usersData)).toBe(true);
    expect(usersData.length).toBeGreaterThan(0);
  });

  test("getProductData should retrieve an array of products data", async () => {
    const productsData = await getProductData();
    expect(Array.isArray(productsData)).toBe(true);
    expect(productsData.length).toBeGreaterThan(0);
  });

  test("getCartData should retrieve an array of shopping carts data", async () => {
    const cartsData = await getCartData();
    expect(Array.isArray(cartsData)).toBe(true);
    expect(cartsData.length).toBeGreaterThan(0);
  });

  test("getCategories should return an object with the total value of each category", async () => {
    const categories = await getCategories();
    expect(categories).toHaveProperty("men's clothing");
    expect(categories).toHaveProperty("women's clothing");
    expect(categories).toHaveProperty("jewelery");
    expect(categories).toHaveProperty("electronics");
  });

  test("getHighestCartValue should return an object with the owner and value of the highest value cart", async () => {
    const highestCart = await getHighestCartValue();
    expect(typeof highestCart).toBe("object");
    expect(highestCart).toHaveProperty("cartId");
    expect(highestCart).toHaveProperty("owner");
    expect(highestCart).toHaveProperty("value");
  });

  test("getFurthestUsers should return an object with the two furthest users and their distance apart", async () => {
    const furthestUsers = await getFurthestUsers();
    expect(typeof furthestUsers).toBe("object");
    expect(furthestUsers).toHaveProperty("users");
    expect(furthestUsers.users.length).toBe(2);
    expect(furthestUsers).toHaveProperty("distanceInKM");
    expect(parseFloat(furthestUsers.distanceInKM)).toBeGreaterThan(0);
  });
});
