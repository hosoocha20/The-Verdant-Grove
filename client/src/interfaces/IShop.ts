export interface IShopItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    category: string;
    imgMainSrc: string[];
  }

export interface ShopType {
    shopItemArray: IShopItem[];
}