import { connectDb } from "../Db/configDb.js";
import Product from "../models/product.model.js";


export const getProduct = async(req,res) => {
    await connectDb();

try {
    const products = await Product.find(); 
    if (products.length === 0) {
        return res.status(404).json({ success:false,message:"No products found" });
    }
    res.json({ products });
} catch (error) {
    return res.status(500).json({ success:false,message:"Error fetching products",error: error.message });
}
}


export const addProduct = async (req,res) =>{
    try {

        await connectDb();

        const {title,price,description,imageUrl,category,stock} = req.body

        if (!title || !price || !description || !imageUrl || !category || !stock) {
            return res.status(409).json({
                success: true,
                message:'enter all the fields'
            })
        }

        const newProduct = await Product.create({title,price,description,imageUrl,category,stock})

        if (!newProduct) {
            return res.status(409).json({error:'No product added'})
        }

        return res.status(201).json({
            success: true,
            message:'Product added successfully',
            product: newProduct
        })
    } catch (error) {
        return res.status(409).json({
            success: false,
            message:'something went wrong',
            error:error
        })
    }
}