import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ordersFile = path.resolve(__dirname, "../data/order.json");
console.log(path.resolve(ordersFile));

const getOrders = () => JSON.parse(fs.readFileSync(ordersFile));

const addToCart = (userId, product) => {
  let orders = getOrders();
  let userCart = orders.find(
    (order) => order.userId === userId && !order.checkedOut
  );

  if (!userCart) {
    userCart = { userId, cart: [], checkedOut: false };
    orders.push(userCart);
  }

  userCart.cart.push(product);
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
};

const deleteCart = (userId) => {
    let orders = getOrders();
    
    orders = orders.filter(order => !(order.userId === userId && !order.checkedOut));
    
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
    return { message: 'Cart deleted successfully' };
};

const checkout = (userId, minOrderPrice) => {
  let orders = getOrders();
  let userCart = orders.find(
    (order) => order.userId === userId && !order.checkedOut
  );

  if (!userCart) return { error: "Cart is empty" };

  const totalPrice = userCart.cart.reduce((sum, item) => {
    if (typeof item.price !== 'number' || typeof item.item !== 'number') {
      throw new Error(`Invalid price or item count for item: ${JSON.stringify(item)}`);
    }
    return sum + (item.price * item.item);
  }, 0);
  console.log(totalPrice);

  if (totalPrice > minOrderPrice)
    return { error: `Minimum order price is ${minOrderPrice}` };

  userCart.checkedOut = true;
  userCart.totalPrice = totalPrice; // Add totalPrice to the order
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

  return { success: true, totalPrice };
};

export { getOrders, addToCart, checkout, deleteCart };
