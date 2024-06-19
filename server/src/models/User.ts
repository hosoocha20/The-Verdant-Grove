import mongoose from "mongoose"


const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    pw: String,
    address: {
        city: String,
        address1: String,
        address2: String,
        zip: String
    },
    cart: [{
        name: String,
        quantity: Number,
        price: Number,
        imgSrc: [String],
        checked: Boolean,
    }],
    orders: [{
        orderNo: String,        
        firstName: String,
        lastName: String,
        email: String,
        mobile: String,
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
        }],
        subtotal: Number,
        total: Number,
        shipping: Number,
        payment: String,
        date: Date
    }]
})

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;