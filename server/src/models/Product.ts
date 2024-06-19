import mongoose from "mongoose"


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
    productId: String,
    name: String,
    quantity: Number,
    price: Number,
    category: String,
    imgMainSrc: [String],
    imgsSrc: [String],
    description: String,
    productDetail: {
        size: String,
        countrySrc: String
    }
})

const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;