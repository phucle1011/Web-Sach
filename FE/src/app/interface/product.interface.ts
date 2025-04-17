export interface IProduct {
    productId: number;             
    title: string;                 
    author: string;               
    publisher: string;       
    price: string;               
    description: string;     
    images: string;                
    shortDescription: string;      
    publicationDate?: string | null;  
    categoryId?: number | null;     
  }
  