export interface IOrder {
    items: any;
    price: any;
    quantity: any;
    id: number,
    user_id : number,
    total_price : number,
    status : number,
    createdAt : string,
    name : string,
    address : string,
    phone : number,
    payment_method_id  : string,
    email : string,
    updatedAt : string,
}