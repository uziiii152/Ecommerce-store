import Cart from "../models/cart.model.js";
import { connectDb } from '../Db/configDb.js'
import Product from "../models/product.model.js";

export const getCartItems = async (req, res) => {
  try {
    await connectDb();
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      return res.status(200).json({ items: [] }); // return empty cart
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error getting cart:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const addToCart = async (req,res) => {

    await connectDb()
  let {productId,quantity} = req.body

  const userId = req.user._id

 



  try {

    const product = await Product.findById(productId)


  if(product.stock < quantity){
     return res.status(409).json({success: false, message:"no more stock"})
  }


  // check whether quantity is less than 1 or string


  if ( quantity < 1) {
    return res.status(400).json({ success: false, message: "Invalid quantity" });
  }


  product.stock -= quantity
  await product.save()

  
 
  quantity = Number(quantity)

 
   


   let cart =  await Cart.findOne({user:userId})

   if(!cart){
    cart = new Cart({
        user: userId,
        items: [{product:productId,quantity}]
    })
   }else{
    const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
    )

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity
    }
    else{
        cart.items.push({product:productId,quantity})
    }
   }

   await cart.save()

 return res.status(201).json({
    success: true,
    message: "Item added to cart",
    data:cart
 })


  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
