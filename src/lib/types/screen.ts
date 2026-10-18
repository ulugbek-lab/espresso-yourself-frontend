/** REACT APP STATE */

import { Order } from "./order";
import { Product } from "./product";

//Types for all the screen components
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  ordersPage: OrdersPageState;
}

/** HOMEPAGE */
export interface HomePageState {
  mostViewedProducts: Product[];
  todaysDiscountProducts: Product[];
}
/** PRODUCTS PAGE */
export interface ProductsPageState {
  restaurant: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}

/** ORDERS PAGE */
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
