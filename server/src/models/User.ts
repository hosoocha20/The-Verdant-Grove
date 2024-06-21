import mongoose from "mongoose"


const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;
interface IShoppingCartItem {
    name: string;
    quantity: number;
    price: number;
    imgSrc: string[];
    checked: boolean;
  }

interface IOrderDetail {
    orderNo: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile?: string;
    delivery: IOrderDelivery;
    products: IShoppingCartItem[];
    subtotal: number;
    total: number;
    shipping: number;
    payment: string;
    date: Date;

}

interface IOrderDelivery {
    address1: string;
    address2: string;
    city: string;
    zip: string;
    mobile: string;
}

interface IUserAddress{
    city?: string;
    address1?: string;
    address2?: string;
    zip?: string;
}

interface IUser{
    firstName: string;
    lastName: string;
    email: string;
    pw: string;
    cart: IShoppingCartItem[];
    orders: IOrderDetail[];
    address: IUserAddress;
}

const CartSchema = new Schema<IShoppingCartItem>({
    name: String,
    quantity: Number,
    price: Number,
    imgSrc: [String],
    checked: Boolean,
})

const OrderSchema = new Schema<IOrderDetail>({
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


const UserSchema = new Schema<IUser>({
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

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;