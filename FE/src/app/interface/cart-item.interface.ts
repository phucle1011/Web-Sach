import { IProduct } from './product.interface';
export interface ICartItem {
    id: number;           
    product_id: number;   
    quantity: number;     
    user_id: number;    
    product: IProduct; 
  }
  