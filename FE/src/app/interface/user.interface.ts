export interface IUser {
    data: any;
    userId?: 0;
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    address: string;
    avatar: string;
    role?:string;
    createdAt?: Date;
    token?: string;
}
