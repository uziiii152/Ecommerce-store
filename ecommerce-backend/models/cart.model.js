import { mongoose,Schema} from 'mongoose'


const cartSchema =new Schema({
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
      quantity: Number
    }]
    
},{
  timestamps:true
})

const Cart = mongoose.model('Cart',cartSchema)
export default Cart;

