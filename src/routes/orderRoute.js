import express from 'express';
import { getOrders, addToCart, checkout,deleteCart } from '../controllers/orderController.js';
import { validateCart } from '../middlewares/cartMiddleware.js';

const router = express.Router();

router.get('/', getOrders);
router.post('/cart', validateCart, addToCart);
router.post('/checkout', checkout);
router.delete('/cart/:userId', deleteCart);

export default router;
