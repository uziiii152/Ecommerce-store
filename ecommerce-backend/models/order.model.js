import mongoose, { Schema } from "mongoose";

const orderScehma = new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
          }
          ,
        quantity:Number
    }],
    totalAmount:Number,
    status:{
        type:String,
        enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
        default:'pending'
    }
},{
    timestamps:true
})


const Order = mongoose.model('Order',orderScehma)
export default Order;