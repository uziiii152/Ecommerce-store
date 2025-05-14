import { mongoose,Schema} from 'mongoose'


const productSchema =new Schema({
    title:{
        type:String,
        requird:true,
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true,
    }
    ,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    imageUrl:{
        type: String,
        required: true
    },
    category:{
        type:String,
        enum: ['clothing', 'electronics', 'books', 'toys'],
        required:true
    },
    stock:Number
},{
    timestamps:true
})

const Product = mongoose.model('Product',productSchema)
export default Product;