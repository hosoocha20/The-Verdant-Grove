import mongoose from "mongoose"


const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const CartSchema = new Schema({
    name: String,
    quantity: Number,
    price: Number,
    imgSrc: [String],
    checked: Boolean,
})

const OrderSchema = new Schema({
    orderNo: {type: String, unique: true},        
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    subtotal: Number,
    total: Number,
    shipping: Number,
    payment: String,
    date: Date,
    delivery: {    
        address1: String,
        address2: String,
        city: String,
        zip: String,
        mobile: String
    },
    products: [{
        name: String,
        quantity: Number,
        price: Number,
        imgSrc: [String],
        checked: Boolean,
    }]
})


const UserSchema = new Schema({
    email: {type: String, required: true, index: {unique: true}},
    firstName: {type: String,  required: true},
    lastName: {type: String,  required: true},
    pw: {type: String, required: true},
    address: {
        city: {type: String, default: ""},
        address1: {type: String, default: ""},
        address2: {type: String, default: ""},
        zip: {type: String, default: ""}
    },
    cart: {
        type: [CartSchema],
        default: null
    },
    orders: {
        type: [OrderSchema],
        default: null
    },
})

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;