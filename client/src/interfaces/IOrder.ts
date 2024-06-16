import { ICheckoutItems, IShoppingCartItem } from "./IShop";

export interface IOrderDetail {
    orderNo: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    delivery: IOrderDelivery;
    products: IShoppingCartItem[];
    subtotal: number;
    total: number;
    shipping: number;
    payment: string;
    date: Date;

}

export interface IOrderDelivery {
    address1: string;
    address2: string;
    city: string;
    zip: string;
    mobile: string;
}