import { connectDb } from '../Db/configDb.js'
import Order from "../models/order.model.js";
import Cart from '../models/cart.model.js';



export const orderCheckout = async (req,res) => {

    await connectDb();

    
    
    
      const userId = req.user._id;
    
      try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
    
        if (!cart || cart.items.length === 0) {
          return res.status(400).json({ success: false, message: 'Cart is empty' });
        }
    
        // Calculate totalAmount
        let totalAmount = 0;
    
        for (let item of cart.items) {
          if (!item.product) {
            return res.status(400).json({ success: false, message: 'One or more products not found' });
          }
    
         
    
          totalAmount += item.product.price * item.quantity;
    
          // Reduce stock
          item.product.stock -= item.quantity;
          await item.product.save();
        }
    
        // Create Order
        const orderItems = cart.items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity
        }));
    
        const order = new Order({
          user: userId,
          items: orderItems,
          totalAmount,
          status: 'pending'
        });
    
        await order.save();
    
        // Clear cart
        cart.items = [];
        await cart.save();
    
        return res.status(201).json({
          success: true,
          message: 'Order placed successfully',
          data: order
        });
    
      } catch (error) {
        console.error('Error checking out:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
    };
    
