import express from 'express'
import { signIn, signUp } from '../controller/user.controller.js';
import { addProduct, getProduct } from '../controller/product.controller.js';
import { verifyToken } from '../middleware.js/authMiddleware.js';
import { addToCart, getCartItems } from '../controller/cart.controller.js';
import { orderCheckout } from '../controller/order.controller.js';



const router = express.Router()


router.post('/sign-up',signUp)
router.post('/sign-in',signIn)
router.post('/products',verifyToken,addProduct)
router.get('/products',verifyToken,getProduct)
router.post('/addtoCart', verifyToken, addToCart);
router.get('/addtoCart', verifyToken, getCartItems);
router.post('/orderCheckout', verifyToken, orderCheckout);

export default router;