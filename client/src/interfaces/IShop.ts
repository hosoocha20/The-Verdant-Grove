export interface IProductDetail{
  size: string;
  countrySrc: string;

}

// export interface IShopItem {
//     productId: string;
//     name: string;
//     quantity: number;
//     price: number;
//     category: string;
//     imgMainSrc: string[];
//     imgsSrc: string[];
//     description: string;
//     productDetail: IProductDetail[];
//   }


export interface IProduct {
  name: string;
  quantity: number;
  price: number;
  category: string;
  imgMainSrc: string[];
  imgsSrc: string[];
  description: string;
  productDetail: IProductDetail;
}

export interface ShopType {
    shopItemArray: IProduct[];
}

export interface IShoppingCartItem {
  email: string;
  name: string;
  quantity: number;
  price: number;
  imgSrc: string[];
  checked: boolean;
}

export interface ICheckoutItems {
  checkoutProducts: IShoppingCartItem[];
}