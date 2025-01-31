import * as orders from '../data/orderData.js';
const MIN_ORDER_PRICE = 2000;

const getOrders = (req, res) => res.json(orders.getOrders());

const addToCart = (req, res) => {
  orders.addToCart(req.body.userId, req.body.product);
  res.json({ message: "Product added to cart" });
};
const deleteCart = (req, res) => {
    const userId = req.params.userId;
    const result = orders.deleteCart(userId);
    res.json(result);
};

const checkout = (req, res) => {
  const result = orders.checkout(req.body.userId, MIN_ORDER_PRICE);
  console.log(result);
  
  if (result.error) return res.status(400).json({ message: result.error });
  res.json({ message: "Order placed successfully" });
};

export { getOrders, addToCart, checkout,deleteCart };
