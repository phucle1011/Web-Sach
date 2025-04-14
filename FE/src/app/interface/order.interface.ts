export interface IOrder {
    orderDetails: IOrderItem[]; 
    total_price: number;
    id: number;
    user_id: number;
    status: number;
    createdAt: string;
    name: string;
    address: string;
    phone: number;
    payment_method_id: string;
    email: string;
    updatedAt: string;
  }
  
  export interface IOrderItem {
    product: {
      title: string;
      price: string;
    };
    quantity: number;
  }
  