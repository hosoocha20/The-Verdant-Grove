import mongoose from "mongoose"


const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    email: {type: String, unique: true},
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
        name: {type: String, unique: true},
        quantity: Number,
        price: Number,
        imgSrc: [String],
        checked: Boolean,
    }],
    orders: [{
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
            name: {type: String, unique: true},
            quantity: Number,
            price: Number,
            imgSrc: [String],
            checked: Boolean,
        }]

    }]
})

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;